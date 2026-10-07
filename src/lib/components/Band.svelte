<script lang="ts">
import type { Snippet } from 'svelte';

/**
 * The page's horizontal measure. Every full-width section aligns to the same
 * `--pad` gutter, and this is the one place that rule is expressed — three
 * components previously carried their own copy of it.
 */
type Props = Readonly<{ children: Snippet }>;

const { children }: Props = $props();
</script>

<section>{@render children()}</section>

<style>
	section {
		padding-inline: var(--pad);
	}
</style>
