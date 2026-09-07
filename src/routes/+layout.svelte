<script lang="ts">
import '../app.css';

const { children } = $props();
</script>

<a class="skip" href="#main">Skip to content</a>
{@render children()}

<style>
  /* Visible only on keyboard focus — first focusable element in the document. */
  .skip {
    position: absolute;
    left: var(--pad);
    top: -100%;
    z-index: 10;
    padding: 12px 18px;
    background: var(--accent);
    color: var(--paper);
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: top 140ms ease;
  }

  .skip:focus-visible {
    top: 12px;
  }
</style>
