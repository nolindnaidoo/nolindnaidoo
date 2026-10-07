import { describe, expect, it } from 'vitest';
import { caseStudies } from '$content/case-studies';
import { SITE_URL } from '$content/site';
import { entries, load } from './case-studies/[slug]/+page';
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
		// The home page, the case-studies index, and one entry per study — counted
		// against the module that owns them rather than a literal. The original
		// guard asserted a single <url> so a route could not be added without
		// someone deciding whether it should be indexed; deriving the count keeps
		// that decision enforced while letting the studies grow.
		expect(body.match(/<url>/g)).toHaveLength(caseStudies.length + 2);
	});

	it('lists every case study exactly once', async () => {
		const body = await (await call(sitemap)).text();
		for (const study of caseStudies) {
			const loc = `<loc>${SITE_URL}/case-studies/${study.slug}</loc>`;
			expect(body.split(loc)).toHaveLength(2);
		}
	});
});

describe('case study pages', () => {
	/**
	 * `load` only reads `params`, and SvelteKit's event type is far wider than
	 * that. Narrowing to what the function actually touches is what lets a test
	 * call it without constructing a whole navigation event.
	 */
	const loadSlug = (slug: string) =>
		(load as unknown as (event: { params: { slug: string } }) => { study: { slug: string } })({
			params: { slug },
		});

	it('prerenders one entry per study', () => {
		const generated = (entries as () => { slug: string }[])();
		expect(generated.map(({ slug }) => slug)).toEqual(caseStudies.map(({ slug }) => slug));
	});

	it('resolves a known slug to its study', () => {
		const first = caseStudies[0];
		expect(first).toBeDefined();
		expect(loadSlug((first as { slug: string }).slug).study).toBe(first);
	});

	it('refuses an unknown slug rather than rendering an empty page', () => {
		// A 404 here is the loud failure. Returning undefined would prerender a
		// page with no content and no error, which is the silent version.
		expect(() => loadSlug('not-a-study')).toThrow();
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
