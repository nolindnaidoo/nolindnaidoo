import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { profile } from './profile';
import { SITE_URL } from './site';
import { OG_IMAGE, socialCard } from './social';

/**
 * The social card is a committed binary. Nothing about a stale one is visible
 * on the site — it only shows up in someone else's feed, after they have
 * already shared the link. These are the checks that make that impossible to
 * miss.
 */

/** Width and height from a PNG's IHDR chunk, which is always the first one. */
function pngSize(path: string): { width: number; height: number } {
	const buffer = readFileSync(path);
	const signature = buffer.subarray(0, 8).toString('hex');
	if (signature !== '89504e470d0a1a0a') throw new Error(`${path} is not a PNG`);
	return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

describe('social card', () => {
	it('identifies the same person the page does', () => {
		// The renderer used to retype these. Reading them means the card cannot
		// describe someone the site does not.
		expect(socialCard.eyebrow).toContain(profile.title);
		expect(socialCard.eyebrow).toContain(profile.locality);
		expect(socialCard.name).toEqual(profile.nameParts);
	});

	it('points at the canonical origin', () => {
		expect(OG_IMAGE).toBe(`${SITE_URL}/og.png`);
		expect(socialCard.domains.at(-1)).toBe(SITE_URL.replace('https://', ''));
	});

	it('has been rendered at the size the meta tags promise', () => {
		// Fails when the card definition changes and `bun run og` was not re-run,
		// which is the whole failure mode: the tags and the file disagree and the
		// site looks fine.
		const rendered = pngSize('static/og.png');
		expect(rendered.width).toBe(socialCard.width);
		expect(rendered.height).toBe(socialCard.height);
	});

	it('has a home-screen icon rendered alongside it', () => {
		// Emitted by the same script; if og.png was regenerated and this was not,
		// one of the two is stale.
		const icon = pngSize('static/apple-touch-icon.png');
		expect(icon.width).toBe(icon.height);
		expect(icon.width).toBeGreaterThanOrEqual(180);
	});

	it('keeps the Open Graph aspect ratio', () => {
		// 1.91:1. Consumers crop to it, so drifting means the card is cropped
		// somewhere nobody is looking.
		expect(socialCard.width / socialCard.height).toBeCloseTo(1.905, 2);
	});
});
