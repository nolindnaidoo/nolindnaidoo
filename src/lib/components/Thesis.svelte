<script lang="ts">
import { profile } from '$content/profile';

const { lead, emphasis, body } = profile.thesis;
</script>

<!-- Heading and body sit side by side above 1000px. Stacked, the display type
     ran to a 17ch measure and the prose to 58ch, which left roughly the right
     third of the band empty on every desktop viewport — the paragraphs are the
     thing that belongs in it, and the index link fills the column the heading
     leaves under itself. -->
<section class="thesis" aria-labelledby="thesis-heading">
  <div class="lead">
    <h2 id="thesis-heading">{lead} <em>{emphasis}</em>.</h2>
    <p class="long-version">
      <a href="/case-studies">The long version<span aria-hidden="true">&nbsp;→</span></a>
    </p>
  </div>

  <div class="body">
    {#each body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
  </div>
</section>

<style>
  .thesis {
    margin-top: clamp(80px, 12vw, 168px);
    padding-inline: var(--pad);
    display: grid;
    gap: clamp(26px, 4vw, 72px);
    align-items: start;
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

  .body p {
    margin: 0;
    /* A readable measure, not a layout device. Stacked it caps the full band;
       in the split whichever is narrower wins — the column below about 1600px,
       this cap above it. */
    max-width: 62ch;
    font-size: clamp(15px, 1.75vw, 19px);
    line-height: 1.62;
    color: var(--muted);
  }

  .body p + p {
    margin-top: clamp(16px, 1.7vw, 24px);
  }

  .long-version {
    margin: clamp(26px, 3vw, 40px) 0 0;
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
  @media (min-width: 1000px) {
    .thesis {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    }

    /* Wrapped to two lines on purpose: on one line the heading left a column
       of dead space beside three paragraphs of prose, and wrapping gives the
       display type the vertical presence the column already reserves.
       Measured in em, not ch — the ch advance in this face at display weight
       is about 1.08em, so a ch cap lands nowhere near the visual width and
       never binds. em tracks the clamp instead. */
    h2 {
      max-width: 6.4em;
    }
  }
</style>
