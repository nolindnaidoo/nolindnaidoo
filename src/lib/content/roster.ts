import type { RosterEntry } from './types';

/**
 * The note matters as much as the list. Read without it, short consecutive
 * tenures at recognisable names read as churn; read with it, they read as
 * contract engagements that each ended in an offer.
 */
export const rosterNote = `Every one of these was a contract engagement, by design — principal
	consulting delivered through Robert Half. I was brought in for a specific problem, completed
	the contract in every case, and was offered a permanent role at the end of nearly all of them.
	I took the next contract instead: the permanent offers were worth less than the contract
	already paid, and the next problem was the more interesting one.`;

export const roster: readonly RosterEntry[] = Object.freeze([
	Object.freeze({ organization: 'RumbleOn', role: 'Principal engineer · creator of Carvis' }),
	Object.freeze({
		organization: 'Integrated Auction Solutions',
		role: 'Chief engineer · IAS Marketplace',
	}),
	Object.freeze({ organization: 'General Motors', role: 'Shop Click Drive · principal front-end' }),
	Object.freeze({ organization: 'L3Harris Technologies', role: 'Communication Systems' }),
	Object.freeze({ organization: 'Brierley + Partners', role: 'Consumer Loyalty' }),
	Object.freeze({ organization: 'T. Rowe Price', role: 'i18n · ADA · WCAG · 508' }),
	Object.freeze({ organization: 'Kofile Technologies', role: 'Texas state records' }),
	Object.freeze({ organization: 'JPMorgan Chase & Co.', role: 'Flagship team CMH1' }),
	Object.freeze({ organization: 'Poly Lingo / MedLingo', role: 'Partner & principal engineer' }),
]);
