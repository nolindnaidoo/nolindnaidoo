import { SITE_URL } from '$content/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Generated rather than committed as a static file so the origin comes from the
 * same constant the canonical tag and the structured data use. A hand-written
 * sitemap is one more place for the domain to be wrong after a move.
 *
 * One URL, because there is one page. The value here is not discovery — a
 * single-page site needs no help being crawled — it is that robots.txt has
 * something to point at and the canonical origin is stated in one more place a
 * crawler already looks.
 */
export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${SITE_URL}/</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	});
};
