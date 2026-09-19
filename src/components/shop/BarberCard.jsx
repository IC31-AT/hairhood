import { useState } from "react";

/**
 * Barber photo card. `photo` is optional — most of the team don't have shop
 * photography yet, so it falls back to the same labelled placeholder tile
 * the mockup used everywhere ("send the shoot and it drops straight in").
 */
export function BarberCard({ name, role, signature, note, photo, photoLabel = "Photo placeholder", onBook, style }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "flex", flexDirection: "column", background: "var(--surface-card)", boxShadow: "inset 0 0 0 1px var(--border-hairline)", borderRadius: "var(--radius-card)", ...style }}
    >
      <div style={{ position: "relative", aspectRatio: "4 / 5", background: "var(--hh-ink-600)", overflow: "hidden" }}>
        {photo && <img src={photo} alt={`${name}, ${role || "barber"} at Hair Hood`} className="hh-photo" style={{ objectPosition: "50% 20%" }} />}
        <div style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)", opacity: hover ? 1 : 0.7, transition: "opacity var(--dur-base) var(--ease-standard)" }} />
        {!photo && <span style={{ position: "absolute", top: "var(--space-3)", left: "var(--space-3)", fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--hh-alpha-white-64)" }}>{photoLabel}</span>}
        {signature && <span style={{ position: "absolute", bottom: "var(--space-4)", left: "var(--space-4)", fontFamily: "var(--font-script)", fontSize: 44, lineHeight: 1, color: "var(--hh-white)" }}>{signature}</span>}
      </div>
      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-600)", lineHeight: "var(--lh-tight)", textTransform: "uppercase", color: "var(--text-strong)" }}>{name}</div>
        {role && <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{role}</div>}
        {note && <p style={{ margin: "var(--space-2) 0 0", fontSize: "var(--fs-200)", color: "var(--text-body)" }}>{note}</p>}
        {onBook && (
          <button
            onClick={onBook}
            style={{
              marginTop: "var(--space-4)",
              height: "var(--control-h-sm)",
              border: "none",
              background: hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
              color: "var(--action-primary-fg)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--fs-100)",
              letterSpacing: "var(--ls-label)",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "var(--transition-control)",
            }}
          >
            Book {name && name.split(" ")[0]}
          </button>
        )}
      </div>
    </div>
  );
}
