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
		 * Rendered as the section's only paragraph, so this has to hold together as
		 * one continuous read. The heading makes the claim; the body has to pay it
		 * off with mechanisms rather than restate it — the environments are evidence
		 * for the claim, not the subject of it.
		 */
		body: `I have built inside enterprises with a hundred stakeholders and inside startups with
			none — a Fortune 10 trading floor, a DoD communications platform, a state records system, a
			retail program that drew media attention years before consumers could touch it. Three of
			those were among the first of their kind in banking, defense, and automotive retail. None of
			it was a solo act, and the parts that lasted were never the parts I typed. A coverage floor
			holds after I stop watching. A component library with every property documented makes the
			next person faster than I was. An agent guide enforced in CI keeps the bar in place whether
			or not anyone is paying attention that day. I would rather make eight engineers faster than
			out-ship them alone. Give me a roadmap and I will execute against it; give me a blank page
			and I will come back with the roadmap, a working prototype, and the reasoning behind both.
			Either way the measure is the same: what the team can do afterward that it could not do
			before.`,
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
