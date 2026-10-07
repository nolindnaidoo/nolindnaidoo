<script lang="ts">
/**
 * The framing paragraph that sits between a section heading and its content.
 * Used by the roster and the standards; both previously carried an identical
 * private copy of these rules.
 */
type Props = Readonly<{ text: string }>;

const { text }: Props = $props();
</script>

<p>{text}</p>

<style>
	p {
		margin: 18px var(--pad) 0;
		max-width: 66ch;
		font-size: 15.5px;
		line-height: 1.65;
		color: var(--muted);
	}
</style>
