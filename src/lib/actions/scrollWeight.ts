import type { Action } from 'svelte/action';

/** Weight and tracking at scroll 0, and at the end of the travel. */
type Range = Readonly<{
	weight: readonly [number, number];
	tracking: readonly [number, number];
}>;

const DEFAULTS: Range = Object.freeze({
	weight: Object.freeze([800, 410] as const),
	tracking: Object.freeze([-0.055, -0.017] as const),
});

/** Fraction of the viewport the effect travels over before it settles. */
const TRAVEL_RATIO = 0.85;

const NO_FRAME = 0;

function lerp(from: number, to: number, t: number): number {
	return from + (to - from) * t;
}

/**
 * Maps scroll position onto an element's weight and tracking, so the name opens
 * up as the reader leaves it. This is the page's only motion.
 *
 * A Svelte action never runs during SSR, so there is no `window` guard to
 * forget — the client-only guarantee is structural rather than defensive.
 *
 * Reduced motion is honoured by never subscribing and by clearing the inline
 * styles, which leaves the element at its CSS-declared resting state. The
 * preference is re-read on change rather than latched at mount: a reader who
 * turns it on mid-session gets the setting they just chose.
 */
export const scrollWeight: Action<HTMLElement, Range | undefined> = (node, range) => {
	const { weight, tracking } = range ?? DEFAULTS;
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

	let frame = NO_FRAME;

	function paint(): void {
		frame = NO_FRAME;
		const travel = Math.max(1, window.innerHeight * TRAVEL_RATIO);
		const progress = Math.min(1, window.scrollY / travel);
		node.style.fontWeight = String(Math.round(lerp(weight[0], weight[1], progress)));
		node.style.letterSpacing = `${lerp(tracking[0], tracking[1], progress).toFixed(4)}em`;
	}

	function onScroll(): void {
		if (frame !== NO_FRAME) return;
		frame = requestAnimationFrame(paint);
	}

	function stop(): void {
		window.removeEventListener('scroll', onScroll);
		if (frame !== NO_FRAME) cancelAnimationFrame(frame);
		frame = NO_FRAME;
		node.style.removeProperty('font-weight');
		node.style.removeProperty('letter-spacing');
	}

	function start(): void {
		if (reduced.matches) return;
		window.addEventListener('scroll', onScroll, { passive: true });
		paint();
	}

	function restart(): void {
		stop();
		start();
	}

	start();
	reduced.addEventListener('change', restart);

	return Object.freeze({
		destroy(): void {
			stop();
			reduced.removeEventListener('change', restart);
		},
	});
};
