import { useState } from "react";

/** Pill filter/chip — selectable category tags, day pickers, etc. */
export function Tag({ selected = false, onClick, children, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const clickable = !!onClick;
  return (
    <span
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={clickable ? (e) => (e.key === "Enter" || e.key === " ") && onClick(e) : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 30,
        padding: "0 var(--space-3)",
        borderRadius: "var(--radius-control)",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--fs-100)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        cursor: clickable ? "pointer" : "default",
        background: selected ? "var(--action-primary-bg)" : hover && clickable ? "var(--action-ghost-bg-hover)" : "transparent",
        color: selected ? "var(--action-primary-fg)" : "var(--text-body)",
        boxShadow: selected ? "none" : "inset 0 0 0 1px var(--border-default)",
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
