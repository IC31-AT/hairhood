/** Opening-hours definition list, today's row highlighted. */
export function HoursTable({ rows = [], today, style }) {
  return (
    <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "1fr auto", ...style }}>
      {rows.map((r) => {
        const isToday = r.day === today;
        return (
          <div key={r.day} style={{ display: "contents" }}>
            <dt style={{ padding: "var(--space-3) 0", borderBottom: "1px solid var(--border-hairline)", fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: isToday ? "var(--text-strong)" : "var(--text-muted)" }}>
              {r.day}
            </dt>
            <dd style={{ margin: 0, padding: "var(--space-3) 0", borderBottom: "1px solid var(--border-hairline)", textAlign: "right", fontFamily: "var(--font-ui)", fontSize: "var(--fs-100)", letterSpacing: "var(--ls-ui)", color: r.hours ? (isToday ? "var(--text-strong)" : "var(--text-body)") : "var(--text-subtle)" }}>
              {r.hours || "Closed"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
