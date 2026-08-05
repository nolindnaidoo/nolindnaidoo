import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * Fully static. There is no server surface here and there never should be —
 * every route prerenders at build time and Vercel serves the output directly.
 * `strict: true` makes a non-prerenderable route a build failure rather than a
 * silent fallback, which is the guard that keeps that promise true.
 *
 * @type {import('@sveltejs/kit').Config}
 */
export default {
	preprocess: vitePreprocess(),
	compilerOptions: {
		// Svelte's a11y diagnostics are warnings by default; svelte-check runs with
		// --fail-on-warnings in CI so they gate the build like every other check.
		runes: true,
	},
	kit: {
		adapter: adapter({ fallback: undefined, strict: true }),
		prerender: { handleHttpError: 'fail', handleMissingId: 'fail' },
		alias: { $content: 'src/lib/content' },
	},
};
