import { describe, expect, it } from 'vitest';
import { caseStudies, intro } from './case-studies';
import { credentials, stack } from './credentials';
import { ledger } from './ledger';
import { platform } from './platform';
import { contact, elsewhere, profile } from './profile';
import { projects } from './projects';
import { closedWorkQuote, QUOTE_ELISION, questions } from './questions';
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
		...caseStudies.flatMap((study) => study.artifacts.map((artifact) => artifact.href)),
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

describe('case studies', () => {
	it('gives every study a unique slug', () => {
		const slugs = caseStudies.map((study) => study.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('keeps every slug URL-safe', () => {
		// The slug is the permanent public URL. Anything needing encoding would
		// change shape between the sitemap, the canonical tag and the link.
		for (const study of caseStudies) {
			expect(study.slug, `"${study.slug}" is not a bare kebab-case slug`).toMatch(
				/^[a-z0-9]+(-[a-z0-9]+)*$/,
			);
		}
	});

	it('carries the through-line and a reason to read on every study', () => {
		// `standfirst` restates the thesis for readers arriving from a link;
		// `annotation` is what the index shows at the point of choosing. A study
		// missing either renders a page or an index row that assumes context the
		// reader does not have.
		for (const study of caseStudies) {
			expect(study.standfirst.length, `"${study.slug}" has no standfirst`).toBeGreaterThan(0);
			expect(study.annotation.length, `"${study.slug}" has no annotation`).toBeGreaterThan(0);
		}
	});

	it('gives every study prose and something to inspect', () => {
		for (const study of caseStudies) {
			expect(study.sections.length, `"${study.slug}" has no sections`).toBeGreaterThan(0);
			expect(study.artifacts.length, `"${study.slug}" cites nothing`).toBeGreaterThan(0);
			for (const section of study.sections) {
				expect(
					section.paragraphs.length,
					`"${study.slug}" section "${section.heading}" is empty`,
				).toBeGreaterThan(0);
			}
		}
	});

	it('keeps section headings unique within a study', () => {
		// Headings are the `id` a section is labelled by, and duplicate ids break
		// the aria-labelledby association as well as the keyed each block.
		for (const study of caseStudies) {
			const headings = study.sections.map((section) => section.heading);
			expect(new Set(headings).size, `"${study.slug}" repeats a heading`).toBe(headings.length);
		}
	});

	it('states the through-line in the intro', () => {
		expect(intro.length).toBeGreaterThan(0);
	});

	it('is frozen against mutation at runtime', () => {
		expect(Object.isFrozen(caseStudies)).toBe(true);
		expect(Object.isFrozen(intro)).toBe(true);
		for (const study of caseStudies) {
			expect(Object.isFrozen(study)).toBe(true);
			for (const section of study.sections) {
				expect(Object.isFrozen(section)).toBe(true);
			}
		}
	});
});

describe('the obvious questions', () => {
	it('asks each question once', () => {
		const asks = questions.map((question) => question.ask);
		expect(new Set(asks).size).toBe(asks.length);
	});

	it('answers every question', () => {
		for (const question of questions) {
			expect(question.answer.length, `"${question.ask}" has no answer`).toBeGreaterThan(0);
		}
	});

	it('quotes the case study rather than restating it', () => {
		// The pull quote is an elided quotation of intro[2]. Every unelided run of
		// it must still appear verbatim in that paragraph, so rewording the essay
		// and leaving the home page behind fails here instead of shipping two
		// versions of one passage — the exact drift this codebase keeps hitting.
		const essay = intro.join(' ');
		const runs = closedWorkQuote.split(QUOTE_ELISION).map((run) => run.trim());
		expect(runs.length, 'the quote carries no elision — check the marker').toBeGreaterThan(1);
		for (const run of runs) {
			expect(essay, `the quote drifted from the case study: "${run.slice(0, 60)}…"`).toContain(run);
		}
	});

	it('is frozen against mutation at runtime', () => {
		expect(Object.isFrozen(questions)).toBe(true);
		for (const question of questions) {
			expect(Object.isFrozen(question)).toBe(true);
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

	it('keeps current work out of the roster', () => {
		// The roster is past engagements; current work lives in the platform
		// section. This fails if a rebrand re-adds the company as a roster row
		// (the pre-2026 shape) instead of editing platform.ts.
		const organizations = roster.map((entry) => entry.organization);
		expect(organizations).not.toContain(platform.company);
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
