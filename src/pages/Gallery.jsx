import { useNarrow } from "../lib/useMediaQuery.js";
import { PlaceholderTile } from "../components/shop/PlaceholderTile.jsx";
import { useContent } from "../context/ContentContext.jsx";

export function Gallery() {
  const narrow = useNarrow();
  const { shop: SHOP, reviews: REVIEWS } = useContent();
  return (
    <main>
      <section className="hh-inverse" style={{ background: "#000", padding: `clamp(48px,8vw,96px) 0 clamp(40px,6vw,64px)` }}>
        <div className="hh-container">
          {!narrow && <span className="hh-eyebrow" style={{ color: "var(--hh-ink-300)" }}>The work</span>}
          <h1 style={{ marginTop: narrow ? 0 : 16, fontSize: narrow ? "clamp(40px,12vw,56px)" : "clamp(52px,10vw,120px)", color: "#fff" }}>
            Fresh out<br />the chair
          </h1>
          <div className="hh-motto" style={{ fontSize: narrow ? "clamp(26px,7vw,32px)" : "clamp(26px,4vw,44px)", color: "#fff", marginTop: 10 }}>straight from the chair</div>
          <div style={{ marginTop: 12 }}>
            <a href={SHOP.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-ink-300)" }}>
              {SHOP.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      <section style={{ background: "#000", padding: `0 0 clamp(64px,10vw,128px)` }}>
        <div className="hh-container">
          {narrow ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 2 }}>
              <div style={{ aspectRatio: "1/1", overflow: "hidden" }}><img src="/images/art-wall.jpg" alt="The art wall behind the bar" className="hh-photo" style={{ filter: "grayscale(1)" }} /></div>
              {["Skin fade", "Beard work", "Taper", "Hot towel", "The bar", "Scissor cut", "Kids cut", "Studded antlers"].map((label, i) => (
                <PlaceholderTile key={label} label={label} toneIndex={i} style={{ aspectRatio: "1/1" }} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gridAutoRows: "minmax(160px,auto)", gap: 2 }}>
              <div style={{ gridColumn: "span 2", gridRow: "span 2", overflow: "hidden", background: "var(--hh-ink-600)" }}>
                <img src="/images/art-wall.jpg" alt="The art wall behind the bar" className="hh-photo" />
              </div>
              <PlaceholderTile label="Skin fade" toneIndex={1} style={{ minHeight: 160 }} />
              <PlaceholderTile label="Beard, cutthroat" toneIndex={2} style={{ minHeight: 160 }} />
              <PlaceholderTile label="The bar at the back" toneIndex={0} style={{ gridColumn: "span 2", minHeight: 160 }} />
              <PlaceholderTile label="Taper" toneIndex={1} style={{ minHeight: 160 }} />
              <PlaceholderTile label="Scissor cut" toneIndex={2} style={{ gridRow: "span 2", minHeight: 322 }} />
              <PlaceholderTile label="Hot towel" toneIndex={0} style={{ minHeight: 160 }} />
              <div style={{ position: "relative", gridColumn: "span 2", background: "var(--hh-ink-600)", minHeight: 160 }}>
                <span style={{ position: "absolute", top: 12, left: 14, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>The art wall — studded antlers</span>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
                  <i style={{ background: "var(--hh-jewel-ruby)" }} />
                  <i style={{ background: "var(--hh-jewel-silver)" }} />
                  <i style={{ background: "var(--hh-jewel-sapphire)" }} />
                </div>
              </div>
              <PlaceholderTile label="Kids cut" toneIndex={2} style={{ minHeight: 160 }} />
            </div>
          )}
          <p style={{ marginTop: 24, fontSize: 13, color: "var(--hh-ink-300)" }}>Grey tiles are placeholders — send us the shoot and they drop straight in.</p>
        </div>
      </section>

      <section style={{ background: "var(--hh-bone-050)", padding: narrow ? "36px 20px 44px" : "clamp(64px,10vw,128px) 0" }}>
        <div className={narrow ? undefined : "hh-container"}>
          <h2 style={{ fontSize: "clamp(30px,9vw,38px)" }}>From the chair</h2>
          <div
            style={{
              marginTop: 20,
              display: narrow ? "flex" : "grid",
              flexDirection: narrow ? "column" : undefined,
              gap: narrow ? 20 : "clamp(24px,4vw,56px)",
              gridTemplateColumns: narrow ? undefined : "repeat(auto-fit,minmax(260px,1fr))",
            }}
          >
            {REVIEWS.map((r) =>
              narrow ? (
                <div key={r.who} style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "var(--hh-black)" }}>{r.quote}</p>
                  <div style={{ marginTop: 10, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-muted)" }}>{r.who}</div>
                </div>
              ) : (
                <div key={r.who} style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 18 }}>
                  <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.02, textTransform: "uppercase", color: "var(--hh-black)" }}>{r.quote}</p>
                  <div style={{ marginTop: 16, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-muted)" }}>{r.who}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
