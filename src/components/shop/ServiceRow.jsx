import { useState } from "react";

/** One row in a price list: name + optional description, duration, price. Selectable. */
export function ServiceRow({ name, description, duration, price, selected = false, onSelect, style }) {
  const [hover, setHover] = useState(false);
  const clickable = !!onSelect;
  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={clickable ? (e) => (e.key === "Enter" || e.key === " ") && onSelect(e) : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "var(--space-4)",
        padding: "var(--space-4) var(--space-4)",
        margin: "0 calc(var(--space-4) * -1)",
        borderBottom: "1px solid var(--border-hairline)",
        cursor: clickable ? "pointer" : "default",
        background: selected ? "var(--action-primary-bg)" : hover && clickable ? "var(--action-ghost-bg-hover)" : "transparent",
        color: selected ? "var(--action-primary-fg)" : "inherit",
        transition: "var(--transition-control)",
        ...style,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-300)", letterSpacing: "var(--ls-ui)", textTransform: "uppercase", color: selected ? "var(--action-primary-fg)" : "var(--text-strong)" }}>{name}</div>
        {description && <div style={{ marginTop: 4, fontSize: "var(--fs-200)", color: selected ? "var(--action-primary-fg)" : "var(--text-muted)", opacity: selected ? 0.7 : 1 }}>{description}</div>}
      </div>
      {duration && (
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: selected ? "var(--action-primary-fg)" : "var(--text-muted)", opacity: selected ? 0.7 : 1, whiteSpace: "nowrap" }}>
          {duration}
        </div>
      )}
      <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-500)", letterSpacing: "var(--ls-ui)", lineHeight: 1, color: selected ? "var(--action-primary-fg)" : "var(--text-strong)", whiteSpace: "nowrap" }}>{price}</div>
    </div>
  );
}
