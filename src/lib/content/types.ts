/**
 * Shared types only — no logic, ever.
 *
 * Every field is `readonly` and every collection is a `readonly` array so a
 * component cannot mutate the content it renders. The runtime half of that
 * guarantee is `Object.freeze` at each export site: `readonly` disappears at
 * compile time, and content this page depends on being stable is worth freezing
 * for real.
 */

export type Link = Readonly<{
	label: string;
	href: string;
}>;

/** A link in the identity network — rendered as a card and emitted as `sameAs`. */
export type Property = Link & Readonly<{ note: string }>;

/**
 * One engagement. `value` is the headline datum, `secondary` the quieter one
 * beneath it. `detail` and `sources` are always arrays — never optional — so no
 * render body has to fall back on an empty list.
 */
export type LedgerEntry = Readonly<{
	id: string;
	claim: string;
	value: string;
	secondary: string | undefined;
	/** Client, team, and the year where a year earns its keep — anchoring a "first". */
	attribution: string;
	/** Supporting sentences, each rendered as its own block. */
	detail: readonly string[];
	sources: readonly Link[];
}>;

export type RosterEntry = Readonly<{
	organization: string;
	role: string;
}>;

export type PlatformSystem = Readonly<{
	kind: string;
	name: string;
	summary: string;
	/** Live product site; undefined renders no link. Always present, never optional. */
	url: string | undefined;
}>;

export type Capability = Readonly<{
	label: string;
	detail: string;
}>;

/**
 * `tech` is separated from `facts` because the two are styled differently. The
 * distinction belongs in the data — deriving it from an array index inside the
 * markup hides a content decision in a render body.
 */
export type Project = Readonly<{
	name: string;
	href: string;
	summary: string;
	tech: string;
	facts: readonly string[];
}>;

export type Credential = Readonly<{
	title: string;
	issuer: string;
	detail: string;
}>;

export type Standard = Readonly<{
	title: string;
	detail: string;
}>;
