import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * Fully static. There is no server surface here and there never should be —
 * every route prerenders at build time and Vercel serves the output directly.
 *
 * `adapter()` takes NO options on purpose. Passing any option — even the
 * defaults — opts out of the adapter's zero-config mode, and on Vercel that
 * means it writes to `build/` while the platform looks for `public/` and fails
 * the deploy. Zero-config lets the adapter place the output where Vercel
 * expects it, and locally it still writes `build/`, which is what `preview` and
 * the Playwright suite serve.
 *
 * The guarantee that used to be spelled `strict: true` is unchanged: that is
 * the adapter's default, so a route that cannot prerender is still a build
 * failure rather than a silent fallback.
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
		adapter: adapter(),
		prerender: { handleHttpError: 'fail', handleMissingId: 'fail' },
		/**
		 * Hash mode emits a per-build hash for each inline script into a
		 * <meta http-equiv> policy, which is what lets script-src drop
		 * 'unsafe-inline'. Hard-coding the hashes into the Vercel header instead
		 * would mean regenerating them by hand on every build — drift, in the one
		 * place where being wrong fails closed and takes the page down.
		 *
		 * frame-ancestors is deliberately absent: a meta-tag policy cannot express
		 * it, so it stays in vercel.json where a header can.
		 */
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': ['self', 'unsafe-inline'],
				'font-src': ['self'],
				'img-src': ['self', 'data:'],
				'connect-src': ['self'],
				'form-action': ['none'],
				'base-uri': ['self'],
				'object-src': ['none'],
			},
		},
		alias: { $content: 'src/lib/content' },
	},
};
