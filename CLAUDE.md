@AGENTS.md

Repo-specific rules on top of the guide above:

- **`README.md` is the GitHub profile, not this project's readme.** It renders
  on <https://github.com/nolindnaidoo>. Never touch it during site work, and
  never let a scaffolder generate over it.
- **Deploy is `git push` to `main`** — Vercel auto-builds. Never run a Vercel
  deploy command.
- **Content honesty is the product.** Every claim on this page has to survive a
  reader who checks it. A superlative carries the year that makes it checkable;
  a number carries the client it belongs to. If a claim can't be stated
  precisely, it comes off the page rather than getting softened into something
  unfalsifiable.
- **Copy goes in `src/lib/content/`, never in a component.** The structured data
  derives from the same modules, and the tests exist to keep them in lockstep.
- **Voice**: short declaratives, no hype, no marketing register. The audience is
  a hiring manager or a senior engineer who will stop reading at the first
  unearned adjective.
