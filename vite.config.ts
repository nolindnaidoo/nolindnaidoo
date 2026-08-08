import { sveltekit } from '@sveltejs/kit/vite';
// vitest/config, not vite — `test` is not part of Vite's own config type.
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
		// Per-file `@vitest-environment happy-dom` opts the DOM tests in; the
		// rest stay on node, which is faster and catches accidental DOM reliance.
		environment: 'node',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'text-summary', 'json-summary'],
			/**
			 * Scoped to the pure modules on purpose. Components carry no logic —
			 * they render frozen content and nothing else — so a component
			 * coverage number would measure markup, not behaviour, and the real
			 * assurance for them is the Playwright suite against the built page.
			 * Measuring what tests cannot meaningfully assert produces a number
			 * that gets gamed rather than a gate that catches anything.
			 */
			include: [
				'src/lib/content/**/*.ts',
				'src/lib/seo/**/*.ts',
				'src/lib/actions/**/*.ts',
				'src/routes/**/*.ts',
				'scripts/**/*.ts',
			],
			exclude: [
				'**/*.test.ts',
				// Types only — nothing to execute.
				'src/lib/content/types.ts',
				// Route module config (prerender/ssr flags), not behaviour.
				'src/routes/+layout.ts',
				// Its entry point launches a browser; the pure `card()` builder is
				// covered, and the rendered PNG is asserted by social.test.ts.
				'scripts/build-og-image.ts',
				// Executed as a separate process by commit-lint.test.ts, so v8
				// coverage of this process cannot see it. It is fully exercised.
				'scripts/commit-lint.js',
			],
			/**
			 * A regression backstop, not a target. 70 is deliberate: the old
			 * 96–100 floors made every environment-guard branch (platform
			 * detection, optional-chain fallbacks) a deploy blocker, and a
			 * personal site does not need coverage brinkmanship. Real coverage
			 * sits far above this; the threshold only catches collapse.
			 */
			thresholds: {
				lines: 70,
				functions: 70,
				statements: 70,
				branches: 70,
			},
		},
	},
});
