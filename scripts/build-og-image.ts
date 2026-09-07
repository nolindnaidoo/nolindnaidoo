#!/usr/bin/env bun
/**
 * Renders `static/og.png` from the card definition in `content/social.ts`.
 *
 * Run under bun so it imports the content modules directly. The previous
 * version retyped the card's copy inside the renderer, which meant the image
 * everyone sees when the link is shared could silently disagree with the site
 * it represents — the same class of defect as declaring a card type with no
 * image.
 *
 * Playwright is already a devDependency, so the card is screenshotted from real
 * markup in the real vendored typeface. Satori was considered and rejected: it
 * lays out text itself and would drift from the page it is meant to represent.
 *
 * The output is committed, not generated at deploy time. A social crawler must
 * find it on first request, and a build step that can fail is a bad place to
 * discover that it did.
 *
 * Run: bun run og
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { socialCard } from '../src/lib/content/social';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = resolve(ROOT, 'static/og.png');
const ICON = resolve(ROOT, 'static/apple-touch-icon.png');

/** iOS ignores SVG favicons and needs a raster at 180px for the home screen. */
const ICON_SIZE = 180;
const FONT = resolve(ROOT, 'static/fonts/Geist-Variable.subset.woff2');

/**
 * The home-screen icon: the gold heart on the near-black tile — the same
 * mark as `static/favicon.svg`, restated here because iOS needs a raster.
 * If the favicon's geometry or gradient changes, change it here in the
 * same pass.
 */
export function icon(_fontDataUri: string): string {
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<style>
			* { box-sizing: border-box; margin: 0; }
			body {
				width: ${ICON_SIZE}px;
				height: ${ICON_SIZE}px;
				background: #111111;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		</style>
	</head>
	<body><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="132" height="132"><path d="M32 56C18 45.5 6 35.4 6 23.5 6 15 12.6 9 20.5 9c4.6 0 8.9 2.2 11.5 5.8C34.6 11.2 38.9 9 43.5 9 51.4 9 58 15 58 23.5c0 11.9-12 22-26 32.5z" fill="url(#g)"/><defs><linearGradient id="g" x1="12" y1="10" x2="52" y2="56" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f5d879"/><stop offset=".45" stop-color="#d4a017"/><stop offset="1" stop-color="#a87710"/></linearGradient></defs></svg></body>
</html>`;
}

export function card(fontDataUri: string): string {
	const { width, height, eyebrow, name, domains } = socialCard;
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<style>
			@font-face {
				font-family: 'Geist';
				src: url('${fontDataUri}') format('woff2');
				font-weight: 100 900;
			}
			* { box-sizing: border-box; margin: 0; }
			body {
				width: ${width}px;
				height: ${height}px;
				background: #0a0a0c;
				color: #f0f0f2;
				font-family: 'Geist', sans-serif;
				padding: 76px 84px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.eyebrow {
				font-size: 25px;
				letter-spacing: 0.18em;
				text-transform: uppercase;
				color: #6b8fff;
			}
			h1 {
				font-size: 168px;
				line-height: 0.82;
				letter-spacing: -0.055em;
				font-weight: 800;
				text-transform: uppercase;
			}
			.meta {
				display: flex;
				justify-content: space-between;
				gap: 40px;
				padding-top: 26px;
				border-top: 5px solid #6b8fff;
				font-size: 23px;
				letter-spacing: 0.11em;
				text-transform: uppercase;
				color: rgba(240, 240, 242, 0.72);
			}
		</style>
	</head>
	<body>
		<p class="eyebrow">${eyebrow}</p>
		<h1>${name.map((part) => `<span>${part}</span>`).join('<br />')}</h1>
		<div class="meta">${domains.map((item) => `<span>${item}</span>`).join('')}</div>
	</body>
</html>`;
}

async function main(): Promise<number> {
	const fontDataUri = `data:font/woff2;base64,${readFileSync(FONT).toString('base64')}`;
	const browser = await chromium.launch();

	try {
		const page = await browser.newPage({
			viewport: { width: socialCard.width, height: socialCard.height },
			deviceScaleFactor: 1,
		});
		await page.setContent(card(fontDataUri), { waitUntil: 'load' });
		await page.evaluate(() => document.fonts.ready);

		// The face is inlined so this should always hold — asserting it rather
		// than assuming keeps a silent fallback to a system font from shipping as
		// the card everyone sees when the link is shared.
		const usable = await page.evaluate(() => document.fonts.check('800 100px Geist'));
		if (!usable) {
			process.stderr.write(
				'\nbuild-og-image: Geist did not load; refusing to write a fallback card.\n\n',
			);
			return 1;
		}

		await page.screenshot({ path: OUTPUT, type: 'png' });

		const iconPage = await browser.newPage({
			viewport: { width: ICON_SIZE, height: ICON_SIZE },
			deviceScaleFactor: 2,
		});
		await iconPage.setContent(icon(fontDataUri), { waitUntil: 'load' });
		await iconPage.evaluate(() => document.fonts.ready);
		await iconPage.screenshot({ path: ICON, type: 'png' });
	} finally {
		await browser.close();
	}

	process.stdout.write(
		`wrote ${OUTPUT} (${socialCard.width}x${socialCard.height})\n` +
			`wrote ${ICON} (${ICON_SIZE * 2}x${ICON_SIZE * 2})\n`,
	);
	return 0;
}

/* v8 ignore start -- the process entry point; unreachable when imported by a test */
if (import.meta.main) {
	try {
		process.exit(await main());
	} catch (cause) {
		const detail = cause instanceof Error ? (cause.stack ?? cause.message) : String(cause);
		process.stderr.write(`\nbuild-og-image: failed to render the card.\n${detail}\n\n`);
		process.exit(1);
	}
}
/* v8 ignore stop */
