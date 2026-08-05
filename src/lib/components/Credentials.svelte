<script lang="ts">
import { credentials, stack } from '$content/credentials';
import Band from './Band.svelte';
</script>

<Band>
	<ul class="creds">
		{#each credentials as credential (credential.title)}
			<li>
				<strong>{credential.title}</strong>
				<span>{credential.issuer}</span>
				<em>{credential.detail}</em>
			</li>
		{/each}
	</ul>

	<ul class="stack">
		{#each stack as item (item)}
			<li>{item}</li>
		{/each}
	</ul>
</Band>

<style>
	.creds {
		margin: clamp(30px, 4vw, 44px) 0 0;
		padding: 0;
		list-style: none;
	}

	.creds li {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		gap: 6px 28px;
		padding: clamp(15px, 1.8vw, 22px) 0;
		border-bottom: 1px solid var(--hair);
	}

	strong {
		font-size: clamp(16px, 1.9vw, 21px);
		font-weight: 620;
		letter-spacing: -0.02em;
	}

	.creds span {
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}

	em {
		grid-column: 1 / -1;
		font-style: normal;
		font-size: 15.5px;
		line-height: 1.6;
		color: var(--muted);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: clamp(30px, 4vw, 44px) 0 0;
		padding: 0;
		list-style: none;
	}

	.stack li {
		padding: 7px 13px;
		border: 1px solid var(--rule);
		font-family: var(--mono);
		font-size: 13.5px;
		letter-spacing: 0.03em;
		color: var(--muted);
	}
</style>
