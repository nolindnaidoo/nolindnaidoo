<script lang="ts">
import type { Snippet } from 'svelte';

/**
 * A labelled region plus its ruled heading.
 *
 * The heading and the content it introduces are wrapped together in a
 * `<section aria-labelledby>` rather than left as siblings. An unnamed
 * `<section>` is not exposed as a region at all, so without this a screen
 * reader user navigating by landmark finds one `main` and nothing inside it —
 * the visual structure would exist only for sighted readers.
 */
type Props = Readonly<{
	id: string;
	title: string;
	aside?: string;
	/**
	 * The case study this section is the synopsis of. The home page compresses
	 * each body of work into a few screens; where the long version exists, the
	 * way down to it belongs at the end of the summary rather than buried on an
	 * index the reader has no reason to visit.
	 */
	study?: Readonly<{ slug: string; label: string }>;
	children: Snippet;
}>;

const { id, title, aside, study, children }: Props = $props();
</script>

<section aria-labelledby={id}>
	<div class="head">
		<h2 {id}>{title}</h2>
		{#if aside}<p class="aside">{aside}</p>{/if}
	</div>
	{@render children()}
	{#if study}
		<p class="more">
			<a href="/case-studies/{study.slug}">{study.label} <span aria-hidden="true">→</span></a>
		</p>
	{/if}
</section>

<style>
	.head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 10px 24px;
		margin: clamp(84px, 12vw, 168px) var(--pad) 0;
		padding-bottom: 14px;
		border-bottom: 2px solid var(--ink);
	}

	/* Sits with the section it closes: the top margin is the reading gap after
	   the content, and the next section's own head margin does the separating.
	   Same treatment as the index link in the thesis — one affordance, one look. */
	.more {
		margin: clamp(28px, 4vw, 40px) var(--pad) 0;
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.01em;
	}

	.more a {
		color: var(--ink);
		text-decoration-thickness: 1px;
		text-underline-offset: 4px;
	}

	.more a:hover,
	.more a:focus-visible {
		color: var(--accent, var(--ink));
	}

	h2,
	.aside {
		margin: 0;
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted);
	}
</style>
