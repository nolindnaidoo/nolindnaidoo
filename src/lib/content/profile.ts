import type { Link, Property } from './types';

export const profile = Object.freeze({
	name: 'Nolin Naidoo',
	/** Rendered stacked, but the trailing space keeps the H1 reading "Nolin Naidoo". */
	nameParts: Object.freeze(['Nolin', 'Naidoo'] as const),
	handle: 'nolindnaidoo',
	/** Other spellings a search engine should resolve to the same person. */
	alsoKnownAs: Object.freeze(['Nolin D Naidoo']),
	title: 'Lead AI Engineer',
	locality: 'Dallas',
	region: 'TX',
	eyebrow: 'Lead AI Engineer · Dallas, Texas',
	tagline: 'nolindnaidoo — same handle everywhere',
	meta: Object.freeze([
		'AI/ML · MLOps · agentic systems',
		'Platform & full-stack architecture',
		'Automotive · finance · defense · public records',
	]),
	thesis: Object.freeze({
		lead: 'The failure is',
		emphasis: 'silent',
		/**
		 * One short paragraph, not an essay. This section's job is to make the three
		 * long-form pieces below it inevitable rather than optional, so it states the
		 * problem all three are about and stops. It is the home-page compression of
		 * the story told in full in `case-studies.ts` `intro`.
		 */
		body: `A value that was never knowable leaks into a model and accuracy climbs. A tool
			answers confidently with the wrong number and the pipeline stays green. A published
			record gets edited and looks identical from the outside. Nothing fails, nothing alerts,
			and everything built on top of it is resting on nothing. Three write-ups, one problem at
			three layers, and what I built so each of them has something that catches it.`,
	}),
});

export const contact: Readonly<{
	availability: string;
	primary: Link;
	links: readonly Link[];
}> = Object.freeze({
	availability:
		'Looking for a senior or staff AI engineering role: production ML, LLM and agentic systems, and the full stack around them. Full-time. Remote, hybrid, or onsite in the Dallas–Fort Worth area.',
	primary: Object.freeze({
		label: 'Let’s talk',
		href: 'https://www.linkedin.com/in/nolindnaidoo/',
	}),
	links: Object.freeze([
		Object.freeze({
			label: 'linkedin.com/in/nolindnaidoo',
			href: 'https://www.linkedin.com/in/nolindnaidoo/',
		}),
		Object.freeze({ label: 'github.com/nolindnaidoo', href: 'https://github.com/nolindnaidoo' }),
	]),
});

/**
 * Every property under the same identity. This single list is rendered as the
 * "Elsewhere" grid *and* emitted as schema.org `sameAs`, so what a reader can
 * click and what a crawler resolves cannot drift apart. Splitting them is how
 * an entity graph quietly ends up describing two different people.
 */
export const elsewhere: readonly Property[] = Object.freeze([
	Object.freeze({
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/nolindnaidoo/',
		note: 'in/nolindnaidoo',
	}),
	Object.freeze({
		label: 'GitHub',
		href: 'https://github.com/nolindnaidoo',
		note: '@nolindnaidoo · 25 repositories',
	}),
	Object.freeze({
		label: 'SplitWinner',
		href: 'https://www.splitwinner.com',
		note: 'sports prediction platform with a public audit trail',
	}),
]);
