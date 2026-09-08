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
	children: Snippet;
}>;

const { id, title, aside, children }: Props = $props();
</script>

<section aria-labelledby={id}>
	<div class="head">
		<h2 {id}>{title}</h2>
		{#if aside}<p class="aside">{aside}</p>{/if}
	</div>
	{@render children()}
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
