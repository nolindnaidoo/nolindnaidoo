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
		lead: 'I get the call when it’s big, late, and',
		emphasis: 'broken',
		/**
		 * Opens on the heading's second clause. The h2 is capped at 17ch in a
		 * display face, so the full sentence cannot live there — carrying the tail
		 * into the body keeps the copy whole without turning the fold into seven
		 * lines of 92px type.
		 */
		body: `When everyone else is stuck, and shipping looks impossible. A Fortune 10 trading
			floor. A DoD communications platform. A state records system. A retail program that
			attracted media attention years before consumer access. The assignment was
			consistent: enter high-stakes environments, resolve complex problems, deliver a
			final product, and ensure the team could continue development and support
			independently after I left. My process in each engagement followed a clear
			sequence: first, I assessed and addressed the immediate technical challenges
			impeding progress. Next, I created detailed project documentation and implemented
			structured knowledge transfer sessions, which included technical walkthroughs and
			hands-on training, to ensure all stakeholders could understand and maintain the
			delivered solution. Finally, I established feedback mechanisms to monitor the
			transition and provided guidelines for best practices adoption. This systematic
			approach consistently enabled teams to adopt best practices and function
			autonomously. Three industry firsts resulted—banking, defense, and automotive
			retail. I never left a contract unfinished and was routinely offered permanent
			roles, but I always progressed to the next challenge.`,
	}),
});

export const contact: Readonly<{
	availability: string;
	primary: Link;
	links: readonly Link[];
}> = Object.freeze({
	availability:
		'Taking one senior contract at a time: production ML, agentic systems, full-stack. Remote, US. Open to short-term and long-term contract roles only; not seeking full-time or part-time salaried positions.',
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
		note: 'founder & chief engineer',
	}),
]);
