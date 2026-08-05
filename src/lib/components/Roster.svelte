<script lang="ts">
import { roster, rosterNote } from '$content/roster';
import Note from './Note.svelte';
</script>

<Note text={rosterNote} />

<!--
	Deliberately not links. Nine anchors all pointing at the same LinkedIn URL
	fails link purpose (WCAG 2.4.4) and makes a screen reader announce nine
	destinations that are one destination. The roster is a record, not
	navigation; the single LinkedIn link lives in the contact block.
-->
<ul>
	{#each roster as entry (entry.organization)}
		<li>
			<span class="org">{entry.organization}</span>
			<span class="role">{entry.role}</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: clamp(24px, 3vw, 36px) 0 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px 18px;
		padding: clamp(13px, 1.9vw, 24px) var(--pad);
		border-bottom: 1px solid var(--hair);
	}

	.org {
		font-size: clamp(21px, 4.2vw, 56px);
		line-height: 1;
		letter-spacing: -0.035em;
		font-weight: 620;
	}

	.role {
		font-family: var(--mono);
		font-size: 12.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--muted);
	}
</style>
