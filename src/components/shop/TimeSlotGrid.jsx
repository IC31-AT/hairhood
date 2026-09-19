/** Grid of bookable time buttons; taken slots are shown struck-through and disabled. */
export function TimeSlotGrid({ slots = [], value, onChange, columns = 6, style }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`, gap: "var(--space-2)", ...style }}>
      {slots.map((s) => {
        const selected = s.time === value;
        const disabled = s.taken;
        return (
          <button
            key={s.time}
            disabled={disabled}
            onClick={() => onChange && onChange(s.time)}
            style={{
              height: "var(--control-h-md)",
              border: "none",
              borderRadius: "var(--radius-control)",
              cursor: disabled ? "not-allowed" : "pointer",
              background: disabled ? "transparent" : selected ? "var(--action-primary-bg)" : "var(--surface-card)",
              color: disabled ? "var(--text-subtle)" : selected ? "var(--action-primary-fg)" : "var(--text-strong)",
              boxShadow: "inset 0 0 0 1px " + (disabled ? "var(--border-hairline)" : selected ? "var(--action-primary-bg)" : "var(--border-default)"),
              fontFamily: "var(--font-ui)",
              fontSize: "var(--fs-100)",
              letterSpacing: "var(--ls-ui)",
              textDecoration: disabled ? "line-through" : "none",
              transition: "var(--transition-control)",
            }}
          >
            {s.time}
          </button>
        );
      })}
    </div>
  );
}
