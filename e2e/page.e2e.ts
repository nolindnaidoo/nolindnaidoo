import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const SCHEMES = ['light', 'dark'] as const;

for (const scheme of SCHEMES) {
	test.describe(`${scheme} scheme`, () => {
		test.use({ colorScheme: scheme });

		test('has no detectable accessibility violations', async ({ page }) => {
			await page.goto('/');
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'section508'])
				.analyze();
			expect(results.violations).toEqual([]);
		});
	});
}

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
		expect.arrayContaining(['the record', 'shipped for', 'open source', 'the bar', 'elsewhere']),
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
	for (const name of ['letools.dev', 'crates.io', 'Résumé']) {
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
	const schema = JSON.parse(raw as string);
	expect(schema['@type']).toBe('Person');
	expect(schema.name).toBe('Nolin Naidoo');
	expect(schema.sameAs).toContain('https://github.com/nolindnaidoo');
	expect(schema.sameAs).toContain('https://www.linkedin.com/in/nolindnaidoo/');
});

test('carries the SEO furniture a branded query needs', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Nolin Naidoo/);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://nolindnaidoo.com',
	);
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
