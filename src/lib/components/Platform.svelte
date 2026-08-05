<script lang="ts">
import { platform } from '$content/platform';
</script>

<section class="platform">
  <p class="lede">{platform.lede}</p>
  <p class="body">{platform.body}</p>

  <div class="systems">
    {#each platform.systems as system (system.name)}
      <article class="system">
        <h3><span class="tag">{system.kind}</span>{system.name}</h3>
        <p>{system.summary}</p>
      </article>
    {/each}
  </div>

  <dl class="caps">
    {#each platform.capabilities as capability (capability.label)}
      <div class="cap">
        <dt>{capability.label}</dt>
        <dd>{capability.detail}</dd>
      </div>
    {/each}
  </dl>
</section>

<style>
  .platform {
    padding: clamp(34px, 5vw, 60px) var(--pad) 0;
  }

  .lede {
    margin: 0;
    max-width: 30ch;
    font-size: clamp(26px, 4.6vw, 58px);
    line-height: 1.05;
    letter-spacing: -0.038em;
    font-weight: 700;
    text-wrap: balance;
  }

  .body {
    margin: clamp(22px, 3vw, 32px) 0 0;
    max-width: 62ch;
    font-size: clamp(15px, 1.6vw, 17.5px);
    line-height: 1.66;
    color: var(--muted);
  }

  /* Hairline grid drawn with gap over a ruled background — one border, no
     double-border seams between cards. */
  .systems {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(230px, 100%), 1fr));
    gap: 1px;
    margin-top: clamp(40px, 5vw, 64px);
    background: var(--rule);
    border: 1px solid var(--rule);
  }

  .system {
    background: var(--paper);
    padding: clamp(22px, 2.6vw, 30px);
  }

  .system h3 {
    margin: 0 0 10px;
    font-size: clamp(19px, 2.1vw, 24px);
    letter-spacing: -0.025em;
    font-weight: 700;
  }

  .system p {
    margin: 0;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--muted);
  }

  .tag {
    display: block;
    margin-bottom: 14px;
    font-family: var(--mono);
    font-size: 12.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 400;
    color: var(--accent);
  }

  .caps {
    margin: clamp(34px, 4vw, 48px) 0 0;
  }

  .cap {
    display: grid;
    grid-template-columns: minmax(0, 15ch) 1fr;
    gap: 6px 28px;
    padding: clamp(15px, 1.8vw, 22px) 0;
    border-bottom: 1px solid var(--hair);
  }

  dt {
    font-family: var(--mono);
    font-size: 12.5px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--ink);
  }

  dd {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--muted);
  }
</style>
