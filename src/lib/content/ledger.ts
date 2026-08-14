import type { LedgerEntry } from './types';

/**
 * The record, ordered by impact rather than chronology. The three industry
 * firsts lead, and each carries a year in its attribution — a "first" only
 * means something anchored to when it was hard, and a bare superlative invites
 * a reader to go disprove it.
 *
 * One entry per engagement. A second achievement from the same client belongs
 * in that entry's `detail`, never as another row; `content.test.ts` enforces it.
 *
 * `secondary` and `sources` are always present (as `undefined` and `[]`) rather
 * than optional, so no render body has to carry a fallback.
 */
export const ledger: readonly LedgerEntry[] = Object.freeze([
	Object.freeze({
		id: 'general-motors',
		claim: 'Shipped the first way to buy a car outright on a major manufacturer’s own website',
		value: 'First to market',
		secondary: 'in production, 2017',
		attribution: 'General Motors · Shop Click Drive · 2017',
		detail: Object.freeze([
			'Chevrolet, GMC, Buick and Cadillac. Franchise law means the manufacturer can never hold the transaction, so the entire purchase brokers through a third party the customer never sees — one seamless flow built around a legal boundary.',
			'Announced years earlier and still not live when I arrived. The program had a 100-person manual QA organization; I wrote the automated suite that gated the release on my own — Selenium, Mocha, Chai, Sinon, SuperTest, Postman — and took Google Page Speed up by 90%.',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'l3harris',
		claim:
			'Architected the first Node.js application ever put into service in the Department of Defense',
		value: 'First in DoD',
		secondary: undefined,
		attribution: 'L3Harris Technologies · Communication Systems · 2016',
		detail: Object.freeze([
			'Node.js and React into defense service, on a stack that had never cleared it. Moved 40 remote engineers off strictly-typed C# · test coverage 0 → 80% · React localization framework adopted enterprise-wide',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'jpmorgan',
		claim:
			'Pioneered the first single-page application in banking — chase.com and the Chase mobile app',
		value: 'First in banking',
		secondary: 'top 6 of a 300+ division',
		attribution: 'JPMorgan Chase & Co. · CMH1 flagship team · 2014',
		detail: Object.freeze([
			'One of six engineers on the flagship team at a Fortune 10 bank. Built on Ember, when a bank shipping a single-page app at that scale was still unproven · jQuery fully removed · codebase down 30% · ten minutes off every build',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'ias',
		claim:
			'Chief engineer on a national live-auction platform — sub-two-second feed, bids exact to thirteen decimal places',
		value: '< 2s',
		secondary: '13 decimals',
		attribution: 'Integrated Auction Solutions',
		detail: Object.freeze([
			'In a live auction, rounding error decides who wins — thirteen places of precision removed it for every bidder in the country.',
			'Built the consumer website, the mobile app, and the on-site inventory cataloging apps outright — React and React Native on one schema.',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'rumbleon',
		claim:
			'Principal engineer for the largest motorcycle retailer in the country — web, mobile, and a serverless rebuild',
		value: '−75% cloud',
		secondary: '$40K → $10K / mo',
		attribution: 'RumbleOn',
		detail: Object.freeze([
			'Created Carvis, the direct vehicle-purchasing mobile platform, and led website and mobile development end to end — AppSync and GraphQL on React Native, lead-to-sale conversion up 22%.',
			'RumbleOn ran on the auction platform I was chief engineer on at Integrated Auction Solutions, and brought me in as principal engineer to own their side of it.',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 't-rowe-price',
		claim:
			'Shipped the localization layer behind a global asset manager’s client site — the languages its brokers use with clients',
		value: '15+ locales',
		secondary: '500+ a11y fixes',
		attribution: 'T. Rowe Price',
		detail: Object.freeze([
			'Granite i18n across every supported market, and the ADA remediation pilot that found and resolved 500+ accessibility failures on the same platform.',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'kofile',
		claim: 'Brought the State of Texas digital records system into ADA and Section 508 compliance.',
		value: 'Statewide',
		secondary: 'task completion +34%',
		attribution: 'Kofile Technologies',
		detail: Object.freeze([
			'Rebuilt the experience from business-centric to human-centric, and taught the product managers to treat accessibility as a requirement rather than a remediation.',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'poly-lingo',
		claim: 'Half-owner of an award-winning EMS interpretation company, through to its acquisition',
		value: '50% partner',
		secondary: undefined,
		attribution: 'Poly Lingo / MedLingo → ESO Solutions',
		detail: Object.freeze([
			'Texas Fire Chief’s Lone Star Achievement Award · EMS World Top Innovation Award · shipped the iOS product to the App Store.',
		]),
		sources: Object.freeze([]),
	}),
	Object.freeze({
		id: 'open-source',
		claim: 'Developer tools shipped in the open, growing entirely by word of mouth',
		value: '76K+',
		secondary: 'installs and climbing',
		attribution: '10 VS Code extensions · 2 Rust binaries',
		detail: Object.freeze([
			'13,700 in the first week and it never slowed down — no marketing, no launch budget. Currently porting the suite to Zed and republishing the cores as Rust crates.',
		]),
		sources: Object.freeze([
			Object.freeze({ label: 'letools.dev', href: 'https://letools.dev' }),
			Object.freeze({ label: 'crates.io', href: 'https://crates.io/crates/pixelcoords' }),
		]),
	}),
]);
