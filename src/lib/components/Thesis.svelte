<script lang="ts">
import { caseStudies } from '$content/case-studies';
import { profile } from '$content/profile';

const { lead, emphasis, body } = profile.thesis;
</script>

<!-- The statement and the work it introduces are one section, not two. The
     claim is only worth making here because the three pieces under it are the
     evidence, and separating them turned the claim into an assertion the reader
     had to take on faith and the links into a menu with no reason attached. -->
<section class="thesis" aria-labelledby="thesis-heading">
  <div class="statement">
    <h2 id="thesis-heading">{lead} <em>{emphasis}</em>.</h2>
    <p>{body}</p>
  </div>

  <ul class="studies">
    {#each caseStudies as study (study.slug)}
      <li>
        <a href="/case-studies/{study.slug}">
          <h3>{study.title}<span class="arrow" aria-hidden="true">&nbsp;→</span></h3>
          <p>{study.annotation}</p>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .thesis {
    margin-top: clamp(80px, 12vw, 168px);
  }

  .statement {
    display: grid;
    gap: clamp(26px, 4vw, 72px);
    align-items: start;
    padding-inline: var(--pad);
    margin-bottom: clamp(44px, 6vw, 88px);
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

  .statement p {
    margin: 0;
    max-width: 62ch;
    font-size: clamp(15px, 1.75vw, 19px);
    line-height: 1.62;
    color: var(--muted);
  }

  .studies {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 2px solid var(--ink);
  }

  li {
    border-bottom: 1px solid var(--hair);
  }

  li:last-child {
    border-bottom: none;
  }

  /* The whole row is the target. A 52px headline with a separate small link
     beside it gives the pointer two places to aim and the keyboard two stops
     for one destination. */
  .studies a {
    display: block;
    padding: clamp(22px, 3vw, 40px) var(--pad);
    color: inherit;
    text-decoration: none;
    transition: background 180ms ease;
  }

  .studies a:hover {
    background: var(--wash);
  }

  h3 {
    margin: 0;
    max-width: 22ch;
    font-size: clamp(23px, 3.6vw, 46px);
    line-height: 1.05;
    letter-spacing: -0.034em;
    font-weight: 700;
    text-wrap: balance;
  }

  /* Slides rather than appears: the row is already a link, so the arrow
     confirms direction, it does not announce that one exists. */
  .arrow {
    display: inline-block;
    color: var(--accent);
    transition: transform 180ms ease;
  }

  .studies a:hover .arrow {
    transform: translateX(5px);
  }

  .studies p {
    margin: clamp(12px, 1.4vw, 18px) 0 0;
    max-width: 62ch;
    font-size: clamp(14.5px, 1.5vw, 17px);
    line-height: 1.6;
    color: var(--muted);
  }

  /* Statement and rows both split above 1000px, on the same column ratio, so
     the heading, the paragraph and every annotation share two vertical edges
     down the whole section. Stacked below that. */
  @media (min-width: 1000px) {
    .statement,
    .studies a {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: clamp(28px, 4vw, 64px);
    }

    .studies a {
      display: grid;
      align-items: start;
    }

    h2 {
      max-width: 6.4em;
    }

    h3,
    .studies p {
      max-width: none;
    }

    .studies p {
      margin-top: 0;
    }
  }
</style>
