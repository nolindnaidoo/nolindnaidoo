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

import { readdirSync, statSync } from 'node:fs';
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
 * Measured 2026-08-05 at: js 160 KB, css 12 KB, fonts 62 KB, page 8 KB.
 * Headroom is deliberately tight — a budget you cannot hit is a budget nobody
 * reads.
 *
 * **Scripts, styles and fonts are summed; HTML is measured per page.** A visitor
 * downloads the whole shared bundle, so a total is what their connection
 * actually pays for — but they download exactly one document. Summing HTML made
 * the ceiling a limit on how many pages the site may have, which is not a
 * performance property and would fail this gate every time a case study is
 * added while every individual page stayed lean. Per-page keeps it measuring
 * the thing that matters: no single document is heavy.
 */
export const BUDGETS = Object.freeze([
	{ label: 'client JS', match: (p: string) => p.endsWith('.js'), ceiling: 200 * KB },
	{ label: 'CSS', match: (p: string) => p.endsWith('.css'), ceiling: 24 * KB },
	{ label: 'fonts', match: (p: string) => p.endsWith('.woff2'), ceiling: 80 * KB },
	{
		label: 'HTML',
		match: (p: string) => p.endsWith('.html'),
		ceiling: 40 * KB,
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
		// Per-file classes are judged by their worst page; shared ones by the sum
		// a visitor downloads together.
		const measured =
			'perFile' in budget && budget.perFile
				? Math.max(0, ...sizes)
				: sizes.reduce((sum, size) => sum + size, 0);
		const status = measured > budget.ceiling ? '✗' : '✓';
		const share = Math.round((measured / budget.ceiling) * 100);
		const basis = 'perFile' in budget && budget.perFile ? 'largest of' : '';

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
