import type { CaseStudy } from './types';

/**
 * The long version of the work — the connective narrative plus one page per
 * study.
 *
 * `intro` is told as a story rather than stated as a thesis, and it is the only
 * place the through-line appears in full: input, action, record and method are
 * four layers of the same problem, which is that a long chain fails silently
 * and nothing tells you which link went wrong. Each study restates that
 * compressed in its own `standfirst`, because a reader arriving from a link
 * never sees this page.
 *
 * One study per shipped record. A study is added here when its prose is
 * finished, never as a placeholder — the index renders what exists, and an
 * entry linking to a page that isn't written is the failure this whole section
 * argues against.
 */
export const intro: readonly string[] = Object.freeze([
	'I spent fifteen years building things for other people. Banks, defense, automotive retail, healthcare, state records. Some of it was first of its kind, some of it won awards, and one of it was acquired.',
	'Almost none of it can be shown to you.',
	'You can confirm a bank shipped a single-page application in 2014. You cannot read the code, see what I argued for and lost, or watch what happened the week before it went live. That is the trade every senior engineer makes: the more the environment mattered, the less of the work can ever leave it.',
	'I had wanted to write open source that entire time and never found anything reasonable enough to build. Not a shortage of ideas — a shortage of problems I actually had, repeatedly, and understood well enough to solve properly. Libraries written for problems you have merely read about come out looking right and being useless.',
	'Then I went and learned the machine-learning side properly, started building my own models, and discovered that most of the job isn’t modeling.',
	'It is data. Arriving from scraped pages and from APIs, in every format there is, none of them agreeing. Pieces of the same record living in different sources under different names, needing to be merged, labeled, and passed up through the pipeline in a form the next stage can trust. Every value point-in-time accurate — as it faithfully stood then, not as it reads now. The opposite side derived when only one side exists. A growing case space deciding whether a datum is usable at all.',
	'So many pieces have to pass through that chain, and each must be correct at all times, because one mistake anywhere degrades the model.',
	'And nothing tells you. That’s the part that reorganized how I build. If a future value leaks backward into training, the model doesn’t get worse — it gets better. Accuracy climbs. The backtest improves. Every number moves the way you were hoping. Nothing fails, nothing alerts, and everything built on top of that measurement is resting on nothing.',
	'That was the problem I had been waiting for, and everything since has been the same problem at a different layer.',
	'The tools came out of that. Every one of them is a thing I needed twice in a week and got tired of doing by hand — checking whether a page could be scraped before writing the scraper, pulling values out of formats that had no interest in cooperating, finding the key missing from one environment file before a deploy went out. I published them because they were already written, and they found an audience I did not have and never asked for. Sixteen models now run on a daily training-to-serving cycle behind the same discipline: if a stage cannot say whether it worked, it does not ship.',
	'Then I hit the version of it that scared me. A prediction record is worthless if the person who published it can edit it afterward, and I could not prove I had not. Not because I would lie — because a schema migration does not feel like lying, and from the outside the two are identical. So I built a ledger that commits each day into Bitcoin and into a public transparency log, neither of which I can reach.',
	'Six weeks in, a schema migration rewrote an anchor that was already published. I broke my own append-only rule. That day’s timestamp can never be made to bind again, and the record says so, permanently, because a rule that bends when it’s inconvenient for its author isn’t a rule.',
	'The tools are becoming Rust command-line binaries now, for the reason everything else here happened: a pipeline cannot click a menu, and the consumer that matters next isn’t a person.',
	'I have never written about any of this publicly. That was deliberate — I wanted the work standing on its own before I said anything about it. This is the long version.',
]);

export const caseStudies: readonly CaseStudy[] = Object.freeze([
	Object.freeze({
		slug: 'le-tools',
		title: 'Limited Edition Dev Tools',
		// No install figure here on purpose. The count lives in `ledger` and
		// `projects`, which `check-content-drift` reads and verifies against the
		// registries; restating it in a third place would put a number on the site
		// that no gate is watching.
		annotation:
			'Ten tools born from the data chain above, grown with no launch and no marketing. Phase one of something deliberate, and the honest accounting of what the Rust port costs me.',
		standfirst:
			'Ten developer tools, grown entirely by word of mouth. They exist because I was training my own models and the data kept being wrong in ways nothing told me about.',
		sections: Object.freeze([
			Object.freeze({
				heading: 'The chain',
				paragraphs: Object.freeze([
					'I was building models. Most of that work wasn’t modeling.',
					'The data arrived from wherever it arrived — some scraped, some through APIs, none of it agreeing on shape. JSON, YAML, CSV, TOML, INI, .env. Pieces of the same record living in different sources under different names, needing to be merged, labeled, and passed up through the pipeline in a form the next stage could trust.',
					'Underneath that sat the requirements that actually made it hard. Every value had to be point-in-time accurate — the data as it factually stood at that moment, not as it reads today. When only one side of a pair existed, the opposite had to be derived rather than assumed. A large and growing case space decided whether a given datum was usable at all, and that space grew every time a source changed its mind. And the whole pipeline needed end-to-end auditing, with features checked as they went into the model and as they came back out.',
					'So many pieces have to pass up through the chain, and all of them have to be correct at all times. One mistake anywhere degrades the model.',
					'That sentence sounds like perfectionism. It isn’t.',
				]),
			}),
			Object.freeze({
				heading: 'What silent failure looks like',
				paragraphs: Object.freeze([
					'Take point-in-time accuracy, because it is the clearest case.',
					'If a value leaks backward — if the pipeline hands the model something that wasn’t knowable at the timestamp attached to it — the model doesn’t get worse. It gets better. Accuracy climbs. The backtest improves. Every number you’re looking at moves in the direction you were hoping for.',
					'Nothing fails. Nothing alerts. The pipeline runs green.',
					'You find out much later, if you find out at all, and everything built on that measurement rests on nothing.',
					'That’s the shape of every serious failure in this kind of work. A mislabeled field merges cleanly. A silently truncated parse returns a number. A source switches from YYYY-MM-DD to MM/DD/YYYY without telling anyone and every row still parses — the third of March quietly becomes the first of March, and the file stays internally consistent the whole way down.',
					'None of those trip an alert, because nothing about them looks like an error. They look like data.',
					'This is why my tools stop and tell you what they need, rather than guessing. A tool that answers confidently and wrongly is worse than one that refuses, because a refusal costs you ten minutes and a confident wrong answer costs you everything downstream of it.',
				]),
			}),
			Object.freeze({
				heading: 'Why I built them',
				paragraphs: Object.freeze([
					'I had wanted to write open-source software for years but never found anything worth building. Not a shortage of ideas — a shortage of problems I actually had, repeatedly, that I understood well enough to solve properly. Writing a library for a problem you have read about produces a library that looks right.',
					'The data work gave me the problem. Same operations, every day, across every format, between every pair of sources. The goal was blunt: mangle any data source, for any reason, with speed. Get a value out of whatever it is trapped in, see what is actually there, find the drift between two things that are supposed to agree.',
					'Ten tools is what it looks like from the outside. From the inside, it is one capability with ten entry points.',
					'The shape was also the argument. Every one does a single job, runs locally, returns the same answer twice, and reports through an exit code — which is the same shape a job has to have before an agent can be trusted to run it unattended. That is the bet: not one long autonomous session that impresses in a demo, but many short jobs with hard edges that a person or a model can call and verify. Publishing all ten to the Model Context Protocol registry cost almost nothing precisely because they were already built that way.',
				]),
			}),
			Object.freeze({
				heading: 'The shape of the suite is the shape of the job',
				paragraphs: Object.freeze([
					'I wasn’t only training models. The span was the whole stack — the brand, every document, the websites, the backend, the APIs, the data modeling, secure transport, the market data integration, and the parsing of disparate sources into feeds anything could consume. It ended at sixteen models on one daily pipeline.',
					'That span explains the suite better than any feature list. Six of the ten came out of the ingestion chain — checking whether a page could be scraped before writing the scraper, extracting strings, numbers, dates, paths, and URLs from formats that had no interest in cooperating. The other four came from everything surrounding it: keeping credentials out of commits, finding the missing key across environment files before a deploy, testing a regular expression before it went somewhere it could hang, and auditing color across a brand I also owned.',
					'Nobody else was going to catch a mistake in any of it, which is why each one is built to fail loudly rather than quietly. A tool that silently does the wrong thing costs more than no tool at all — so every one of them exits non-zero when it should, and says why.',
				]),
			}),
			Object.freeze({
				heading: 'Making them survive an enterprise',
				paragraphs: Object.freeze([
					'Getting a tool adopted inside a real company is a different problem from getting it downloaded.',
					'The rule I settled on is that none of them touch the network. Not for updates, not for telemetry, not for a convenient lookup. Your data stays on your machine because there is no path for it to leave.',
					'That sounds like a privacy stance. It’s really a procurement one. A tool that makes a request is a tool somebody has to review, approve, and then re-review the next time it changes. A tool that cannot make a request is a much shorter conversation, and inside a company that conversation is the entire difference between useful and installed.',
					'The same instinct shows up in the smaller decisions. paths-le resolves symlinks and canonicalizes paths rather than reporting whatever string it was handed — because a path that looks right but points somewhere else is exactly the silent-failure shape I keep describing, and in a monorepo behind a build system, it is routine rather than exotic.',
				]),
			}),
			Object.freeze({
				heading: 'Why they are becoming Rust',
				paragraphs: Object.freeze([
					'The extensions have a ceiling, and it isn’t performance.',
					'An editor extension needs a person. Someone has to be at the keyboard, in that specific editor, choosing from a menu. That’s the right shape for the work I originally built them for — I was the person at the keyboard, and the interactive version is genuinely better when a human is making the judgment call.',
					'It’s the wrong shape for everything else. A pipeline cannot open a quick-pick. CI cannot click. An agent cannot drive a menu — it runs a command and reads an exit code. Every one of those consumers needs the same capability with a different door, and the door is a binary.',
					'So the cores are being republished as Rust crates with command-line front ends: the same work, callable from CI, a Makefile, an agent, or anything that can run a process. Exit codes are the API. The editor stays because the interactive path is still the better one when an individual is making a decision.',
					'That means two codebases, alone, indefinitely. If installs flatten I will probably retire the editor versions inside a year or two, and I would rather say that now than discover it looks like abandonment later.',
					'That’s the honest arithmetic. I gained a consumer that isn’t a human, and I took on a second codebase to feed forever.',
					'Worth saying plainly: these aren’t meant to be the end of anything. They are enablers. Small tools that unblock the work in front of you and get out of the way — not a platform, not a framework, not something you’re supposed to adopt wholesale.',
				]),
			}),
			Object.freeze({
				heading: 'This is phase one',
				paragraphs: Object.freeze([
					'The ten manual tools are the first phase of something I have been building deliberately, and I would rather say that out loud than let it look like ten utilities that happened.',
					'The organizing axis is sourcing and auditing — getting data in from wherever it lives and checking it end-to-end afterward. Everything I have shipped so far serves the manual version of that: a person, at a keyboard, working a source over until it is usable.',
					'The Rust and MCP layers make the same capability available to machines, which turns a set of utilities into something a pipeline can be built on. After that come more capable modeling tools under the same name, on the same axis, usable by hand and callable by a system.',
					'I am stating the roadmap because it is a verifiable claim. It can be held against what actually ships.',
				]),
			}),
			Object.freeze({
				heading: 'Check it yourself',
				paragraphs: Object.freeze([
					'Everything above is inspectable. Ten repositories with their full commit history, CI you can watch run, releases with provenance you can verify, packages on four registries. The download figures come from the registries’ own APIs, not from me.',
					'I would rather you look than take my word for it. That preference is the reason all of this is built the way it is.',
				]),
			}),
		]),
		artifacts: Object.freeze([
			Object.freeze({ label: 'letools.dev', href: 'https://letools.dev' }),
			Object.freeze({
				label: 'Open VSX namespace',
				href: 'https://open-vsx.org/namespace/OffensiveEdge',
			}),
			Object.freeze({ label: 'GitHub', href: 'https://github.com/nolindnaidoo' }),
		]),
	}),
]);
