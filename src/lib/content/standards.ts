import type { Standard } from './types';

export const standardsNote = `These aren’t aspirations. Everything is written into the agent and
	contributor guides in my repositories and enforced by a check that fails the build.`;

/**
 * What the work has to survive, rather than what it aspires to. Each entry
 * pairs the claim with the test it has to pass — the `aside` is that test named
 * in three words, so a reader scanning only the headings still gets the
 * argument.
 *
 * These replaced a list of seven principles. Principles are the cheapest thing
 * on a page like this: everybody asserts them and nothing checks them. The
 */
export const standards: readonly Standard[] = Object.freeze([
	Object.freeze({
		title: 'Coverage floors',
		aside: 'A number, not a habit',
		detail:
			'Every repository carries a coverage floor that blocks the merge, not a target somebody aims at. Tests are written to break the thing rather than to confirm it works, and a failing check stops the build whoever wrote the code. “It should work” is not a state a repository can be in.',
	}),
	Object.freeze({
		title: 'Dependencies are liabilities',
		aside: 'Only what survives',
		detail:
			'I have tried most of the methodologies sold in the last decade in production. The right tool is the one that clears the bar for reliability, not the one with the loudest supporters. I cut dependencies, pin versions to whatever generated the lockfile, and treat every external as a liability until proven otherwise. The audit-trail verifier is pure standard library on purpose: asking someone to install my requirements in order to check my work would defeat the point of publishing it.',
	}),
	Object.freeze({
		title: 'Context is the budget',
		aside: 'Routing, not dumping',
		detail:
			'Context is the scarce resource in agent-assisted work, so I route it instead of dumping it. A root map points at repositories; each repository’s guide imports the standards beside it; service-scoped guides win on detail inside their own directory; nothing loads a sibling repository’s docs for a task that does not touch it. Rules that are expensive to relearn are written next to the reason they exist — so the next session starts where the last one ended rather than rediscovering it.',
	}),
	Object.freeze({
		title: 'Small jobs, hard edges',
		aside: 'Less magic, more factory',
		detail:
			'The agent work that pays off is not a long unattended session. It is a short job with a narrow scope, a verifiable output, and a way to tell whether it worked — the engineering is in the edges, not the model. That is why the Limited Edition tools all have the same shape: one job each, deterministic, local, exit codes as the API, no network. Sixteen of them compose; none of them improvises. An agent calling one gets the same contract an editor gets, and the same answer twice.',
	}),
	Object.freeze({
		title: 'Determinism first',
		aside: 'Same input, same bytes',
		detail:
			'You cannot verify what you cannot reproduce. BLAS thread pools pinned in the process environment before numpy loads, because the libraries lock them at import and setting it from Python is already too late. Seeds set explicitly on every run rather than inherited from a default. Golden vectors that make the verifier self-test before it tests anything of mine. It matters most where the output is published: a prediction anchored to a public ledger has to regenerate exactly, or the anchor proves nothing.',
	}),
	Object.freeze({
		title: 'Drift gates',
		aside: 'The check, not the fix',
		detail:
			'When two things have to agree — a claim and its source, a doc and an enum, a CI pin and the lockfile that generated it — the answer is a check that fails when they diverge, not a correction to the instance. Every install figure on this page is compared against the registries’ own APIs on each run, so a number that drifts fails a gate before a reader finds it. Generated code meets the same bar as hand-written or it does not merge, and the gate does not care who typed it.',
	}),
]);
