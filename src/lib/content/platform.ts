import type { Capability, PlatformSystem } from './types';

/**
 * Current work. The company name appears here and nowhere else in the codebase,
 * so a rebrand is a one-line edit rather than a grep across components and
 * structured data.
 *
 * The IP line: receipts, never the recipe. Nothing here names training
 * architecture, model families, or tooling behind the seam — what the systems
 * *are* and how they're *verified*, never how they're built. If a summary
 * wouldn't ship on splitwinner.com, it doesn't ship here.
 */
export const platform: Readonly<{
	company: string;
	lede: string;
	body: string;
	systems: readonly PlatformSystem[];
	capabilities: readonly Capability[];
}> = Object.freeze({
	company: 'OffensiveEdge',
	lede: 'A sports prediction feed with a public audit trail.',
	body: `Lead AI engineer on SplitWinner, a platform where every prediction is hashed and
		attested to two independent roots before the event starts — Bitcoin via OpenTimestamps and
		the Sigstore Rekor transparency log. The result is an append-only ledger anyone can check
		with a single file of standard-library Python, no account required. I built the machine
		learning platform and the LLM product on top of it: ingestion, feature pipelines, training
		and serving, a ReAct agent harness with tool-calling and retrieval, the public API, the
		trading-desk terminal, and the verification layer. The point is that you do not have to
		trust the operator. Neither do I.`,
	systems: Object.freeze([
		Object.freeze({
			kind: 'Predictive',
			name: 'SplitWinner',
			summary:
				'Sports prediction for sportsbook trading desks — calibrated, conformal, and anchored to a public tamper-proof ledger before every kickoff. Records get faked in this category; this one can’t be, not even by us.',
			url: 'https://www.splitwinner.com',
		}),
	]),
	capabilities: Object.freeze([
		Object.freeze({
			label: 'Verification',
			detail:
				'A public append-only audit trail with Bitcoin-anchored timestamps — one pure-stdlib verifier checks the whole chain, no account, no trust required.',
		}),
		Object.freeze({
			label: 'Modeling',
			detail:
				'Calibrated probabilities with conformal sets, validated on held-out data and proven in a five-week public live alpha — skips disclosed, nothing deleted.',
		}),
		Object.freeze({
			label: 'MLOps',
			detail:
				'Daily training-to-serving pipelines behind a signed, versioned API — parallel model deployment, automated versioning, sub-second inference.',
		}),
		Object.freeze({
			label: 'Product',
			detail:
				'Full-stack architecture across Next.js, React, React Native, TypeScript and Python, unifying every product surface on one inference backbone.',
		}),
	]),
});
