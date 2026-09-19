import { useEffect, useState } from "react";

/** Live-updating match for a CSS media query string, e.g. "(max-width: 860px)". */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** The one breakpoint the whole site hangs off: matches the mockup's 860px split. */
export function useNarrow() {
  return useMediaQuery("(max-width: 860px)");
}
