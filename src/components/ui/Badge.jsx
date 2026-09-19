const TONES = {
  open: "var(--status-open)",
  closing: "var(--status-closing)",
  closed: "var(--status-closed)",
  neutral: "var(--hh-ink-300)",
};

/** Small status pill with a coloured dot — used for "Open now" / "Closed". */
export function Badge({ tone = "neutral", dot = true, children, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        background: "var(--action-primary-bg)",
        color: "var(--action-primary-fg)",
        borderRadius: "var(--radius-card)",
        padding: "6px var(--space-3)",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        ...style,
      }}
      {...rest}
    >
      {dot && <i style={{ width: 5, height: 5, background: TONES[tone], flex: "0 0 auto" }} />}
      {children}
    </span>
  );
}
