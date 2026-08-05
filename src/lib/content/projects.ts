import type { Project } from './types';

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
