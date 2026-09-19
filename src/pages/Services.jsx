import { useMemo, useState } from "react";
import { Tag } from "../components/ui/Tag.jsx";
import { ServiceRow } from "../components/shop/ServiceRow.jsx";
import { useBookingActions } from "../booking/BookingContext.jsx";
import { useNarrow } from "../lib/useMediaQuery.js";
import { useContent } from "../context/ContentContext.jsx";

export function Services() {
  const narrow = useNarrow();
  const { startBooking } = useBookingActions();
  const { services, categoryLabels } = useContent();
  const [cat, setCat] = useState("all");

  const cats = useMemo(() => [["all", "Everything"], ...Object.entries(categoryLabels)], [categoryLabels]);

  const groups = useMemo(() => {
    const list = services || [];
    const activeCats = cat === "all" ? [...new Set(list.map((s) => s.cat))] : [cat];
    return activeCats.map((c) => ({ label: categoryLabels[c] || c, items: list.filter((s) => s.cat === c) }));
  }, [cat, services, categoryLabels]);

  return (
    <main>
      <section className="hh-inverse" style={{ background: "#000", padding: `clamp(48px,8vw,96px) 0 clamp(40px,6vw,64px)` }}>
        <div className="hh-container">
          <h1 style={{ fontSize: narrow ? "clamp(40px,12vw,56px)" : "clamp(52px,10vw,120px)", color: "#fff" }}>The menu</h1>
        </div>
      </section>

      <section style={{ background: "var(--hh-bone-050)", padding: `clamp(40px,6vw,64px) 0 clamp(64px,10vw,128px)` }}>
        <div className="hh-container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 28, borderBottom: "1px solid var(--border-hairline)" }}>
            {cats.map(([id, label]) => (
              <Tag key={id} selected={cat === id} onClick={() => setCat(id)}>{label}</Tag>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            {groups.map((g) => (
              <div key={g.label} style={{ marginTop: 36, borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
                <h2 style={{ fontSize: "clamp(28px,5vw,40px)" }}>{g.label}</h2>
                <div style={{ marginTop: 12 }}>
                  {g.items.map((s) => (
                    <ServiceRow key={s.id || s.name} name={s.name} duration={s.duration} price={s.price} onSelect={() => startBooking(s.bookId)} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(24px,4vw,56px)" }}>
            <InfoBlock title="Walk-ins" body="Welcome when a chair is free. Friday and Saturday, book ahead." />
            <InfoBlock title="Students" body="Reduced prices on cuts, fades and tapers. Bring your card." />
            <InfoBlock title="Paying" body="Card and cash. Booking deposits are taken through Square." />
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, body }) {
  return (
    <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 16 }}>
      <h3>{title}</h3>
      <p style={{ marginTop: 10, fontSize: 15, color: "var(--text-body)" }}>{body}</p>
    </div>
  );
}
