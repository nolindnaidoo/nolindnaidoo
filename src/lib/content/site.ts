/**
 * Canonical identity and document metadata. Every absolute URL on the site
 * derives from `SITE_URL`; nothing hard-codes the origin a second time.
 */

/** Canonical origin. `nolinnaidoo.com` redirects here — one entity, one URL. */
export const SITE_URL = 'https://nolindnaidoo.com';

export const meta = Object.freeze({
	title: 'Nolin Naidoo — Lead AI Engineer, ML & LLM Systems',
	description:
		'Lead AI Engineer. Production ML, LLM and agentic systems, and the full stack around them — built in banking, defense, automotive retail, and agriculture. I would rather make eight engineers faster than out-ship them alone.',
	imageAlt: 'Nolin Naidoo — Lead AI Engineer, Dallas, Texas',
});
