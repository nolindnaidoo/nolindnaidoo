<script lang="ts">
import { contact } from '$content/profile';
</script>

<footer class="close" id="contact">
  <!-- Availability precedes the CTA: the reader learns the state ("reachable,
       scoped") before being asked to act on it. One line, no green dot — the
       claim is the availability, stated like everything else on the page. -->
  <p class="availability">{contact.availability}</p>
  <!-- The arrows are decoration and stay out of the accessibility tree: a
       screen reader announcing "north east arrow" after every link is noise
       that carries none of the meaning the glyph carries visually. -->
  <a class="cta" href={contact.primary.href}
    >{contact.primary.label}<span aria-hidden="true">&nbsp;→</span></a
  >
  <ul>
    {#each contact.links as link (link.href)}
      <li>
        <a href={link.href}>{link.label}<span aria-hidden="true">&nbsp;↗</span></a>
      </li>
    {/each}
  </ul>
</footer>

<style>
  .close {
    margin: clamp(84px, 12vw, 160px) var(--pad) clamp(56px, 8vw, 96px);
    padding-top: 34px;
    border-top: 3px solid var(--accent);
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px 40px;
  }

  .availability {
    flex-basis: 100%;
    margin: 0;
    font-family: var(--mono);
    font-size: clamp(13.5px, 1.4vw, 15px);
    letter-spacing: 0.02em;
    color: var(--muted);
  }

  .cta {
    font-size: clamp(28px, 5.4vw, 68px);
    letter-spacing: -0.042em;
    font-weight: 760;
    color: inherit;
    text-decoration: none;
  }

  .cta:hover {
    color: var(--accent);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* Inline text links at 13px would be under the 44px target minimum, so each
     row gets real vertical padding rather than relying on line-height. */
  ul a {
    display: inline-block;
    padding: 11px 0;
    color: inherit;
    text-underline-offset: 3px;
  }

  ul a:hover {
    color: var(--accent);
  }
</style>
