import { useEffect, useRef } from "react";

/**
 * Auto-advances a horizontally-scrolling rail every ~4.2s, looping back to
 * the start at the end. Stops permanently on the first user touch/scroll/
 * click, and never runs at all under prefers-reduced-motion.
 */
export function useAutoplayRail(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      const card = el.firstElementChild;
      const step = card ? card.getBoundingClientRect().width + 12 : 260;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, 4200);

    const stop = () => clearInterval(timer);
    el.addEventListener("pointerdown", stop, { once: true, passive: true });
    el.addEventListener("wheel", stop, { once: true, passive: true });

    return () => {
      clearInterval(timer);
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("wheel", stop);
    };
  }, [enabled]);

  return ref;
}
