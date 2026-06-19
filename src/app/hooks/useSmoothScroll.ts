import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/**
 * Drives buttery, momentum-based smooth scrolling with Lenis.
 * - Respects `prefers-reduced-motion` (falls back to native scrolling).
 * - Only runs while `enabled` (e.g. after the preloader finishes).
 * - Exposes the instance on `window.__lenis` for anchor navigation.
 */
export function useSmoothScroll(enabled: boolean) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [enabled, reduceMotion]);
}
