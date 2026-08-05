<script lang="ts">
import { projects } from '$content/projects';
import Band from './Band.svelte';
</script>

<Band>
	<div class="grid">
		{#each projects as project (project.name)}
			<article>
				<h3><a href={project.href}>{project.name}</a></h3>
				<p>{project.summary}</p>
				<p class="receipt">
					<!-- `tech` is its own field rather than the first element of a list:
					     which fact gets the accent is a content decision, and deriving it
					     from an array index would bury that decision in the markup. -->
					<span class="tech">{project.tech}</span>
					{#each project.facts as fact (fact)}
						<span>{fact}</span>
					{/each}
				</p>
			</article>
		{/each}
	</div>
</Band>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(270px, 100%), 1fr));
		gap: clamp(30px, 4vw, 60px);
		margin-top: clamp(32px, 4.5vw, 56px);
	}

	h3 {
		margin: 0 0 12px;
		font-size: clamp(23px, 3vw, 34px);
		letter-spacing: -0.03em;
		font-weight: 700;
	}

	h3 a {
		color: inherit;
		text-decoration: none;
		border-bottom: 2px solid var(--accent);
	}

	h3 a:hover {
		color: var(--accent);
	}

	p {
		margin: 0;
		font-size: 15px;
		line-height: 1.62;
		color: var(--muted);
	}

	.receipt {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 14px;
		margin-top: 16px;
		padding-top: 14px;
		border-top: 1px solid var(--hair);
		font-family: var(--mono);
		font-size: 12.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.tech {
		color: var(--accent);
	}
</style>
