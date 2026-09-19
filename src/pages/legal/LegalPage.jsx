import { useNarrow } from "../../lib/useMediaQuery.js";

/** Shared layout for the three static legal pages (Privacy, Cookies, Terms). */
export function LegalPage({ title, sections }) {
  const narrow = useNarrow();
  return (
    <main>
      <section className="hh-inverse" style={{ background: "#000", padding: `clamp(48px,8vw,96px) 0 clamp(40px,6vw,64px)` }}>
        <div className="hh-container">
          <h1 style={{ fontSize: narrow ? "clamp(40px,12vw,56px)" : "clamp(52px,10vw,120px)", color: "#fff" }}>{title}</h1>
        </div>
      </section>
      <section style={{ background: "var(--hh-bone-050)", padding: "clamp(40px,6vw,64px) 0 clamp(64px,10vw,112px)" }}>
        <div className="hh-container-narrow">
          {sections.map((s) => (
            <div key={s.heading} style={{ marginTop: 24, borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-black)" }}>{s.heading}</div>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, color: "var(--text-body)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
