import type { Standard } from './types';

export const standardsNote = `These aren’t aspirations. Everything is written into the agent and
	contributor guides in my repositories and enforced by a check that fails the build.`;

export const standards: readonly Standard[] = Object.freeze([
	Object.freeze({
		title: 'Correctness is proven, not asserted.',
		detail:
			'Run the check before claiming the state, and the test that would have caught the bug ships with the fix. “It should work” is not a status.',
	}),
	Object.freeze({
		title: 'Guard against drift; don’t fix the instance.',
		detail:
			'When two things must agree — a doc and an enum, a help text and a parser, a CI pin and a version floor — add the check that fails when they diverge. Fixing one occurrence of a class of bug is half the job.',
	}),
	Object.freeze({
		title: 'Refuse rather than guess.',
		detail:
			'A system that answers confidently and wrongly is worse than one that stops and names what it needs. This is the design philosophy of my Rust tools and the review standard I hold teams to.',
	}),
	Object.freeze({
		title: 'A dependency is a cost, not a shortcut.',
		detail:
			'Every one is a supply chain, an upgrade path, and somebody else’s roadmap. I have removed far more than I have added — jQuery from a Fortune 10 codebase, half the dependency tree from a million-line monolith.',
	}),
	Object.freeze({
		title: 'Accessibility and performance are build gates.',
		detail:
			'Axe runs on every page, in both themes, in CI. A failing scan fails the build; raising a bundle budget requires a written reason. Never a warning nobody reads.',
	}),
	Object.freeze({
		title: 'Documentation is kept honest or deleted.',
		detail:
			'A stale doc is worse than no doc, because someone will trust it. Claims carry the date they were verified, or they come out.',
	}),
	Object.freeze({
		title: 'Agents work to the same bar.',
		detail:
			'Every repository includes an agent guide that encodes these standards, so generated code either complies with the house idiom or it doesn’t land. I was in the top 3% of Cursor users worldwide in 2025 — that leverage only compounds when the constraints are written down and enforced by CI.',
	}),
]);
