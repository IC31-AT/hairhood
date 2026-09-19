import { useEffect, useRef } from "react";

/**
 * Fades a section up into place the first time it scrolls into view.
 * Mirrors the [data-reveal] IntersectionObserver behaviour from the mockup.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("hh-revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("hh-revealed");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
