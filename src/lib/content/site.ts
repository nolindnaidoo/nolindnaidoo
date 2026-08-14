/**
 * Canonical identity and document metadata. Every absolute URL on the site
 * derives from `SITE_URL`; nothing hard-codes the origin a second time.
 */

/** Canonical origin. `nolinnaidoo.com` redirects here — one entity, one URL. */
export const SITE_URL = 'https://nolindnaidoo.com';

export const meta = Object.freeze({
	title: 'Nolin Naidoo — Chief Engineer, AI/ML & Platform Architecture',
	description:
		'Chief Engineer, for real. Three industry firsts (banking, defense, automotive retail)—not badges, just actual shipping work. AI/ML, MLOps, and platform architecture in the hardest rooms I could find. I’m the one they call when it’s big, late, and broken; gone before the credits finish, every time.',
	imageAlt: 'Nolin Naidoo — Chief Engineer, Dallas, Texas',
});

/**
 * The colophon speaks to the engineer who views source. Every number in it
 * must survive a reader who clones the repo and runs the gates — statements
 * and lines sit at 100 in vitest coverage, axe runs both themes in CI, and
 * the payload budget is a build gate. If a gate changes, this line changes
 * in the same pass.
 */
export const colophon = Object.freeze({
	lead: 'This site is a work sample — so is everything else.',
	body: 'SvelteKit 2 on Svelte 5, TypeScript strict, vanilla CSS. Statements and lines test at 100%; axe gates the build on every page, in both themes; payload budgets and visual baselines gate every deploy. The rest of the open source holds the same bar — ten extensions, two Rust tools, releases with verifiable provenance, and CI you can watch. Checking me out is the point.',
	cta: 'Inspect the code',
	href: 'https://github.com/nolindnaidoo',
});
