/**
 * Canonical identity and document metadata. Every absolute URL on the site
 * derives from `SITE_URL`; nothing hard-codes the origin a second time.
 */

/** Canonical origin. `nolinnaidoo.com` redirects here — one entity, one URL. */
export const SITE_URL = 'https://nolindnaidoo.com';

export const meta = Object.freeze({
	title: 'Nolin Naidoo — Chief Engineer, AI/ML & Platform Architecture',
	description:
		'Chief Engineer. Three industry firsts across banking, defense and automotive retail. AI/ML, MLOps and platform architecture for systems that are big, late, and not working.',
});
