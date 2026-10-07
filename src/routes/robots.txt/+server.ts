import { SITE_URL } from '$content/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Generated rather than committed as a static file so the origin comes from the
 * same constant the canonical tag, the structured data and the sitemap use. A
 * hand-written robots.txt is one more place the domain can be wrong, and the
 * failure is silent: it advertises a sitemap that 404s and nothing complains.
 */
export const GET: RequestHandler = () => {
	const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	});
};
