import type { Project, Property } from './types';

export const projects: readonly Project[] = Object.freeze([
	Object.freeze({
		name: 'Limited Edition Dev Tools',
		href: 'https://letools.dev',
		summary:
			'Ten zero-hassle VS Code utilities, past 97,000 downloads across Open VSX and the VS Code Marketplace. Secrets detection that never leaves your machine, env sync with visual diff and conflict resolution, regex with live previews and ReDoS scoring, and seven more. Being ported to Zed, with the cores republished as Rust crates.',
		tech: 'TypeScript',
		facts: Object.freeze(['10 extensions', '97K+ downloads', 'Zed & Rust in progress']),
	}),
	Object.freeze({
		name: 'pixelcoords',
		href: 'https://pixelcoords.dev',
		summary:
			'Coordinates a computer-use agent can trust, because a human marked them. Freeze the screen, mark regions with real shapes, and get pixel-exact targets as versioned JSON with labeled crops and click code — plus verification with exit codes and self-healing relocation when the UI moves. Built for driving desktop applications that never shipped an API: UI verification, accessibility auditing, and agent computer-use where a guessed coordinate is a failed run.',
		tech: 'Rust',
		facts: Object.freeze(['MIT', 'macOS · Windows · Linux', 'Human-in-the-loop']),
	}),
	Object.freeze({
		name: 'pixelactions',
		href: 'https://pixelactions.dev',
		summary:
			'The execution half: click, type, chord, drag, and scroll at human-marked coordinates, then confirm the interaction actually landed. Chained CLI, flow files, or a line protocol any language can drive. It cannot act on a coordinate a person did not verify first — that constraint is the point, and it is what separates a test harness from a bot.',
		tech: 'Rust',
		facts: Object.freeze(['MIT', 'macOS', 'Verified-only execution']),
	}),
]);

/**
 * Where the open-source work ships — the publisher/namespace hubs, one per
 * channel. These live with the Open source section, not Elsewhere: they are
 * distribution for the work above, not identity. Every URL is the verified
 * canonical hub (the Open VSX namespace is genuinely `OffensiveEdge` — that
 * is where the extensions publish; renaming it would orphan 97K downloads).
 */
export const hubs: readonly Property[] = Object.freeze([
	Object.freeze({
		label: 'VS Code Marketplace',
		href: 'https://marketplace.visualstudio.com/publishers/nolindnaidoo',
		note: 'publisher · 10 extensions',
	}),
	Object.freeze({
		label: 'Open VSX',
		href: 'https://open-vsx.org/namespace/OffensiveEdge',
		note: 'namespace · 10 extensions',
	}),
	Object.freeze({
		label: 'npm',
		href: 'https://www.npmjs.com/~nolindnaidoo',
		note: '10 packages · Sigstore provenance',
	}),
	Object.freeze({
		label: 'MCP Registry',
		href: 'https://registry.modelcontextprotocol.io/v0/servers?search=io.github.nolindnaidoo',
		note: 'io.github.nolindnaidoo · 10 servers',
	}),
	Object.freeze({
		label: 'crates.io',
		href: 'https://crates.io/users/nolindnaidoo',
		note: 'published Rust crates',
	}),
]);
