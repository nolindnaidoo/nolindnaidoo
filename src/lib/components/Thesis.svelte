<script lang="ts">
import { profile } from '$content/profile';

const { lead, emphasis, body } = profile.thesis;
</script>

<section class="thesis" aria-labelledby="thesis-heading">
  <h2 id="thesis-heading">{lead} <em>{emphasis}</em>.</h2>
  <p>{body}</p>
  <!-- The way into the long form. It sits with the thesis rather than in one
       of the work sections because the index is the connective narrative
       across all of them, not the depth behind any single one. -->
  <p class="long-version">
    <a href="/case-studies">The long version<span aria-hidden="true">&nbsp;→</span></a>
  </p>
</section>

<style>
  .thesis {
    margin-top: clamp(80px, 12vw, 168px);
    padding-inline: var(--pad);
  }

  h2 {
    margin: 0;
    font-size: clamp(30px, 6.4vw, 92px);
    line-height: 1.02;
    letter-spacing: -0.042em;
    font-weight: 750;
    max-width: 17ch;
    text-wrap: balance;
  }

  em {
    font-style: normal;
    color: var(--accent);
  }

  p {
    margin: clamp(24px, 3vw, 36px) 0 0;
    max-width: 58ch;
    font-size: clamp(15px, 1.75vw, 19px);
    line-height: 1.62;
    color: var(--muted);
  }
  .long-version {
    margin: clamp(28px, 4vw, 40px) 0 0;
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.01em;
  }

  .long-version a {
    color: var(--ink);
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }

  .long-version a:hover,
  .long-version a:focus-visible {
    color: var(--accent, var(--ink));
  }
</style>
