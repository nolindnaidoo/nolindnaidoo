import type { Project, Property } from './types';

export const projects: readonly Project[] = Object.freeze([
	Object.freeze({
		name: 'pixelcoords',
		href: 'https://pixelcoords.dev',
		summary:
			'Freeze your screen, mark regions with real shapes, and get pixel-exact coordinates machines can use — versioned JSON, labeled crops, click code, verification with exit codes, self-healing re-location.',
		tech: 'Rust',
		facts: Object.freeze(['MIT', 'macOS · Windows · Linux', 'crates.io']),
	}),
	Object.freeze({
		name: 'pixelactions',
		href: 'https://pixelactions.dev',
		summary:
			'Verified desktop interactions driven from a pixelcoords session — click, type, chord, drag, scroll at human-marked coordinates, then confirm they landed. Chained CLI, flow files, or a line protocol any language can drive.',
		tech: 'Rust',
		facts: Object.freeze(['MIT', 'macOS', 'Line protocol']),
	}),
	Object.freeze({
		name: 'The *-le suite',
		href: 'https://letools.dev',
		summary:
			'Ten zero-hassle VS Code utilities, past 76,000 installs. Secrets detection that never leaves your machine, env sync with visual diff and conflict resolution, regex with live previews and ReDoS scoring, and seven more. Being ported to Zed, with the cores republished as Rust crates.',
		tech: 'TypeScript',
		facts: Object.freeze(['10 extensions', '76K+ installs', 'Zed & Rust in progress']),
	}),
]);

/**
 * Where the open-source work ships — the publisher/namespace hubs, one per
 * channel. These live with the Open source section, not Elsewhere: they are
 * distribution for the work above, not identity. Every URL is the verified
 * canonical hub (the Open VSX namespace is genuinely `OffensiveEdge` — that
 * is where the extensions publish; renaming it would orphan 75K installs).
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
