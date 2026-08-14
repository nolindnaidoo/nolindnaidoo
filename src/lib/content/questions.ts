import type { Question } from './types';

/**
 * The objections a reader is already holding, asked in their words and answered
 * without a hedge.
 *
 * This section exists because the page makes nine claims in `ledger` and cites
 * a source on one of them. Every other row asks to be taken on trust, and a
 * reader who notices that deserves the answer at the point they notice it
 * rather than three clicks away.
 *
 * The answers refuse where there is nothing to hand over. That is the same rule
 * the tools run on — a named refusal beats a plausible answer — applied to the
 * biography instead of to a parser.
 */
export const questions: readonly Question[] = Object.freeze([
	Object.freeze({
		ask: 'Three industry firsts. Says who?',
		answer:
			'The public record covers what shipped and when—launch dates, press, filings—those are easy to check. My role inside those rooms isn’t public, and that’s how the industry works. If you want a resume line you can independently verify, look to the open source: it’s all there, every commit, every decision, every mistake, and every fix in daylight.',
	}),
	Object.freeze({
		ask: 'So what can I actually check?',
		answer:
			"The open source, completely. Ten repositories with full history, CI you can watch run, releases with provenance you can verify, packages on four registries. The install figures come from the registries' APIs, not from me. Start anywhere.",
	}),
	Object.freeze({
		ask: 'Top 3% of Cursor users. Do you write the code?',
		answer:
			'I write the constraints. Every repository carries an agent guide encoding house standards, and generated code either matches or it doesn’t land. The gates don’t care who typed it—a failing scan fails the build either way. The standards are enforced by build gates and checked into every repo. Not assertion—receipts.',
	}),
	Object.freeze({
		ask: 'Has any of this ever gone wrong?',
		answer:
			'Yes, and it’s on the permanent record. Six weeks into the SplitWinner alpha a schema migration rewrote an anchor that was already published. I broke my own append-only rule. That day’s timestamp can never be made to bind again, and the ledger says so, forever.',
	}),
]);

/**
 * Lifted from the case-study intro, where the same argument is made at length.
 * A reader who never opens `/case-studies` still hits the "prove it" objection
 * here, so the passage has to appear at the objection rather than only at the
 * essay.
 *
 * It is a quotation, not a second copy: `content.test.ts` asserts every
 * unelided run still appears verbatim in that intro, so editing the essay and
 * leaving this behind fails the build instead of shipping two versions of one
 * paragraph.
 */
export const closedWorkQuote =
	'That work is authentic and now inaccessible. While it is possible to verify that a bank launched a single-page application in 2014—an uncommon achievement at that time—there is no opportunity to review the underlying code… The more significant the environment, the less of the work can ever be publicly shared.';

/** The elision marker, kept here so the drift guard and the prose agree on it. */
export const QUOTE_ELISION = '…';
