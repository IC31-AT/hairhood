/** Eyebrow + display title + optional script motto + lede paragraph. */
export function SectionHeading({ eyebrow, title, motto, lede, align = "left", size = "md", action, style }) {
  const sizes = { sm: "var(--fs-600)", md: "var(--fs-700)", lg: "var(--fs-800)" };
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)", textAlign: align, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", alignItems: align === "center" ? "center" : "flex-start", margin: align === "center" ? "0 auto" : 0 }}>
        {eyebrow && <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>{eyebrow}</span>}
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: sizes[size], lineHeight: "var(--lh-tight)", letterSpacing: "var(--ls-display)", textTransform: "uppercase", color: "var(--text-strong)" }}>{title}</h2>
        {motto && <span style={{ fontFamily: "var(--font-script)", fontSize: "var(--fs-600)", lineHeight: 1.1, color: "var(--text-muted)", marginTop: "var(--space-1)" }}>{motto}</span>}
        {lede && <p style={{ margin: "var(--space-2) 0 0", maxWidth: "var(--measure-prose)", fontSize: "var(--fs-300)", lineHeight: "var(--lh-normal)", color: "var(--text-body)" }}>{lede}</p>}
      </div>
      {action}
    </div>
  );
}
