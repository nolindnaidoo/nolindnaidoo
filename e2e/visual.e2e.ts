import { expect, test } from '@playwright/test';

/**
 * Baselines are platform-suffixed by Playwright, so macOS baselines are
 * generated locally and Linux baselines on the runner via the
 * "Update visual baselines" workflow. The point is not pixel-perfection across
 * machines — it is that a typography or spacing change nobody intended shows up
 * as a diff instead of shipping unnoticed. That risk is real here: the display
 * face silently fell back to a system font once already.
 *
 * Every section is covered, not a sample. A regression in the one section
 * nobody snapshotted is exactly the regression that ships.
 *
 * Regenerate deliberately: bun run e2e -- --update-snapshots
 */

const SECTIONS = [
	['hero', 'header'],
	['thesis', 'section:has(> h2#thesis-heading)'],
	['platform', 'section[aria-labelledby="now"]'],
	['record', 'section[aria-labelledby="record"]'],
	['open-source', 'section[aria-labelledby="open-source"]'],
	['credentials', 'section[aria-labelledby="credentials"]'],
	['bar', 'section[aria-labelledby="bar"]'],
	['elsewhere', 'section[aria-labelledby="elsewhere"]'],
	['contact', 'footer'],
] as const;

test.describe('visual', () => {
	for (const [name, selector] of SECTIONS) {
		test(`${name} holds its composition`, async ({ page }) => {
			await page.goto('/');
			// Screenshotting before the face resolves captures the fallback and
			// bakes a wrong baseline.
			await page.evaluate(() => document.fonts.ready);
			await expect(page.locator(selector)).toHaveScreenshot(`${name}.png`);
		});
	}
});

test('the error page holds its composition', async ({ page }) => {
	await page.goto('/no-such-page');
	await page.evaluate(() => document.fonts.ready);
	await expect(page.locator('main')).toHaveScreenshot('error.png');
});
