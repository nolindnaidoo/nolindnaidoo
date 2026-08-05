import { describe, expect, it } from 'vitest';
import { credentials, stack } from './credentials';
import { ledger } from './ledger';
import { platform } from './platform';
import { contact, elsewhere, profile } from './profile';
import { projects } from './projects';
import { roster } from './roster';
import { standards } from './standards';

/**
 * Not tests of rendering — drift guards. Content lives in one place precisely
 * so a claim cannot get out of sync with the structured data or with itself,
 * and each case below is a way that has already gone wrong once.
 */

describe('ledger', () => {
	it('gives every entry a stable, unique id', () => {
		const ids = ledger.map((entry) => entry.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('names each engagement exactly once', () => {
		// One row per engagement is a content rule: a second achievement from the
		// same client belongs in `detail`, not in another row.
		const clients = ledger.map((entry) => entry.attribution.split('·')[0]?.trim());
		expect(new Set(clients).size).toBe(clients.length);
	});

	it('anchors every "first" claim to a year', () => {
		// A superlative without a date is unfalsifiable, and a reader who cannot
		// place it will discount it. If the claim says first, the attribution
		// carries the year that makes it checkable.
		const firsts = ledger.filter((entry) => /\bfirst\b/i.test(entry.claim));
		expect(firsts.length).toBeGreaterThan(0);
		for (const entry of firsts) {
			expect(entry.attribution, `"${entry.id}" claims a first without a year`).toMatch(
				/\b(19|20)\d{2}\b/,
			);
		}
	});

	it('carries supporting detail on every row', () => {
		for (const entry of ledger) {
			expect(entry.detail.length, `"${entry.id}" has no supporting detail`).toBeGreaterThan(0);
		}
	});

	it('is frozen against mutation at runtime', () => {
		// `readonly` is erased at compile time; this is the half that survives.
		expect(Object.isFrozen(ledger)).toBe(true);
		for (const entry of ledger) {
			expect(Object.isFrozen(entry)).toBe(true);
		}
	});
});

describe('outbound links', () => {
	const everyHref = [
		...elsewhere.map((property) => property.href),
		...projects.map((project) => project.href),
		...contact.links.map((link) => link.href),
		...ledger.flatMap((entry) => entry.sources.map((source) => source.href)),
	];

	it('is https everywhere', () => {
		for (const href of everyHref) {
			expect(href.startsWith('https://'), `${href} is not https`).toBe(true);
		}
	});

	it('lists each destination once in the identity network', () => {
		const hrefs = elsewhere.map((property) => property.href);
		expect(new Set(hrefs).size).toBe(hrefs.length);
	});

	it('keeps the handle consistent across owned profiles', () => {
		const owned = elsewhere.filter(
			(property) => property.href.includes('linkedin.com') || property.href.includes('github.com'),
		);
		expect(owned.length).toBeGreaterThan(0);
		for (const property of owned) {
			expect(property.href).toContain(profile.handle);
		}
	});
});

describe('supporting content', () => {
	it('has no duplicate stack entries', () => {
		expect(new Set(stack).size).toBe(stack.length);
	});

	it('lists each organization once in the roster', () => {
		const organizations = roster.map((entry) => entry.organization);
		expect(new Set(organizations).size).toBe(organizations.length);
	});

	it('names the current employer in both the roster and the platform', () => {
		// The rebrand is a single edit in platform.ts; this fails if the roster
		// entry is left behind.
		const organizations = roster.map((entry) => entry.organization);
		expect(organizations).toContain(platform.company);
	});

	it('is non-empty where the page expects content', () => {
		expect(roster.length).toBeGreaterThan(0);
		expect(projects.length).toBeGreaterThan(0);
		expect(credentials.length).toBeGreaterThan(0);
		expect(standards.length).toBeGreaterThan(0);
		expect(platform.systems.length).toBeGreaterThan(0);
		expect(platform.capabilities.length).toBeGreaterThan(0);
	});
});
