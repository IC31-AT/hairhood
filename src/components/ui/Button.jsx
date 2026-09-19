import { useState } from "react";

const SIZES = {
  sm: { height: "var(--control-h-sm)", padding: "0 var(--space-4)", fontSize: "var(--fs-100)" },
  md: { height: "var(--control-h-md)", padding: "0 var(--space-6)", fontSize: "var(--fs-200)" },
  lg: { height: "var(--control-h-lg)", padding: "0 var(--space-8)", fontSize: "var(--fs-200)" },
};

/** Primary/secondary/ghost button — ported 1:1 from the design system's Button.jsx. */
export function Button({ variant = "primary", size = "md", full = false, disabled = false, iconLeft, iconRight, children, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const base = {
    ...SIZES[size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-ui)",
    letterSpacing: "var(--ls-ui)",
    textTransform: "uppercase",
    borderRadius: "var(--radius-control)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    background: "none",
    width: full ? "100%" : "auto",
    whiteSpace: "nowrap",
    transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
    transform: press && !disabled ? "scale(var(--press-scale))" : "none",
  };
  const skins = {
    primary: {
      background: disabled ? "var(--action-disabled-bg)" : press ? "var(--action-primary-bg-active)" : hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
      color: disabled ? "var(--action-disabled-fg)" : "var(--action-primary-fg)",
    },
    secondary: {
      background: hover && !disabled ? "var(--action-secondary-bg-hover)" : "transparent",
      color: disabled ? "var(--action-disabled-fg)" : hover ? "var(--action-secondary-fg-hover)" : "var(--action-secondary-fg)",
      boxShadow: "inset 0 0 0 var(--border-w) " + (disabled ? "var(--action-disabled-bg)" : "var(--action-secondary-border)"),
    },
    ghost: {
      background: hover && !disabled ? "var(--action-ghost-bg-hover)" : "transparent",
      color: disabled ? "var(--action-disabled-fg)" : "var(--action-ghost-fg)",
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ ...base, ...skins[variant], ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
