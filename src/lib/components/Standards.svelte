<script lang="ts">
import { standards, standardsNote } from '$content/standards';
import Band from './Band.svelte';
import Note from './Note.svelte';
</script>

<Note text={standardsNote} />

<Band>
	<ul>
		{#each standards as standard (standard.title)}
			<li>
				<!-- The aside leads: it names the test in three words, so a reader
				     scanning only the small type still collects the argument. -->
				<p class="aside">{standard.aside}</p>
				<strong>{standard.title}</strong>
				<span>{standard.detail}</span>
			</li>
		{/each}
	</ul>
</Band>

<style>
	/* Two columns as soon as each track can hold a readable measure — the
	   standards scan far faster as a grid than as a single stack. */
	ul {
		margin: clamp(30px, 4vw, 48px) 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
		column-gap: clamp(36px, 5vw, 80px);
	}

	li {
		display: grid;
		gap: 10px;
		align-content: start;
		padding: clamp(18px, 2.2vw, 28px) 0;
		border-bottom: 1px solid var(--hair);
	}

	.aside {
		margin: 0;
		font-family: var(--mono);
		font-size: 12.5px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}

	strong {
		font-size: clamp(18px, 2.3vw, 30px);
		line-height: 1.2;
		letter-spacing: -0.025em;
		font-weight: 660;
		text-wrap: balance;
	}

	span {
		font-size: 15.5px;
		line-height: 1.62;
		color: var(--muted);
	}
</style>
