import type Lenis from "lenis";

// Lenis instance is exposed globally by useSmoothScroll so that any
// component can drive anchor navigation through the smooth-scroll engine.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
