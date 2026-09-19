import { useNarrow } from "../lib/useMediaQuery.js";
import { useBookingActions } from "../booking/BookingContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { BarberCard } from "../components/shop/BarberCard.jsx";
import { SectionHeading } from "../components/shop/SectionHeading.jsx";

export function Team() {
  const narrow = useNarrow();
  const { startBookingWithBarber } = useBookingActions();
  const { barbers: BARBERS, shop: SHOP } = useContent();

  return (
    <main>
      <section className="hh-inverse" style={{ background: "#000", padding: `clamp(48px,8vw,96px) 0 clamp(40px,6vw,64px)` }}>
        <div className="hh-container">
          <h1 style={{ fontSize: narrow ? "clamp(40px,12vw,56px)" : "clamp(52px,10vw,120px)", color: "#fff" }}>Meet the team</h1>
        </div>
      </section>

      <section style={{ background: "var(--surface-marble)", padding: `clamp(48px,7vw,80px) 0 clamp(64px,10vw,128px)` }}>
        <div className="hh-container">
          {narrow ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {BARBERS.map((b) => (
                <div key={b.id} style={{ display: "flex", gap: 14, borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
                  <div style={{ width: 88, height: 104, flexShrink: 0, overflow: "hidden", background: "var(--hh-ink-600)" }}>
                    {b.photo && <img src={b.photo} alt={b.name} className="hh-photo" style={{ objectPosition: "50% 20%" }} />}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: 16, letterSpacing: ".02em", textTransform: "uppercase" }}>{b.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{b.role}</div>
                      <p style={{ marginTop: 6, fontSize: 13, color: "var(--text-body)" }}>{b.note}</p>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <Button size="sm" onClick={() => startBookingWithBarber(b.id)}>Book Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
              {BARBERS.map((b) => (
                <BarberCard key={b.id} name={b.name} role={b.role} signature={b.signature} note={b.note} photo={b.photo} onBook={() => startBookingWithBarber(b.id)} />
              ))}
            </div>
          )}

          <div style={{ marginTop: "clamp(48px,7vw,80px)", borderTop: "2px solid var(--hh-black)", paddingTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
            <div>
              <SectionHeading eyebrow="Careers" title="Chair going spare" size="sm" lede="We take on barbers who can hold a standard and a conversation. Send your work and we'll get you in for a trade test." />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
              <Button onClick={() => (window.location.href = `mailto:${SHOP.email}?subject=Chair%20going%20spare`)}>Email your work</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
