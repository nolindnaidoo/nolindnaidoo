import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { socialCard } from '../src/lib/content/social';
import { card } from './build-og-image';
import { BUDGETS, main as budgetMain, kb, walk } from './check-budget';
import {
	claimedExtensions,
	claimedInstalls,
	claimedRepos,
	compare,
	main as driftMain,
	numberIn,
	openVsxDownloads,
	publicRepos,
	publishedExtensions,
	TOLERANCE,
} from './check-content-drift';

/**
 * The scripts are gates. Until now they were verified by running them once and
 * seeing a ✓, which proves the happy path and nothing else — a budget that
 * never fails and a drift check that never detects drift both look exactly like
 * a passing build.
 */

const scratch = mkdtempSync(join(tmpdir(), 'scripts-'));
afterAll(() => rmSync(scratch, { recursive: true, force: true }));

/** A throwaway build tree with files of known size. */
function fakeBuild(files: Readonly<Record<string, number>>): string {
	const root = mkdtempSync(join(scratch, 'build-'));
	for (const [relative, bytes] of Object.entries(files)) {
		const full = join(root, relative);
		mkdirSync(join(full, '..'), { recursive: true });
		writeFileSync(full, 'x'.repeat(bytes));
	}
	return root;
}

describe('check-budget', () => {
	it('formats bytes as kilobytes', () => {
		expect(kb(1024)).toBe('1.0 KB');
		expect(kb(1536)).toBe('1.5 KB');
	});

	it('walks nested directories', () => {
		const root = fakeBuild({ 'a.js': 10, 'nested/b.css': 10, 'nested/deep/c.woff2': 10 });
		expect([...walk(root)]).toHaveLength(3);
	});

	it('passes when every class is under its ceiling', () => {
		expect(budgetMain(fakeBuild({ 'app.js': 100, 'app.css': 100 }))).toBe(0);
	});

	it('fails when a class is over', () => {
		const js = BUDGETS.find((budget) => budget.label === 'client JS');
		expect(js).toBeDefined();
		expect(budgetMain(fakeBuild({ 'huge.js': (js?.ceiling ?? 0) + 1 }))).toBe(1);
	});

	it('sums a class across files rather than checking the largest', () => {
		// Ten files under the ceiling individually can still blow it together —
		// the failure mode a per-file check would miss.
		const css = BUDGETS.find((budget) => budget.label === 'CSS');
		const each = Math.ceil((css?.ceiling ?? 0) / 4);
		const files = Object.fromEntries([0, 1, 2, 3, 4].map((n) => [`s${n}.css`, each]));
		expect(budgetMain(fakeBuild(files))).toBe(1);
	});

	it('reports misuse when there is no build directory', () => {
		expect(budgetMain(join(scratch, 'never-built'))).toBe(2);
	});

	it('covers every asset class the site actually ships', () => {
		const labels = BUDGETS.map((budget) => budget.label);
		expect(labels).toEqual(expect.arrayContaining(['client JS', 'CSS', 'fonts', 'HTML']));
	});
});

describe('check-content-drift', () => {
	it('extracts a number from a content string', () => {
		expect(numberIn('10 extensions', 'x')).toBe(10);
		expect(numberIn('@nolindnaidoo · 19 repositories', 'x')).toBe(19);
		expect(numberIn('13,700 installs', 'x')).toBe(13700);
	});

	it('throws rather than guessing when there is no number', () => {
		expect(() => numberIn('no digits here', 'label')).toThrow(/no number found in label/);
	});

	it('reads the claims from the content modules, not a regex over source', () => {
		expect(claimedExtensions()).toBeGreaterThan(0);
		expect(claimedRepos()).toBeGreaterThan(0);
		// "76K+" in the ledger means 76,000 downloads, not 76.
		expect(claimedInstalls()).toBeGreaterThan(1000);
	});

	it('accepts movement inside the tolerance', () => {
		expect(compare('x', 100, 100).ok).toBe(true);
		expect(compare('x', 100, Math.round(100 * (1 + TOLERANCE))).ok).toBe(true);
	});

	it('rejects movement past it', () => {
		expect(compare('x', 100, 200).ok).toBe(false);
		expect(compare('x', 76, 0.505).ok).toBe(false);
	});

	it('treats a zero source as total drift rather than dividing by zero', () => {
		const result = compare('x', 10, 0);
		expect(result.ok).toBe(false);
		expect(Number.isFinite(result.drift)).toBe(true);
	});
});

describe('build-og-image', () => {
	const markup = card('data:font/woff2;base64,AAAA');

	it('renders the card at the declared size', () => {
		expect(markup).toContain(`width: ${socialCard.width}px`);
		expect(markup).toContain(`height: ${socialCard.height}px`);
	});

	it('renders the copy the content module owns', () => {
		expect(markup).toContain(socialCard.eyebrow);
		for (const part of socialCard.name) expect(markup).toContain(`<span>${part}</span>`);
		for (const item of socialCard.domains) expect(markup).toContain(item);
	});

	it('inlines the font rather than referencing a file the renderer may not find', () => {
		expect(markup).toContain('data:font/woff2;base64,');
		expect(markup).toContain("format('woff2')");
		// woff2-variations is not a recognised format string; using it meant the
		// face silently never loaded.
		expect(markup).not.toContain('woff2-variations');
	});
});

/**
 * The network layer, with fetch stubbed. The behaviour that matters is the
 * distinction the script makes between "the source disagrees" — which must fail
 * the build — and "the source is unreachable", which must not: an outage says
 * nothing about whether the content is honest, and a gate that goes red when
 * GitHub hiccups is a gate people start ignoring.
 */
describe('check-content-drift network layer', () => {
	afterEach(() => vi.unstubAllGlobals());

	function stubFetch(handler: (url: string) => Response | Promise<Response>) {
		vi.stubGlobal(
			'fetch',
			vi.fn((input: RequestInfo | URL) => handler(String(input))),
		);
	}

	const marketplaceBody = (count: number) =>
		JSON.stringify({ results: [{ extensions: Array.from({ length: count }, () => ({})) }] });

	/** Ten extensions are summed, so each stub returns a tenth of the target. */
	const openVsxBody = (total: number) => JSON.stringify({ downloadCount: Math.round(total / 10) });

	/** Routes each host to the body that satisfies the current content. */
	const agreeing = (url: string) => {
		if (url.includes('marketplace')) {
			return new Response(marketplaceBody(claimedExtensions()), { status: 200 });
		}
		if (url.includes('open-vsx')) {
			return new Response(openVsxBody(claimedInstalls()), { status: 200 });
		}
		return new Response(JSON.stringify({ public_repos: claimedRepos() }), { status: 200 });
	};

	it('counts the extensions the marketplace reports', async () => {
		stubFetch(() => new Response(marketplaceBody(10), { status: 200 }));
		await expect(publishedExtensions()).resolves.toEqual({ value: 10 });
	});

	it('reports a non-200 as an error rather than a count of zero', async () => {
		stubFetch(() => new Response('nope', { status: 503 }));
		const result = await publishedExtensions();
		expect(result.value).toBeUndefined();
		expect(result.error).toContain('503');
	});

	it('treats a missing downloadCount as zero rather than NaN', async () => {
		// Open VSX omits the field for an extension with no downloads yet; NaN
		// here would propagate into the drift maths and fail incomprehensibly.
		stubFetch(() => new Response(JSON.stringify({}), { status: 200 }));
		await expect(openVsxDownloads()).resolves.toEqual({ value: 0 });
	});

	it('treats a missing repo count as zero', async () => {
		stubFetch(() => new Response(JSON.stringify({}), { status: 200 }));
		await expect(publicRepos()).resolves.toEqual({ value: 0 });
	});

	it('treats an empty marketplace response as zero extensions', async () => {
		stubFetch(() => new Response(JSON.stringify({}), { status: 200 }));
		await expect(publishedExtensions()).resolves.toEqual({ value: 0 });
	});

	it('reports a non-Error rejection without losing the cause', async () => {
		stubFetch(() => Promise.reject('a bare string'));
		const result = await publicRepos();
		expect(result.error).toContain('a bare string');
	});

	it('reports an unreachable host as an error', async () => {
		stubFetch(() => Promise.reject(new Error('getaddrinfo ENOTFOUND')));
		const result = await publicRepos();
		expect(result.error).toContain('unreachable');
	});

	it('reads the public repository count', async () => {
		stubFetch(() => new Response(JSON.stringify({ public_repos: 19 }), { status: 200 }));
		await expect(publicRepos()).resolves.toEqual({ value: 19 });
	});

	it('sums downloads across the whole suite', async () => {
		stubFetch(() => new Response(openVsxBody(70_000), { status: 200 }));
		await expect(openVsxDownloads()).resolves.toEqual({ value: 70_000 });
	});

	it('fails the whole figure when one extension is unreachable', async () => {
		// A partial sum would silently understate the total and read as drift.
		let calls = 0;
		stubFetch(() => {
			calls += 1;
			if (calls === 3) return Promise.reject(new Error('offline'));
			return new Response(openVsxBody(70_000), { status: 200 });
		});
		const result = await openVsxDownloads();
		expect(result.value).toBeUndefined();
		expect(result.error).toContain('unreachable');
	});

	it('passes when every source agrees with the content', async () => {
		stubFetch(agreeing);
		await expect(driftMain()).resolves.toBe(0);
	});

	it('fails when a reachable source disagrees', async () => {
		stubFetch((url) =>
			url.includes('marketplace')
				? new Response(marketplaceBody(claimedExtensions() + 40), { status: 200 })
				: agreeing(url),
		);
		await expect(driftMain()).resolves.toBe(1);
	});

	it('passes when every source is unreachable', async () => {
		stubFetch(() => Promise.reject(new Error('offline')));
		await expect(driftMain()).resolves.toBe(0);
	});
});
