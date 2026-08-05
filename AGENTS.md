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
- **`@sveltejs/adapter-static`** with `strict: true` — every route prerenders.
  A route that cannot be prerendered is a build failure, not a fallback. There
  is no server surface here and there should never be one.
- **Vanilla CSS.** Tokens in `src/app.css`; everything else is a
  component-scoped `<style>` block. No CSS framework, no utility classes.
- **Biome** for lint and format — tabs, single quotes, semicolons always,
  100 columns, matching the `*-le` family. `bun run lint` is the arbiter;
  `bun run format` fixes.
- **Vitest** for unit tests, **Playwright + axe-core** for a11y and end-to-end.
- **bun** is the package manager. Never add another lockfile.

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

**Never pipe a gate through `tail` or `head` to read it.** The pipe swallows the
exit code, and a failing lint has already been reported here as passing because
of it. Run the command bare.

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

## Deploy

Push to `main` on GitHub. Vercel builds and promotes to production. Never run a
`vercel deploy` — the push *is* the deploy. To reload environment with no code
change, push an empty commit.
