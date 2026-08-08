import { describe, expect, it } from 'vitest';
import { SITE_URL } from '$content/site';
import { GET as robots } from './robots.txt/+server';
import { GET as sitemap } from './sitemap.xml/+server';

/**
 * Both files exist as routes rather than static assets so the canonical origin
 * has one home. These assert that the derivation actually happened — a
 * hardcoded origin here fails silently, advertising a sitemap that 404s after a
 * domain change with nothing complaining.
 */

/**
 * Both handlers ignore the request event, and SvelteKit types them per route,
 * so they are not assignable to each other. Accepting any callable returning a
 * Response is what lets one helper drive both.
 */
const call = async (
	handler: (...args: never[]) => Promise<Response> | Response,
): Promise<Response> => handler();

// A Response body can only be read once, so each test gets a fresh call.
describe('robots.txt', () => {
	it('is served as plain text', async () => {
		expect((await call(robots)).headers.get('content-type')).toContain('text/plain');
	});

	it('allows everything', async () => {
		const body = await (await call(robots)).text();
		expect(body).toContain('User-agent: *');
		expect(body).toContain('Allow: /');
	});

	it('points at the sitemap on the canonical origin', async () => {
		expect(await (await call(robots)).text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
	});
});

describe('sitemap.xml', () => {
	it('is served as XML', async () => {
		expect((await call(sitemap)).headers.get('content-type')).toContain('application/xml');
	});

	it('lists the canonical origin', async () => {
		const body = await (await call(sitemap)).text();
		expect(body).toContain(`<loc>${SITE_URL}/</loc>`);
	});

	it('is well-formed enough to parse', async () => {
		const body = await (await call(sitemap)).text();
		expect(body.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(body).toContain('<urlset');
		expect(body).toContain('</urlset>');
		// One page, one entry. A second <url> means a route was added without
		// anyone deciding whether it should be indexed.
		expect(body.match(/<url>/g)).toHaveLength(1);
	});
});

describe('both', () => {
	it('never hardcodes an origin the site does not use', async () => {
		const bodies = [await (await call(robots)).text(), await (await call(sitemap)).text()];
		for (const body of bodies) {
			const origins = body.match(/https?:\/\/[^/\s<]+/g) ?? [];
			for (const origin of origins) {
				expect(origin, `${origin} is not the canonical origin`).toMatch(
					new RegExp(`^${SITE_URL}|^http://www\\.sitemaps\\.org`),
				);
			}
		}
	});
});
