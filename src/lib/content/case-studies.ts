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
	'That work is authentic and now inaccessible. While it is possible to verify that a bank launched a single-page application in 2014—an uncommon achievement at that time—there is no opportunity to review the underlying code, understand my decision-making process, or gain insight into the collaborative challenges that occurred during critical moments of the project. This limitation is a common experience among senior engineers. The more significant the environment, the less of the work can ever be publicly shared.',
	'I had wanted to write open source that entire time and never found anything reasonable enough to build. Not a shortage of ideas — a shortage of problems I actually had, repeatedly, and understood well enough to solve properly. Libraries written for problems you have merely read about come out looking right and being useless.',
	'Then I went and learned the machine-learning side properly, started building my own models, and discovered that most of the job isn’t modeling.',
	'It is data. Arriving from scraped pages and from APIs, in every format there is, none of them agreeing. Pieces of the same record living in different sources under different names, needing to be merged, labeled, and passed up through the pipeline in a form the next stage can trust. Every value point-in-time accurate — as it faithfully stood then, not as it reads now. The opposite side derived when only one side exists. A growing case space deciding whether a datum is usable at all.',
	'So many pieces have to pass through that chain, and each must be correct at all times, because one mistake anywhere degrades the model.',
	'And nothing tells you. That’s the part that reorganized how I build. If a future value leaks backward into training, the model doesn’t get worse — it gets better. Accuracy climbs. The backtest improves. Every number moves the way you were hoping. Nothing fails, nothing alerts, and everything built on top of that measurement is resting on nothing.',
	'That was the problem I had been waiting for, and everything since has been the same problem at a different layer.',
	'The most significant impact of this work was establishing a comprehensive technical infrastructure—spanning development, deployment, and maintenance—that enabled a single individual to run effective and reliable machine learning operations. I developed a suite of tools for complex data tasks and released them as open-source projects. These tools gained widespread adoption through word of mouth, despite my lack of an existing audience. Working independently, I handled all aspects of development: brand creation, documentation, website and backend development, API design, secure data transport, market data integration, and data modeling. I also architected and deployed sixteen production-grade machine learning models, unified within a fully automated end-to-end pipeline maintained by a single person. This deployment demonstrates the project’s technical achievement in both modeling depth and comprehensive management of the software and infrastructure stack.',
	'Then I hit the version of it that scared me. A prediction record is worthless if the person who published it can edit it afterward, and I couldn’t prove I hadn’t done so. Not because I would lie — because a schema migration doesn’t feel like lying, and from the outside those look identical. So I built a ledger that timestamps each day’s Bitcoin claims, which I can’t access.',
	'Six weeks in, a schema migration rewrote an anchor that was already published. I broke my own append-only rule. That day’s timestamp can never be made to bind again, and the record says so, permanently, because a rule that bends when it’s inconvenient for its author isn’t a rule.',
	'The tools are becoming Rust command-line binaries now, for the reason everything else here happened: a pipeline cannot click a menu, and the consumer that matters next isn’t a person.',
	'I have never written about any of this publicly. That was deliberate — I wanted the work standing on its own before I said anything about it. This is the long version.',
]);

export const caseStudies: readonly CaseStudy[] = Object.freeze([
	Object.freeze({
		slug: 'le-tools',
		title: 'The *-le suite',
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
					'That’s the shape of every serious failure in this kind of work. A mislabeled field merges cleanly. A silently truncated parse returns a number. The most critical scenario occurs when a source quietly changes its date format—for instance, transitioning from ‘YYYY-MM-DD’ to ‘MM/DD/YYYY’ without explicit notification. In this situation, the pipeline may still parse and populate records, but the assigned values now misrepresent reality.',
					'As a result, the dataset appears internally consistent and correct, even as it silently accumulates inaccuracies. The output remains plausible, which conceals the underlying problem. The error never generates an explicit failure or alert, and the detection mechanisms meant to guard against such issues are ineffective in this context.',
					'In summary, these subtle data integrity errors are easily overlooked as they seamlessly integrate into the workflow. However, unless discovered, they can undermine the reliability of the entire system.',
					'This is why my tools stop and tell you what they need, rather than guessing. A tool that answers confidently and wrongly is worse than one that refuses, because a refusal costs you ten minutes and a confident wrong answer costs you everything downstream of it.',
				]),
			}),
			Object.freeze({
				heading: 'Why I built them',
				paragraphs: Object.freeze([
					'I had wanted to write open-source software for years but never found anything worth building. Not a shortage of ideas — a shortage of problems I actually had, repeatedly, that I understood well enough to solve properly. Writing a library for a problem you have read about produces a library that looks right.',
					'The data work gave me the problem. Same operations, every day, across every format, between every pair of sources. The goal was blunt: mangle any data source, for any reason, with speed. Get a value out of whatever it is trapped in, see what is actually there, find the drift between two things that are supposed to agree.',
					'Ten tools is what it looks like from the outside. From the inside, it is one capability with ten entry points.',
				]),
			}),
			Object.freeze({
				heading: 'The shape of the suite is the shape of the job',
				paragraphs: Object.freeze([
					'I wasn’t only training models. I owned the whole stack alone — the brand, every document, the websites, the backend, the APIs, the data modeling, secure transport, the market data integration, and the parsing of disparate sources into feeds anything could consume. That ended at sixteen deployed models running in one pipeline, operated by one person.',
					'That span explains the suite better than any feature list. Six of the ten came out of the ingestion chain — checking whether a page could be scraped before writing the scraper, extracting strings, numbers, dates, paths, and URLs from formats that had no interest in cooperating. The other four came from everything surrounding it: keeping credentials out of commits, finding the missing key across environment files before a deploy, testing a regular expression before it went somewhere it could hang, and auditing color across a brand I also owned.',
					'Nobody else was going to catch a mistake in any of it. That’s why these tools are engineered with deliberate care rather than assembled hastily. When I work with a client, my priority is to create solutions that enable efficient, resilient collaboration, keeping stakeholders informed and adaptable as project goals evolve. By automating error prevention, I enable clients and myself to focus on substantive challenges, resulting in greater returns on their investment and stronger long-term outcomes.',
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
					'Maintaining both the editor extensions and Rust command-line tools means I must support two separate codebases on my own, and this additional workload may become unsustainable if installation growth slows. In that case, I may discontinue the editor versions within the next year or two. I have accepted this ongoing burden because offering both formats allows automated systems, not just individual users, to benefit from these tools. In short, I am choosing the extra maintenance to make the tools accessible to automation, not just to people at the keyboard, prioritizing long-term flexibility over immediate convenience.',
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
