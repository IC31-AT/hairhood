import { useId, useState } from "react";

/** Labelled text input with hint/error text — matches the design system's Input.jsx. */
export function Input({ label, hint, error, prefix, id, className, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--text-strong)" }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          height: "var(--control-h-md)",
          padding: "0 var(--space-4)",
          background: "var(--surface-card)",
          borderRadius: "var(--radius-control)",
          boxShadow: "inset 0 0 0 " + (error || focus ? "var(--border-w)" : "1px") + " " + (error ? "var(--hh-danger-500)" : focus ? "var(--border-strong)" : "var(--border-default)"),
          outline: focus ? "2px solid var(--focus-ring)" : "none",
          outlineOffset: 2,
          transition: "var(--transition-control)",
        }}
      >
        {prefix && <span style={{ fontSize: "var(--fs-300)", color: "var(--text-muted)" }}>{prefix}</span>}
        <input
          id={inputId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "var(--fs-300)", color: "var(--text-strong)", minWidth: 0 }}
          {...rest}
        />
      </div>
      {(error || hint) && <span style={{ fontSize: "var(--fs-100)", color: error ? "var(--hh-danger-500)" : "var(--text-muted)" }}>{error || hint}</span>}
    </div>
  );
}
