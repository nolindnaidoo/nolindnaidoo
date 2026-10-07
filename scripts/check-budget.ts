#!/usr/bin/env bun
/**
 * Fails the build when the shipped payload grows past its ceiling.
 *
 * This page is prerendered and static; its whole performance argument is that
 * it is small. Nothing enforces that on its own — a component that pulls in a
 * date library or an icon set costs nothing visible in review and shows up
 * only as a slower page for someone on a phone.
 *
 * The ceilings are a floor to ratchet DOWN, never raised to make a build pass.
 * Raising one needs a written reason in the commit body.
 *
 * Run: bun run budget   (after bun run build)
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Locally the static adapter writes `build/`. On Vercel, zero-config mode
 * detects the platform and writes the Build Output API tree instead
 * (`.vercel/output/static`) — same payload, different path. Resolve whichever
 * exists so the gate measures the real shipped output in both environments
 * instead of exiting 2 in the deploy container.
 */
function resolveOutputDirectory(): string {
	const candidates = [resolve(ROOT, 'build'), resolve(ROOT, '.vercel/output/static')];
	for (const candidate of candidates) {
		if (statSync(candidate, { throwIfNoEntry: false })?.isDirectory()) return candidate;
	}
	return candidates[0];
}

const BUILD = resolveOutputDirectory();

const KB = 1024;

/**
 * Three ways to measure, one per asset class, because "what the visitor
 * downloads" is a different sum for each.
 *
 * - **HTML is per page.** They download exactly one document. Summing made the
 *   ceiling a limit on how many pages the site may have, which is not a
 *   performance property.
 * - **JS is per page too, resolved through the documents.** SvelteKit
 *   code-splits by route, so a total counts chunks no single visitor ever
 *   receives — and it grew the same way summed HTML did, one case study at a
 *   time, until the ceiling was measuring the size of the site rather than the
 *   weight of a visit. Each document is read for the chunks it actually
 *   references and the heaviest one is the number. With no document to
 *   attribute chunks to, this falls back to the sum, which is the only honest
 *   bound available.
 * - **CSS and fonts are summed.** Both are loaded whole on the first paint of
 *   any page, so the total is what the connection pays for.
 *
 * Ceilings are set with room rather than just above where the payload sits. A
 * floor pinned under the current number stops being a backstop and becomes a
 * tax on the next commit, which is how this gate started failing on prose.
 * They ratchet DOWN; raising one needs the reason in the commit body.
 *
 * Measured 2026-09-08: heaviest page 172 KB JS and 33 KB HTML, 16 KB CSS,
 * 62 KB fonts.
 */
export const BUDGETS = Object.freeze([
	{
		label: 'client JS',
		match: (p: string) => p.endsWith('.js'),
		ceiling: 280 * KB,
		perPage: true,
	},
	{ label: 'CSS', match: (p: string) => p.endsWith('.css'), ceiling: 32 * KB },
	{ label: 'fonts', match: (p: string) => p.endsWith('.woff2'), ceiling: 80 * KB },
	{
		label: 'HTML',
		match: (p: string) => p.endsWith('.html'),
		ceiling: 56 * KB,
		/** Long-form prose pages are independent downloads, not a shared bundle. */
		perFile: true,
	},
]);

export function* walk(directory: string): Generator<string> {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		const full = join(directory, entry.name);
		if (entry.isDirectory()) {
			yield* walk(full);
			continue;
		}
		yield full;
	}
}

/**
 * The heaviest single visit: for each document, the assets it actually
 * references. Matching is on the build-relative path, which is how the markup
 * spells it, so a chunk nothing links to counts against no page — that chunk is
 * dead weight in the output and a different problem from a heavy visit.
 */
export function heaviestPage(
	root: string,
	files: readonly string[],
	matched: readonly string[],
): number {
	const pages = files.filter((file) => file.endsWith('.html'));
	if (pages.length === 0) return 0;
	const relative = new Map(matched.map((file) => [file, file.slice(root.length + 1)]));
	let worst = 0;
	for (const page of pages) {
		const markup = readFileSync(page, 'utf8');
		let weight = 0;
		for (const file of matched) {
			const href = relative.get(file);
			if (href && markup.includes(href)) weight += statSync(file).size;
		}
		if (weight > worst) worst = weight;
	}
	return worst;
}

export function kb(bytes: number): string {
	return `${(bytes / KB).toFixed(1)} KB`;
}

export function main(root: string = BUILD): number {
	if (!statSync(root, { throwIfNoEntry: false })?.isDirectory()) {
		process.stderr.write('\ncheck-budget: no build/ directory — run `bun run build` first.\n\n');
		return 2;
	}

	const files = [...walk(root)];
	let over = 0;

	for (const budget of BUDGETS) {
		const matched = files.filter((file) => budget.match(file));
		const sizes = matched.map((file) => statSync(file).size);
		const summed = sizes.reduce((sum, size) => sum + size, 0);
		// Per-file classes are judged by their worst page. Per-page classes are
		// resolved through the documents that reference them, falling back to the
		// sum when there is no document to attribute anything to. Everything else
		// is what a visitor downloads together.
		const perPage = 'perPage' in budget && budget.perPage ? heaviestPage(root, files, matched) : 0;
		const measured =
			'perFile' in budget && budget.perFile
				? Math.max(0, ...sizes)
				: perPage > 0
					? perPage
					: summed;
		const status = measured > budget.ceiling ? '✗' : '✓';
		const share = Math.round((measured / budget.ceiling) * 100);
		const basis =
			('perFile' in budget && budget.perFile) || measured === perPage ? 'heaviest of' : '';

		process.stdout.write(
			`  ${status} ${budget.label.padEnd(10)} ${kb(measured).padStart(9)} / ${kb(budget.ceiling).padStart(9)}  (${share}%, ${basis}${basis ? ' ' : ''}${matched.length} file${matched.length === 1 ? '' : 's'})\n`,
		);

		if (measured <= budget.ceiling) continue;
		over += 1;
	}

	if (over === 0) return 0;

	process.stderr.write(
		`\ncheck-budget: ${over} budget(s) exceeded. Reduce the payload, or raise the ceiling in this file with the reason in your commit body.\n\n`,
	);
	return 1;
}

// Only when executed directly — importing this from a test must not run it.
/* v8 ignore start -- the process entry point; unreachable when imported by a test */
if (import.meta.main) {
	try {
		process.exit(main());
	} catch (cause) {
		const detail = cause instanceof Error ? (cause.stack ?? cause.message) : String(cause);
		process.stderr.write(`\ncheck-budget: unexpected failure — this is a bug.\n${detail}\n\n`);
		process.exit(2);
	}
}
/* v8 ignore stop */
