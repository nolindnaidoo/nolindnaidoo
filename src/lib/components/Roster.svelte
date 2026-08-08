<script lang="ts">
import { roster, rosterNote } from '$content/roster';
import Note from './Note.svelte';
</script>

<Note text={rosterNote} />

<!--
	Deliberately not links (WCAG 2.4.4 — nine anchors, one destination), and
	deliberately names-only: the ledger below carries each engagement's role in
	its attribution line, so repeating roles here was the density the page
	didn't need. The strip exists so no engagement goes unnamed even when it
	has no ledger row.
-->
<p class="strip">
	{#each roster as entry, index (entry.organization)}
		<span class="org">{entry.organization}</span>
		{#if index < roster.length - 1}<span class="dot" aria-hidden="true">·</span>{/if}
	{/each}
</p>

<style>
	.strip {
		margin: clamp(18px, 2.4vw, 28px) 0 clamp(28px, 3.6vw, 44px);
		padding: 0 var(--pad);
		font-size: clamp(13.5px, 1.5vw, 15.5px);
		line-height: 2;
		color: var(--muted);
	}

	.org {
		white-space: nowrap;
		color: var(--ink);
	}

	.dot {
		margin: 0 10px;
		color: var(--rule);
	}
</style>
