# nolindnaidoo — agent guide

Source of truth for working in this repo. If you change a convention, update
this file in the same change.

## This repo is two things at once

1. **The GitHub profile.** `README.md` at the root is rendered on
   <https://github.com/nolindnaidoo>. GitHub calls this a *user configuration
   repository* — the name matching the username is what makes it special.
   **Never write to `README.md` as part of site work.** Project documentation
   lives in this file and `CLAUDE.md`, never in the README.
2. **The personal site** at `nolindnaidoo.com`. SvelteKit, prerendered to static
   HTML, deployed by Vercel on push to `main`.

**GitHub Pages must stay disabled.** A `<user>/<user>` repo is the special case
that auto-publishes to `<user>.github.io` from the same branch; enabling it
would race the Vercel build. Vercel is the only deploy path.

## Stack

- **SvelteKit 2** on **Svelte 5** (runes), TypeScript in `strict` mode plus
  `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- **`@sveltejs/adapter-static`, called with no options.** Every route
  prerenders; a route that cannot is a build failure, not a fallback. There is
  no server surface here and there should never be one.
  **Do not pass options to `adapter()`, not even the defaults.** Any option
  opts out of zero-config mode, and on Vercel that makes the adapter write to
  `build/` while the platform looks for `public/` — the deploy fails after a
  green build. `strict` defaults to `true`, so the prerender guarantee is
  unchanged by leaving it out.
- **Vanilla CSS.** Tokens in `src/app.css`; everything else is a
  component-scoped `<style>` block. No CSS framework, no utility classes.
- **Biome** for lint and format — tabs, single quotes, semicolons always,
  100 columns, matching the `*-le` family. `bun run lint` is the arbiter;
  `bun run format` fixes.
- **Vitest** for unit tests (v8 coverage, thresholds enforced), **Playwright +
  axe-core** for a11y, end-to-end, and visual regression.
- **Two vendored faces, no font CDN.** Geist Variable (subset, 26 KB, full
  100–900 axis) for display and JetBrains Mono for data, both preloaded. The
  axis is what makes the hero's scroll-driven weight interpolate rather than
  step, and self-hosting removes a third-party request the page does not need.
- **bun** is the package manager. Never add another lockfile.

## Scripts that gate

| Script | What it protects |
|---|---|
| `bun run budget` | Payload ceilings per asset class. A floor to ratchet **down**; raising one needs the reason in the commit body. |
| `bun run verify:content` | Countable claims against the sources that own them — marketplace installs, extension count, public repos. Drift fails; an unreachable source warns and passes, because an outage says nothing about honesty. |
| `bun run og` | Re-renders `static/og.png` from the site's own hero using Playwright, which is already in the tree. Committed, not built at deploy time: a crawler must find it on first request. |

### Coverage

Enforced at **100 / 100 / 100 statements, functions, lines** and **93 branches**
over everything that carries behaviour: `content/`, `seo/`, `actions/`, the two
route handlers, and `scripts/`. The remaining branches are optional-chain and
nullish guards on external JSON whose absent shape cannot occur without the API
changing; contriving those cases would assert the stub rather than the code.

Two things are excluded on purpose, and neither is a gap:

- **`.svelte` components.** They carry no logic — they render frozen content —
  so a component coverage number measures markup, not behaviour, and produces a
  figure that gets gamed rather than a gate that catches anything. Their
  assurance is the Playwright suite, which covers every section with a visual
  baseline plus the keyboard, landmark and heading assertions.
- **Process entry points** (`if (import.meta.main)`) and `commit-lint.js`.
  Unreachable when a test imports the module, and `commit-lint` is exercised as
  a real binary through its exit codes by `commit-lint.test.ts` — v8 coverage of
  *this* process cannot see another one.

**Scripts export their logic and guard their entry with `import.meta.main`,** so
importing one from a test does not run it. That is what made the budget, drift
and card-rendering logic testable at all; before it, they were verified by
running them once and seeing a ✓, which proves the happy path and nothing else.

**Lighthouse budgets were considered and rejected.** On a prerendered page with
no images, two preloaded fonts and 101 KB of JS, Lighthouse scores 100 and stays
there; `@lhci/cli` would be a large dependency guarding a number that cannot
move without the payload budget failing first.

## Architecture

```
src/
  app.css              design tokens, resets, @font-face — the ONLY global CSS
  app.html             document shell, font preload
  lib/
    content/           all copy, as frozen typed data — one module per concept:
                       site · profile · ledger · platform · roster · projects
                       · credentials · standards. types.ts holds types only.
    components/        one component per section, scoped styles. Band and Note
                       exist because their rules were duplicated across three.
    actions/           Svelte actions (client-only by construction)
    seo/               structured data derived from content/
  routes/              +layout (skip link), +page (composition + <svelte:head>)
static/fonts/          JetBrains Mono subset, vendored (OFL 1.1)
scripts/               commit-lint.js — one validator, hook and CI both call it
e2e/                   Playwright specs (*.e2e.ts)
```

### Copy never lives in markup

Every string on the page comes from `src/lib/content/`, typed against
`content/types.ts`. Components render those types and nothing else. This is not
tidiness — it is what lets `src/lib/seo/person.ts` derive the structured data
from the same source the page renders, so `sameAs` and the visible link grid
cannot drift apart. `src/lib/content/content.test.ts` enforces the invariants.

A rebrand is one edit: `platform.company` in `content/platform.ts`.

**Every content export is `Object.freeze`d.** `readonly` is erased at compile
time; freezing is the half that survives into the browser, and `content.test.ts`
asserts it. Optional-looking fields (`secondary`, `sources`) are always present
as `undefined` and `[]` rather than optional, so no render body carries a
fallback expression.

### Compute above, render below

A render body holds no data shaping — no `?? []`, no index arithmetic, no string
building. If markup needs a derived value, it is a named `const` in the
component's script or a field in the content module. `Project.tech` is separate
from `Project.facts` for exactly this reason: which fact gets the accent is a
content decision, and deriving it from `index === 0` would hide that decision in
the template. The JSON-LD `<script>` tag is assembled in `seo/person.ts` rather
than the component, because a literal `</script>` terminates a Svelte script
block — and because building strings is not a render body's job.

## Content rules

- **One ledger row per engagement.** A second achievement from the same client
  goes in that entry's `detail`, never as another row. Enforced by test.
- **A "first" claim carries a year** in its `attribution`. A first only means
  something anchored to when it was hard, and a bare superlative invites a
  reader to disprove it. Enforced by test.
- **The roster is a record, not navigation.** Its entries are deliberately not
  links — nine anchors to one LinkedIn URL fails WCAG 2.4.4 (link purpose) and
  makes a screen reader announce nine destinations that are one destination.
- **Titles and claims track the résumé and LinkedIn.** If those change, this
  changes in the same pass.

## Accessibility

Non-negotiable, and gated in CI rather than reviewed by eye.

- Every section boundary is a real `<h2>` inside a `<section aria-labelledby>`
  (`Section.svelte`), so both heading navigation and landmark navigation match
  the visual structure. An unnamed `<section>` is not exposed as a region at
  all — heading alone is not enough. Never a styled `<div>`.
- The skip link in `+layout.svelte` is the first focusable element, and `<main>`
  carries `tabindex="-1"` so focus genuinely moves there. Without it several
  browsers scroll without moving focus and the next Tab returns to the top,
  which makes the skip link decorative.
- **Decorative glyphs are `aria-hidden`.** The `↗` and `→` in links are rendered
  by the component, never stored in a content string, so an accessible name is
  never "letools.dev north east arrow". Arrows that carry meaning — `$40K → $10K`
  — stay in the content and read correctly in context.
- `prefers-contrast: more` collapses the muted ramp to full-strength ink and
  firms the rules. Someone who has asked for contrast is not the person to
  defend a low-contrast design decision to.
- Nothing non-interactive carries a hover affordance that suggests it is.
- **`forced-colors: active`** (Windows High Contrast) remaps the rules and the
  accent to system keywords. Borders drawn from a colour token vanish in that
  mode, which would leave the ledger and every section rule as invisible
  structure, and the focus ring is restated with `Highlight` because
  forced-colors can flatten an outline drawn from a custom property.
- axe runs against the built output in **both** colour schemes, at `wcag2a`
  through `wcag22aa` plus `section508`. A violation fails the build.
- Never remove focus rings. `:focus-visible` is defined once, in `app.css`.
- Base styles target the smallest screen; there is a 320px reflow test.
- Any motion respects `prefers-reduced-motion`. The hero's scroll-driven weight
  is the page's only animation, and it re-evaluates the preference on change
  rather than latching at mount.

Keyboard and screen-reader behaviour is covered by e2e, not left to axe — axe
cannot see focus management, landmark structure, or announced noise. The suite
asserts the skip link moves focus into `main`, that Tab continues into content
afterwards, that every anchor is reachable by Tab alone (tracked per element,
since sixteen anchors share eight destinations), that region count matches
heading count, and that accessible names carry no arrow glyphs.

## Verification — the definition of done

```bash
bun run lint && bun run typecheck && bun run test && bun run build && bun run e2e
```

CI runs exactly this chain on every push and pull request. `svelte-check` runs
with `--fail-on-warnings`, which is what makes Svelte's own a11y diagnostics
gate the build alongside everything else.

**Biome overrides, and why.** `noUnusedImports` and `noUnusedVariables` are off
for `.svelte` files because Biome lints the `<script>` block in isolation and
cannot see template usage — every import would report as unused. `svelte-check`
enforces the same rules with full template awareness, so nothing is lost.
`noImportantStyles` is off for `app.css` alone: the `prefers-reduced-motion`
override has to beat component-scoped declarations, which is what `!important`
is for.

**Every fact has exactly one home.** This codebase's failure mode is drift, not
complexity — the bugs it has actually shipped were a font stack edited in a
place that no longer matched, a card type promising an image that did not
exist, and a claim retyped inside a renderer. So:

- The canonical origin lives in `content/site.ts`. `robots.txt` and
  `sitemap.xml` are **routes**, not static files, so they derive from it. The
  e2e suite imports it rather than retyping the domain.
- The social card's copy lives in `content/social.ts` and the renderer imports
  it. `social.test.ts` also reads the committed PNG's IHDR header and asserts
  its real dimensions match the definition, which is what catches "the card was
  changed and `bun run og` was never re-run".
- `scripts/` run under **bun**, not node, so they import the content modules
  directly. An earlier version regex-parsed the source files, which meant
  reformatting a string literal could silently disable a check while still
  reporting success.
- The six agent instruction files are byte-identical and `agent-files.test.ts`
  asserts it, including that every `bun run` command they name actually exists
  in `package.json`.
- `commit-lint.js` stays plain node with no imports: it runs from a git hook,
  where bun is not guaranteed to be on PATH. It is covered by
  `commit-lint.test.ts` against the real binary and its exit codes.

**Never pipe a gate through `tail` or `head` to read it.** The pipe swallows the
exit code, and a failing lint has already been reported here as passing because
of it. Run the command bare.

## Git identity

Every commit uses the GitHub noreply address:

```
13629544+nolindnaidoo@users.noreply.github.com
```

A real address in commit metadata is public forever — GitHub's API serves it
for any public repo, and scrapers harvest it. Never set a real address in
`user.email`, globally or repo-locally, and never commit with one. GitHub's
*Block command line pushes that expose my email* is the backstop; the global
config is the default. A repo-local `user.email` silently overrides the global
one, so check `git config user.email` in a fresh clone before the first commit.

## Commits

Conventional prefixes — `feat:`, `fix:`, `docs:`, `test:`, `ci:`, `build:`,
`chore:`, `refactor:`, `perf:`, `revert:` — an optional `(scope)`, and an
imperative summary under 72 characters with no trailing period.

Enforced twice, by one implementation: `.githooks/commit-msg` rejects the
message before the commit exists, and the `commits` CI job re-checks the pushed
range. Both call `scripts/commit-lint.js`, so the rules cannot drift apart. The
hook is wired by `prepare`, so a fresh clone is covered after `bun install`;
`--no-verify` skips the hook but not CI. Merge subjects are exempt — git writes
those, not a person.

## Security & automation

- **Actions are pinned to commit SHAs**, never tags. A tag is mutable and this
  repo is a public identity surface. The trailing `# vX.Y.Z` comment is what
  Dependabot reads and rewrites.
- **CodeQL** runs on push, PR, and weekly across `javascript-typescript` and
  `actions`.
- **Dependabot** uses the `bun` ecosystem, not `npm` — the npm updater rewrites
  `package.json` without regenerating `bun.lock`, so its PRs could never pass
  the frozen-lockfile gate.
- **Auto-merge is workflow-driven, not GitHub-native.** `main` has no required
  status checks by design, so native auto-merge would land a pull request before
  CI started. `dependabot-auto-merge.yml` waits for the CI run to conclude and
  merges only patch and minor updates; a major can change generated output, and
  a visual baseline shifting is something a human should see.
- **`@playwright/test` is pinned exactly**, no caret. Visual baselines are
  rendering-sensitive, and a minor bump can shift text metrics and fail them for
  reasons that say nothing about the code.

## Security posture

- **CSP is hash-based, not `'unsafe-inline'`.** SvelteKit's `csp.mode: 'hash'`
  emits a per-build hash for each inline script into a `<meta http-equiv>`
  policy. Hard-coding those hashes into the Vercel header instead would mean
  regenerating them by hand every build — drift in the one place where being
  wrong fails closed and takes the page down.
- **`vercel.json` carries only what a meta policy cannot express** —
  `frame-ancestors` and `upgrade-insecure-requests` — plus the non-CSP headers.
- An e2e test asserts the served policy still contains a `sha256-` script source
  and no inline escape hatch, because reverting that would hand the protection
  back silently while every other check passed.
- **CodeQL excludes tests and fixtures** (`.github/codeql-config.yml`). They
  carry inputs meant to look wrong — fabricated SHAs, an unreachable git ref,
  rejected commit subjects — and scanning them yields findings that can only be
  dismissed. A queue of permanent false positives is how a security tool stops
  being read.

## Visual baselines

Playwright suffixes screenshots by platform, so the macOS set generated locally
cannot satisfy the Linux runner. Dispatch the **Update visual baselines**
workflow once after adding or changing a visual test; it regenerates on the
runner and commits. Until Linux baselines exist, the visual specs fail in CI —
which is accurate, not a bug to work around.

## Agent instruction files

Every major assistant looks for its own file, so each is present and each is a
thin pointer to this document:

| File | Tool |
|---|---|
| `AGENTS.md` | the standard itself |
| `CLAUDE.md` | Claude Code |
| `GEMINI.md` | Gemini CLI |
| `.cursorrules`, `.cursor/rules/project.mdc` | Cursor |
| `.windsurfrules` | Windsurf |
| `.clinerules` | Cline |
| `.github/copilot-instructions.md` | GitHub Copilot |

**Keep them thin.** They restate the non-negotiables and route here. They must
never grow a second copy of the standard — a copy drifts, and then two tools
disagree about the same repository.

## Deploy

Push to `main` on GitHub. Vercel builds and promotes to production. Never run a
`vercel deploy` — the push *is* the deploy. To reload environment with no code
change, push an empty commit.
