import type { Link, Property } from './types';

export const profile = Object.freeze({
	name: 'Nolin Naidoo',
	/** Rendered stacked, but the trailing space keeps the H1 reading "Nolin Naidoo". */
	nameParts: Object.freeze(['Nolin', 'Naidoo'] as const),
	handle: 'nolindnaidoo',
	/** Other spellings a search engine should resolve to the same person. */
	alsoKnownAs: Object.freeze(['Nolin D Naidoo']),
	title: 'Chief Engineer',
	locality: 'Dallas',
	region: 'TX',
	eyebrow: 'Chief Engineer · Dallas, Texas · building in public',
	availabilityShort: 'taking one senior contract',
	tagline: 'nolindnaidoo — everywhere that matters',
	meta: Object.freeze([
		'AI/ML · MLOps · agentic systems',
		'Platform & full-stack architecture',
		'Automotive · finance · defense · public records',
	]),
	thesis: Object.freeze({
		lead: 'Brought in when it’s big, late, and',
		emphasis: 'not working',
		body: `A Fortune 10 trading floor. A DoD communications platform. A statewide records
			system. A retail program announced four years before anyone could buy anything. The
			same engagement every time: walk into the hardest room, find the path to shipping,
			and build the team so it keeps shipping after I’m gone. Three industry firsts came
			out of those rooms — banking, defense, and automotive retail. Every contract
			completed. Nearly every one ended with an offer to stay.`,
	}),
});

export const contact: Readonly<{
	availability: string;
	primary: Link;
	links: readonly Link[];
	resume: Link;
}> = Object.freeze({
	availability:
		'Taking one senior contract at a time — production ML, agentic systems, full-stack. Remote, US.',
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
	/**
	 * Served from static/ rather than linked to a Google Doc: a canonical URL
	 * that prints, attaches, and survives a corporate network that blocks
	 * Drive. Carries no email or phone — every contact route is the LinkedIn
	 * link above it, deliberately.
	 */
	resume: Object.freeze({ label: 'Résumé (PDF)', href: '/nolindnaidoo-resume.pdf' }),
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
		note: '@nolindnaidoo · 19 repositories',
	}),
	Object.freeze({
		label: 'SplitWinner',
		href: 'https://www.splitwinner.com',
		note: 'founder & chief engineer',
	}),
]);
