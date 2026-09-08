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
		lead: 'I raise the',
		emphasis: 'floor',
		/**
		 * Three beats: where the work happened, the habit the work has in common,
		 * and why it is worth something on a team. The heading makes the claim and
		 * the body has to pay it off with mechanisms — the three named here are the
		 * three case studies in one sentence each, so the section is a promise the
		 * rest of the page keeps rather than a summary of it.
		 *
		 * It read as a manager's paragraph before this: none of it was a solo act,
		 * the parts that lasted were never the parts I typed, rather make eight
		 * engineers faster. That argues against every case study on the site, which
		 * is an engineer finding his own leaks in his own apparatus.
		 *
		 * Rendered beside the heading rather than under it, so the paragraphs are
		 * also what fills the column the display type would otherwise leave empty.
		 */
		body: Object.freeze([
			`A Fortune 10 trading floor. A DoD communications platform. A state records system. A
				retail program that drew media attention years before consumers could touch it. Three of
				those were among the first of their kind in banking, defense and automotive retail —
				built inside enterprises with a hundred stakeholders, and inside startups with none.`,
			`What the work has in common is that I build the thing that catches me. A coverage floor
				that fails the build after I stop watching. A generator that fuzzes two implementations
				of one tool against each other, because I wrote it twice and trusted myself the second
				time. A ledger anchored into Bitcoin and a public transparency log so no prediction can
				be revised after the outcome, including by me — carrying, permanently, the day I broke
				my own append-only rule.`,
			`That is not caution. It is the only way to move quickly on systems where the
				characteristic failure improves your numbers: a leak raises accuracy, a check that never
				runs reports a pass. I have caught myself twice, both times weeks late, both times
				because something I built earlier could see it. Those habits come from working where
				nobody else was checking. They are worth more somewhere someone is.`,
		]),
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
