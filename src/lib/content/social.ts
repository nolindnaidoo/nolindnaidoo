import { profile } from './profile';
import { SITE_URL } from './site';

/**
 * The social card's own composition, at a fixed 1200×630.
 *
 * Deliberately its own content rather than the hero's: the card is a different
 * layout at a fixed size, and reusing the responsive hero copy verbatim would
 * either overflow the frame or force the page to be written around the image.
 *
 * What it must never do is drift from the person it describes, so the parts
 * that identify him — name, title, location, domain — come from `profile` and
 * `SITE_URL` rather than being retyped in the renderer. `scripts/build-og-image.ts`
 * imports this, and `social.test.ts` asserts the rendered PNG still matches.
 */
export const socialCard = Object.freeze({
	/** Open Graph's canonical size. Every consumer crops from this ratio. */
	width: 1200,
	height: 630,
	eyebrow: `${profile.title} · ${profile.locality}, Texas`,
	name: profile.nameParts,
	domains: ['Banking · Defense · Automotive', SITE_URL.replace('https://', '')],
});

/** Absolute, because Open Graph consumers do not resolve relative URLs. */
export const OG_IMAGE = `${SITE_URL}/og.png`;
