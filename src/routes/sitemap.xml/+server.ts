import { caseStudies } from '$content/case-studies';
import { SITE_URL } from '$content/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Generated rather than committed as a static file so the origin comes from the
 * same constant the canonical tag and the structured data use. A hand-written
 * sitemap is one more place for the domain to be wrong after a move.
 *
 * The case-study entries derive from the content module for the same reason the
 * route's `entries()` does — a study added there appears here without anyone
 * remembering, and `routes.test.ts` counts against the same source so the two
 * cannot drift apart silently.
 */
const paths: readonly string[] = [
	'/',
	'/case-studies',
	...caseStudies.map(({ slug }) => `/case-studies/${slug}`),
];

export const GET: RequestHandler = () => {
	const urls = paths
		.map(
			(path) => `	<url>
		<loc>${SITE_URL}${path}</loc>
		<changefreq>monthly</changefreq>
		<priority>${path === '/' ? '1.0' : '0.8'}</priority>
	</url>`,
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	});
};
