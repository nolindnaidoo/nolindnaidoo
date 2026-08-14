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
 * objections in `questions` carry that weight now, with receipts attached.
 */
export const standards: readonly Standard[] = Object.freeze([
	Object.freeze({
		title: 'Relentless Testing',
		aside: 'Zero Guesswork',
		detail:
			'Everything I build is tested to break, not just to pass. I take an adversarial approach—writing failing tests first, enforcing checklists in CI, and proving correctness before anything ships. No “it should work”—if it’s not tested, it doesn’t count.',
	}),
	Object.freeze({
		title: 'Pragmatic, Not Dogmatic',
		aside: 'Only What Survives',
		detail:
			'I’ve seen every methodology sold in the last decade and tried most in production. The right tool is the one that clears the bar for reliability, not the one with the loudest supporters. I cut dependencies, pin versions, and treat every external as a liability until proven otherwise.',
	}),
	Object.freeze({
		title: '10,000+ Hours Agentic Expertise',
		aside: 'Tried It All',
		detail:
			'Years spent building, breaking, and fixing autonomous systems—enough to see every shortcut, failure mode, and edge case up close. Every repo carries standards and agent guides, checked in and enforced by CI. The receipts are public: open source, reproducible builds, and a changelog that logs the bad as well as the good.',
	}),
	Object.freeze({
		title: 'Shipped What Works',
		aside: 'From Fortune 10 to Solo',
		detail:
			'From legacy rewrites and greenfield launches to million-line monoliths and solo open source projects—I’ve run the full gauntlet. The only standard that matters: does it survive first contact with reality?',
	}),
]);
