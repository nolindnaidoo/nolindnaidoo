import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { caseStudies } from '../src/lib/content/case-studies';
import { SITE_URL } from '../src/lib/content/site';
import { OG_IMAGE } from '../src/lib/content/social';

const SCHEMES = ['light', 'dark'] as const;

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'section508'] as const;

/**
 * Every prerendered page, not just the home page. A case study is a full
 * document with its own heading structure and link set — auditing only `/`
 * would gate the section that introduces the studies while leaving the studies
 * themselves unchecked.
 */
const PAGES: readonly string[] = [
	'/',
	'/case-studies',
	...caseStudies.map(({ slug }) => `/case-studies/${slug}`),
];

for (const scheme of SCHEMES) {
	test.describe(`${scheme} scheme`, () => {
		test.use({ colorScheme: scheme });

		for (const path of PAGES) {
			test(`has no detectable accessibility violations on ${path}`, async ({ page }) => {
				await page.goto(path);
				const results = await new AxeBuilder({ page }).withTags([...WCAG]).analyze();
				expect(results.violations).toEqual([]);
			});
		}
	});
}

test.describe('case study pages', () => {
	for (const study of caseStudies) {
		const path = `/case-studies/${study.slug}`;

		test(`${path} names itself in one h1`, async ({ page }) => {
			await page.goto(path);
			await expect(page.getByRole('heading', { level: 1, name: study.title })).toBeVisible();
		});

		test(`${path} returns to the index without a nav`, async ({ page }) => {
			await page.goto(path);
			// The way out is a single link back to the section that sent you. If
			// this page ever grows persistent navigation, this is the test that
			// should be deleted deliberately rather than quietly passing.
			await expect(page.getByRole('navigation')).toHaveCount(0);
			await page.getByRole('link', { name: /all case studies/i }).click();
			await expect(page).toHaveURL(/\/case-studies$/);
		});
	}
});

test('exposes the name as a single accessible heading', async ({ page }) => {
	await page.goto('/');
	// Guards the split-span layout: the H1 must read "Nolin Naidoo", never
	// "NolinNaidoo", or the exact-match branded query loses its strongest signal.
	await expect(page.getByRole('heading', { level: 1, name: 'Nolin Naidoo' })).toBeVisible();
});

test('gives every section a real heading', async ({ page }) => {
	await page.goto('/');
	// Section heads render uppercase via text-transform, so compare on the
	// case-folded text rather than the painted glyphs.
	const headings = (await page.getByRole('heading', { level: 2 }).allInnerTexts()).map((text) =>
		text.toLowerCase(),
	);
	expect(headings).toEqual(
		expect.arrayContaining(['the record', 'open source', 'the bar', 'elsewhere']),
	);
});

test('puts a working skip link first in the tab order', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');
	const skip = page.getByRole('link', { name: 'Skip to content' });
	await expect(skip).toBeFocused();

	await skip.press('Enter');
	// Focus must actually land on main, not just the scroll position. Without
	// tabindex="-1" several browsers scroll without moving focus, so the next
	// Tab returns to the top and the skip accomplishes nothing.
	await expect(page.locator('main#main')).toBeFocused();
});

test('continues into page content after skipping', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');
	await page.getByRole('link', { name: 'Skip to content' }).press('Enter');
	await page.keyboard.press('Tab');
	// The first focusable thing inside main, not the skip link again.
	const focused = await page.evaluate(() => document.activeElement?.closest('main') !== null);
	expect(focused).toBe(true);
});

test('exposes every section as a named region', async ({ page }) => {
	await page.goto('/');
	// An unnamed <section> is not a region at all — a screen reader user
	// navigating by landmark would find main and nothing within it. Asserting
	// parity with the headings rather than a literal count keeps this true as
	// sections are added.
	const regions = await page.getByRole('region').count();
	const headings = await page.getByRole('heading', { level: 2 }).count();
	expect(regions).toBe(headings);
	expect(regions).toBeGreaterThan(0);
});

test('keeps decorative arrows out of accessible names', async ({ page }) => {
	await page.goto('/');
	const cta = page.getByRole('link', { name: 'Let’s talk', exact: true });
	await expect(cta).toBeVisible();
	for (const name of ['letools.dev', 'crates.io']) {
		await expect(page.getByRole('link', { name, exact: true })).toBeVisible();
	}
});

test('reaches every link by keyboard alone', async ({ page }) => {
	await page.goto('/');
	const total = await page.getByRole('link').count();

	// Tracked by element, not by href: sixteen anchors point at eight distinct
	// URLs, so counting unique destinations would under-report reachability and
	// hide a genuinely unreachable duplicate.
	await page.evaluate(() => {
		document.querySelectorAll('a').forEach((anchor, index) => {
			anchor.setAttribute('data-keyboard-probe', String(index));
		});
	});

	const reached = new Set<string>();
	for (let step = 0; step < total + 3; step += 1) {
		await page.keyboard.press('Tab');
		const probe = await page.evaluate(
			() => document.activeElement?.getAttribute('data-keyboard-probe') ?? null,
		);
		if (probe !== null) reached.add(probe);
	}

	expect(reached.size, 'every link must be reachable by Tab alone').toBe(total);
});

test('emits Person structured data with the identity network', async ({ page }) => {
	await page.goto('/');
	const block = page.locator('script[type="application/ld+json"]');
	// Asserting presence first: falling back to '{}' would turn "the block is
	// missing entirely" into "@type was undefined", which names the symptom
	// rather than the fault.
	await expect(block).toHaveCount(1);
	const raw = await block.textContent();
	expect(raw, 'the JSON-LD block is present but empty').toBeTruthy();
	const parsed = JSON.parse(raw as string);
	const nodes = parsed['@graph'] as { '@type': string; '@id'?: string }[];

	const person = nodes.find((node) => node['@type'] === 'Person') as
		| { '@id': string; name: string; sameAs: string[] }
		| undefined;
	expect(person, 'no Person node in the graph').toBeDefined();
	expect(person?.name).toBe('Nolin Naidoo');
	expect(person?.sameAs).toContain('https://github.com/nolindnaidoo');
	expect(person?.sameAs).toContain('https://www.linkedin.com/in/nolindnaidoo/');

	// Every product attributed to that same id. This edge is what carries the
	// suite's seventy thousand downloads back to the person.
	const apps = nodes.filter((node) => node['@type'] === 'SoftwareApplication') as {
		author: { '@id': string };
	}[];
	expect(apps.length).toBeGreaterThan(0);
	for (const app of apps) expect(app.author['@id']).toBe(person?.['@id']);
});

test('carries the SEO furniture a branded query needs', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Nolin Naidoo/);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', SITE_URL);
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		/Chief Engineer/,
	);
});

test('never scrolls the document sideways at 320px', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 720 });
	await page.goto('/');
	const overflows = await page.evaluate(
		() => document.documentElement.scrollWidth > document.documentElement.clientWidth,
	);
	expect(overflows).toBe(false);
});

test('leaves the hero at its resting weight under reduced motion', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	await page.evaluate(() => window.scrollTo(0, 800));
	const inlineWeight = await page
		.getByRole('heading', { level: 1 })
		.evaluate((node) => node.style.fontWeight);
	expect(inlineWeight).toBe('');
});

test('serves a social card at the size the meta tags promise', async ({ page }) => {
	// twitter:card is summary_large_image, which promises an image. Declaring a
	// card type with no image renders every share as a bare link — the failure
	// happens exactly when someone is passing the link to someone else.
	await page.goto('/');
	const image = page.locator('meta[property="og:image"]');
	await expect(image).toHaveAttribute('content', OG_IMAGE);

	const response = await page.request.get('/og.png');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('image/png');
});

test('serves robots.txt pointing at a real sitemap', async ({ page }) => {
	const robots = await page.request.get('/robots.txt');
	expect(robots.status()).toBe(200);
	expect(await robots.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);

	const sitemap = await page.request.get('/sitemap.xml');
	expect(sitemap.status()).toBe(200);
	expect(await sitemap.text()).toContain(`<loc>${SITE_URL}/</loc>`);
});

test('renders a styled page for an address that does not exist', async ({ page }) => {
	const response = await page.goto('/no-such-page');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('No page here');
	// An error page that ranks would put a dead end in front of the branded query.
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('loads the vendored display face rather than a system fallback', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
	// The whole identity of this page is oversized type at weights 620-800. On a
	// system stack that is SF Pro here and Segoe UI on a recruiter's laptop —
	// materially different pages. This asserts the real face actually arrived.
	// document.fonts reports the family as declared, quotes included, so this
	// asks the browser whether it can actually render the face at the weight the
	// hero uses rather than string-matching a name.
	const usable = await page.evaluate(() => document.fonts.check('800 100px Geist'));
	expect(usable, 'Geist did not load — the page fell back to a system font').toBe(true);
});

test('ships a content security policy with no inline script escape hatch', async ({ page }) => {
	await page.goto('/');
	const policy = await page
		.locator('meta[http-equiv="content-security-policy"]')
		.getAttribute('content');
	expect(policy, 'no CSP was emitted').toBeTruthy();
	// Hash mode is what earns this. Reverting to 'unsafe-inline' would silently
	// hand back the protection while every other check still passed.
	expect(policy).not.toContain("'unsafe-inline'; script-src");
	expect(policy).toMatch(/script-src [^;]*'sha256-/);
	expect(policy).toContain("object-src 'none'");
});

test('offers an icon iOS can actually use', async ({ page }) => {
	await page.goto('/');
	// iOS ignores SVG favicons; without a raster the home-screen tile is a
	// screenshot of the page.
	await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
	const response = await page.request.get('/apple-touch-icon.png');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('image/png');
});

test('declares a theme colour for both grounds', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('meta[name="theme-color"]')).toHaveCount(2);
});
