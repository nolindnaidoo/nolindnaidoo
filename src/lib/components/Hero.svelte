<script lang="ts">
import { profile } from '$content/profile';
import { scrollWeight } from '$lib/actions/scrollWeight';
</script>

<header class="hero">
  <p class="eyebrow">{profile.eyebrow}</p>
  <!--
    Each word is a block for the stacked layout, but the trailing space stays
    inside the markup so the accessible name and the crawled text both read
    "Nolin Naidoo" rather than "NolinNaidoo".
  -->
  <h1 use:scrollWeight><span>{profile.nameParts[0]} </span><span>{profile.nameParts[1]}</span></h1>
  <p class="handle">{profile.tagline}</p>
  <div class="meta">
    {#each profile.meta as item (item)}
      <span>{item}</span>
    {/each}
  </div>
</header>

<style>
  .hero {
    padding: clamp(44px, 8vw, 104px) var(--pad) 0;
  }

  .eyebrow {
    margin: 0 0 clamp(22px, 3.5vw, 40px);
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
  }

  h1 {
    margin: 0;
    font-size: clamp(50px, 15.4vw, 226px);
    line-height: 0.82;
    letter-spacing: -0.055em;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 span {
    display: block;
  }

  .handle {
    margin: clamp(18px, 2.4vw, 28px) 0 0;
    font-family: var(--mono);
    font-size: clamp(13px, 1.6vw, 17px);
    letter-spacing: 0.04em;
    color: var(--accent);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px 40px;
    margin-top: clamp(20px, 3vw, 34px);
    padding-top: 18px;
    border-top: 3px solid var(--accent);
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--muted);
  }
</style>
