// Page motion: hero entrance, scroll reveals and the loop diagram.
// Everything is opt-in through data attributes and skipped entirely when the
// visitor prefers reduced motion (content then simply shows in its final state).
//
//   data-hero-item      fades up 16px on load, 60ms apart
//   data-reveal         fades up 24px when it enters the viewport
//   data-reveal-stagger its children fade up 24px, 80ms apart
//   data-loop           Knight Training loop diagram (circles pop, then arrows draw)

const REVEAL_SELECTOR = "[data-reveal], [data-reveal-stagger], [data-loop]";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Enables the motion CSS. Call once at startup.
export function initMotion() {
  if (!prefersReducedMotion()) {
    document.documentElement.classList.add("motion-ready");
  }
}

// Wires up the current page. Returns a cleanup function.
export function setupPageMotion(root = document) {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add("is-revealed"));
    return () => {};
  }

  root.querySelectorAll("[data-hero-item]").forEach((el, index) => {
    el.style.setProperty("--i", index);
  });

  root.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      child.style.setProperty("--i", index);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          // Play once: never re-trigger on scroll up.
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (!el.classList.contains("is-revealed")) observer.observe(el);
  });

  return () => observer.disconnect();
}
