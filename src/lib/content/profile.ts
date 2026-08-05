import type { Link, Property } from './types';

export const profile = Object.freeze({
	name: 'Nolin Naidoo',
	/** Rendered stacked, but the trailing space keeps the H1 reading "Nolin Naidoo". */
	nameParts: Object.freeze(['Nolin', 'Naidoo'] as const),
	handle: 'nolindnaidoo',
	title: 'Chief Engineer',
	locality: 'Dallas',
	region: 'TX',
	eyebrow: 'Chief Engineer · Dallas, Texas · building in public',
	tagline: 'nolindnaidoo — everywhere that matters',
	meta: Object.freeze([
		'AI/ML · MLOps · agentic systems',
		'Platform & full-stack architecture',
		'Automotive · finance · defense · public records',
	]),
	thesis: Object.freeze({
		lead: 'Brought in when it’s big, late, and',
		emphasis: 'not working',
		body: `A Fortune 10 trading floor. A DoD communications platform. A statewide records
			system. A retail program announced four years before anyone could buy anything. It’s
			the same engagement every time — something large that isn’t succeeding, a deadline
			that already passed, and a team that has to still be shipping after I leave. Three
			industry firsts came out of those rooms: banking, defense, and automotive retail.`,
	}),
});

export const contact: Readonly<{ primary: Link; links: readonly Link[] }> = Object.freeze({
	primary: Object.freeze({
		label: 'Let’s talk',
		href: 'https://www.linkedin.com/in/nolindnaidoo/',
	}),
	links: Object.freeze([
		Object.freeze({
			label: 'Résumé',
			href: 'https://docs.google.com/document/d/1LpjdR6P_ieJS0f-yhDqXZnZTj91H8knCAkXXW2fwQrY/preview',
		}),
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
		note: '@nolindnaidoo · 19 repositories',
	}),
	Object.freeze({
		label: 'pixelcoords.dev',
		href: 'https://pixelcoords.dev',
		note: 'Rust · coordinate capture',
	}),
	Object.freeze({
		label: 'pixelactions.dev',
		href: 'https://pixelactions.dev',
		note: 'Rust · verified interaction',
	}),
	Object.freeze({
		label: 'letools.dev',
		href: 'https://letools.dev',
		note: '10 VS Code extensions',
	}),
	Object.freeze({
		label: 'crates.io',
		href: 'https://crates.io/crates/pixelcoords',
		note: 'Published Rust crates',
	}),
]);
