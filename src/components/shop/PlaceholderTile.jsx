const TONES = ["var(--hh-ink-600)", "var(--hh-ink-700)", "var(--hh-ink-500)"];

/**
 * Labelled grey tile standing in for shop photography we don't have yet.
 * The mockup used these everywhere real photos were missing; only a
 * handful of real shots were supplied (see README), so most gallery/work
 * cells still need this until real photography is dropped in.
 */
export function PlaceholderTile({ label, toneIndex = 0, style }) {
  return (
    <div style={{ position: "relative", background: TONES[toneIndex % TONES.length], ...style }}>
      {label && (
        <span style={{ position: "absolute", top: 12, left: 14, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
          {label}
        </span>
      )}
    </div>
  );
}
