#!/usr/bin/env bun

/**
 * Checks the site's countable claims against the sources that own them.
 *
 * This page argues that its claims survive checking. Every number on it is a
 * hand-typed constant, so without this the argument decays the moment a count
 * moves — and the numbers most worth stating are exactly the ones that move.
 *
 * Run under bun so it imports the content modules directly. The first version
 * regex-parsed the source files, which meant reformatting a string literal
 * could silently disable a check while still reporting success.
 *
 * A network failure is not drift. An unreachable source warns and passes,
 * because an outage says nothing about whether the content is honest. A
 * reachable source that disagrees fails the build.
 *
 * Install totals come from Open VSX, which is where they actually accrue: the
 * Marketplace `install` statistic covers one channel and reports about 500,
 * while Open VSX reports seventy thousand. Checking the wrong registry once
 * already produced a confident, wrong conclusion that the claim was inflated.
 *
 * Run: bun run verify:content
 */

import { ledger } from '../src/lib/content/ledger';
import { elsewhere } from '../src/lib/content/profile';
import { projects } from '../src/lib/content/projects';

const PUBLISHER = 'nolindnaidoo';
/** Open VSX publishes under a different namespace from the GitHub handle. */
const OPEN_VSX_NAMESPACE = 'OffensiveEdge';
const EXTENSIONS = [
	'secrets-le',
	'scrape-le',
	'urls-le',
	'regex-le',
	'string-le',
	'paths-le',
	'numbers-le',
	'colors-le',
	'dates-le',
	'envsync-le',
] as const;
const TIMEOUT_MS = 20_000;

/** Counts move between commits; a claim is stale only once it is well past. */
export const TOLERANCE = 0.15;

type Fetched<T> = { value: T; error?: undefined } | { value?: undefined; error: string };

export type Check = Readonly<{
	label: string;
	claimed: number;
	actual: number;
	drift: number;
	ok: boolean;
}>;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<Fetched<T>> {
	try {
		const response = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
		if (!response.ok) return { error: `${url} responded ${response.status}` };
		return { value: (await response.json()) as T };
	} catch (cause) {
		const detail = cause instanceof Error ? cause.message : String(cause);
		return { error: `${url} unreachable: ${detail}` };
	}
}

/** The number embedded in a content string, e.g. "10 extensions" -> 10. */
export function numberIn(haystack: string, label: string): number {
	const match = haystack.match(/(\d[\d,]*)/);
	if (!match?.[1]) throw new Error(`no number found in ${label}: "${haystack}"`);
	return Number(match[1].replace(/,/g, ''));
}

export async function publishedExtensions(): Promise<Fetched<number>> {
	type Query = { results?: { extensions?: unknown[] }[] };
	const result = await fetchJson<Query>(
		'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery',
		{
			method: 'POST',
			headers: {
				accept: 'application/json;api-version=7.2-preview.1',
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				filters: [{ criteria: [{ filterType: 18, value: PUBLISHER }], pageSize: 100 }],
				flags: 914,
			}),
		},
	);
	if (result.error) return { error: result.error };
	return { value: result.value.results?.[0]?.extensions?.length ?? 0 };
}

/**
 * Total downloads across the suite. Open VSX has no namespace-wide totals
 * endpoint, so this sums per extension; one unreachable extension fails the
 * whole figure rather than silently reporting a smaller one.
 */
export async function openVsxDownloads(): Promise<Fetched<number>> {
	const results = await Promise.all(
		EXTENSIONS.map((name) =>
			fetchJson<{ downloadCount?: number }>(
				`https://open-vsx.org/api/${OPEN_VSX_NAMESPACE}/${name}`,
			),
		),
	);

	const failed = results.find((result) => result.error);
	if (failed?.error) return { error: failed.error };

	return {
		value: results.reduce((sum, result) => sum + Number(result.value?.downloadCount ?? 0), 0),
	};
}

export async function publicRepos(): Promise<Fetched<number>> {
	const result = await fetchJson<{ public_repos?: number }>(
		`https://api.github.com/users/${PUBLISHER}`,
		{ headers: { accept: 'application/vnd.github+json' } },
	);
	if (result.error) return { error: result.error };
	return { value: Number(result.value.public_repos ?? 0) };
}

export function compare(label: string, claimed: number, actual: number): Check {
	const drift = actual === 0 ? 1 : Math.abs(claimed - actual) / actual;
	return { label, claimed, actual, drift, ok: drift <= TOLERANCE };
}

/** The "10 extensions" fact, read from the project that states it. */
export function claimedExtensions(): number {
	const suite = projects.find((project) => project.facts.some((fact) => /extensions/.test(fact)));
	if (!suite) throw new Error('no project states an extension count');
	const fact = suite.facts.find((item) => /extensions/.test(item));
	return numberIn(fact as string, 'extension count');
}

/** The "76K+" headline value, read from the ledger row that states it. */
export function claimedInstalls(): number {
	const row = ledger.find((entry) => /installs/.test(entry.secondary ?? ''));
	if (!row) throw new Error('no ledger row states an install count');
	return numberIn(row.value, 'install count') * 1000;
}

/** The "19 repositories" fact, read from the identity network entry. */
export function claimedRepos(): number {
	const github = elsewhere.find((property) => property.href.includes('github.com'));
	if (!github) throw new Error('no GitHub entry in the identity network');
	return numberIn(github.note, 'repository count');
}

export async function main(): Promise<number> {
	const [extensions, downloads, repos] = await Promise.all([
		publishedExtensions(),
		openVsxDownloads(),
		publicRepos(),
	]);

	const checks: Check[] = [];
	const skipped: string[] = [];

	if (extensions.error) skipped.push(`marketplace — ${extensions.error}`);
	if (extensions.value !== undefined) {
		checks.push(compare('extensions published', claimedExtensions(), extensions.value));
	}

	if (downloads.error) skipped.push(`open vsx — ${downloads.error}`);
	if (downloads.value !== undefined) {
		checks.push(compare('suite downloads', claimedInstalls(), downloads.value));
	}

	if (repos.error) skipped.push(`github — ${repos.error}`);
	if (repos.value !== undefined) {
		checks.push(compare('public repositories', claimedRepos(), repos.value));
	}

	for (const check of checks) {
		process.stdout.write(
			`  ${check.ok ? '✓' : '✗'} ${check.label.padEnd(22)} claims ${check.claimed}, source says ${check.actual} (${(check.drift * 100).toFixed(0)}% off)\n`,
		);
	}
	for (const note of skipped) {
		process.stdout.write(`  ~ skipped: ${note}\n`);
	}

	const failures = checks.filter((check) => !check.ok);
	if (failures.length === 0) {
		if (skipped.length > 0) {
			process.stdout.write('\nSome sources were unreachable; nothing verifiable disagreed.\n');
		}
		return 0;
	}

	process.stderr.write(
		`\ncheck-content-drift: ${failures.length} claim(s) no longer match their source.\n` +
			'Update the content, or the claim is no longer true.\n\n',
	);
	return 1;
}

// Only when executed directly — importing this from a test must not run it.
/* v8 ignore start -- the process entry point; unreachable when imported by a test */
if (import.meta.main) {
	try {
		process.exit(await main());
	} catch (cause) {
		const detail = cause instanceof Error ? (cause.stack ?? cause.message) : String(cause);
		process.stderr.write(
			`\ncheck-content-drift: unexpected failure — this is a bug.\n${detail}\n\n`,
		);
		process.exit(2);
	}
}
/* v8 ignore stop */
