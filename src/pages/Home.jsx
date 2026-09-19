import { Link, useNavigate } from "react-router-dom";
import { useNarrow } from "../lib/useMediaQuery.js";
import { useAutoplayRail } from "../lib/useAutoplayRail.js";
import { useReveal } from "../lib/useReveal.js";
import { useBookingActions } from "../booking/BookingContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { SectionHeading } from "../components/shop/SectionHeading.jsx";
import { ServiceRow } from "../components/shop/ServiceRow.jsx";
import { BarberCard } from "../components/shop/BarberCard.jsx";
import { HoursTable } from "../components/shop/HoursTable.jsx";
import { PlaceholderTile } from "../components/shop/PlaceholderTile.jsx";

export function Home() {
  const narrow = useNarrow();
  return (
    <main>
      <Hero narrow={narrow} />
      {narrow ? <HomeMobile /> : <HomeDesktop />}
    </main>
  );
}

function Hero({ narrow }) {
  const { startBooking } = useBookingActions();
  const { shop } = useContent();
  const navigate = useNavigate();
  return (
    <section
      className="hh-inverse"
      style={{ position: "relative", background: "#000", minHeight: narrow ? "clamp(430px,60dvh,500px)" : "min(88dvh,760px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}
    >
      <img src="/images/hero.webp" alt="Barber cutting a client's hair at Hair Hood" className="hh-photo" style={{ position: "absolute", inset: 0, objectPosition: "50% 22%" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: narrow
            ? "linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.25) 35%,rgba(0,0,0,.95) 100%)"
            : "linear-gradient(180deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.28) 40%,rgba(0,0,0,.92) 100%)",
        }}
      />
      <div className="hh-container" style={{ position: "relative", width: "100%", paddingBottom: narrow ? "clamp(24px,6vw,32px)" : "clamp(48px,7vw,80px)", paddingTop: narrow ? 0 : 24 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: narrow ? "clamp(46px,13vw,64px)" : "clamp(58px,12vw,148px)", lineHeight: 0.88, letterSpacing: ".01em", textTransform: "uppercase", color: "#fff" }}>
          Sharp,<br />every time
        </h1>
        <div className="hh-motto" style={{ fontSize: narrow ? "clamp(24px,7vw,32px)" : "clamp(30px,5vw,56px)", color: "#fff", marginTop: narrow ? 10 : 14, lineHeight: 1.05 }}>
          {shop.tagline}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: narrow ? 18 : 32 }}>
          {narrow ? (
            <Button size="lg" full onClick={() => startBooking(null)}>Book Now</Button>
          ) : (
            <>
              <Button size="lg" onClick={() => startBooking(null)}>Book a cut</Button>
              <Button size="lg" variant="secondary" onClick={() => navigate("/team")}>Meet the Team</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================== mobile home ============================== */

function HomeMobile() {
  const { startBookingWithBarber, startBooking } = useBookingActions();
  const { barbers, featuredServices, reviews } = useContent();
  const reviewsRef = useAutoplayRail(true);
  const priceTeaser = (featuredServices || []).slice(0, 4);

  return (
    <>
      <section style={{ background: "var(--hh-bone-050)", padding: "40px 0 44px" }}>
        <div className="hh-container" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, padding: "0 20px" }}>
          <h2 style={{ fontSize: "clamp(30px,9vw,38px)" }}>Meet the team</h2>
          <Link to="/team" style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-black)", whiteSpace: "nowrap" }}>See all</Link>
        </div>
        <div className="hh-rail" style={{ marginTop: 20, padding: "0 0" }}>
          <div className="hh-rail-pad" />
          {(barbers || []).map((b) => (
            <div key={b.id} onClick={() => startBookingWithBarber(b.id)} style={{ cursor: "pointer", flex: "0 0 128px", scrollSnapAlign: "start", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ width: 128, height: 156, overflow: "hidden", background: "var(--hh-ink-600)" }}>
                {b.photo && <img src={b.photo} alt={b.name} className="hh-photo" style={{ objectPosition: "50% 20%" }} />}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: ".02em", textTransform: "uppercase" }}>{b.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{b.role}</div>
              </div>
            </div>
          ))}
          <div className="hh-rail-pad-sm" />
        </div>
      </section>

      <section style={{ background: "var(--hh-white)", padding: "40px 0 44px" }}>
        <div style={{ padding: "0 20px" }}>
          <h2 style={{ fontSize: "clamp(30px,9vw,38px)" }}>Cuts &amp; prices</h2>
        </div>
        <div className="hh-rail" style={{ marginTop: 20 }}>
          <div className="hh-rail-pad" />
          {priceTeaser.map((item) => (
            <div key={item.id || item.name} onClick={() => startBooking(item.bookId)} style={{ cursor: "pointer", flex: "0 0 152px", scrollSnapAlign: "start", borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-muted)" }}>From</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 32, letterSpacing: ".01em", color: "var(--hh-black)", marginTop: 2 }}>{item.price}</div>
              <div style={{ fontSize: 14, color: "var(--hh-black)", marginTop: 8, lineHeight: 1.2 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{item.duration}</div>
            </div>
          ))}
          <div className="hh-rail-pad-sm" />
        </div>
        <div style={{ padding: "20px 20px 0" }}>
          <Link to="/services" style={{ border: "none" }}>
            <Button variant="secondary" full>See full price list</Button>
          </Link>
        </div>
      </section>

      <WorkSection narrow />

      <section className="hh-inverse" style={{ background: "#000", padding: "40px 0 44px" }}>
        <div style={{ padding: "0 20px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <h2 style={{ fontSize: "clamp(30px,9vw,38px)", color: "#fff" }}>From the chair</h2>
          <Link to="/gallery" style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-ink-300)" }}>See all</Link>
        </div>
        <div ref={reviewsRef} className="hh-rail" style={{ marginTop: 20 }}>
          <div className="hh-rail-pad" />
          {(reviews || []).map((r) => (
            <div key={r.who} style={{ flex: "0 0 78%", scrollSnapAlign: "start", borderTop: "1px solid var(--hh-brass-500)", paddingTop: 16 }}>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.4, color: "#fff" }}>{r.quote}</p>
              <div style={{ marginTop: 14, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-ink-300)" }}>{r.who}</div>
            </div>
          ))}
          <div className="hh-rail-pad-sm" />
        </div>
      </section>

      <VisitSection narrow />
    </>
  );
}

/* ============================= desktop home ============================= */

function HomeDesktop() {
  const { startBooking, startBookingWithBarber } = useBookingActions();
  const { shop, barbers, featuredServices, reviews } = useContent();
  const navigate = useNavigate();
  const revealPrices = useReveal();
  const revealWork = useReveal();
  const revealTeam = useReveal();
  const revealReviews = useReveal();
  const revealInsta = useReveal();
  const revealVisit = useReveal();

  return (
    <>
      <section style={{ background: "var(--hh-white)", padding: "clamp(64px,10vw,128px) 0" }}>
        <div ref={revealPrices} data-reveal className="hh-container">
          <SectionHeading eyebrow="The menu" title="Cuts & prices" motto="same for every chair" lede="Every cut finishes with a hot towel. Prices vary slightly by barber." />
          <div style={{ marginTop: 40 }}>
            {(featuredServices || []).map((s) => (
              <ServiceRow key={s.id || s.name} name={s.name} duration={s.duration} price={s.price} onSelect={() => startBooking(s.bookId)} />
            ))}
          </div>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="secondary" onClick={() => navigate("/services")}>Full price list</Button>
            <Button onClick={() => startBooking(null)}>Book a chair</Button>
          </div>
        </div>
      </section>

      <section className="hh-inverse" style={{ background: "#000", padding: "clamp(64px,10vw,128px) 0" }}>
        <div ref={revealWork} data-reveal className="hh-container">
          <SectionHeading eyebrow="The work" title="Fresh out the chair" motto="straight from the chair" />
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 2 }}>
            <div style={{ gridColumn: "span 2", aspectRatio: "1/1", overflow: "hidden", background: "var(--hh-ink-600)" }}>
              <img src="/images/art-wall.jpg" alt="The art wall behind the bar" className="hh-photo" />
            </div>
            <PlaceholderTile label="Skin fade" toneIndex={0} style={{ aspectRatio: "1/1" }} />
            <PlaceholderTile label="Beard work" toneIndex={1} style={{ aspectRatio: "1/1" }} />
            <PlaceholderTile label="Taper" toneIndex={2} style={{ aspectRatio: "1/1" }} />
            <PlaceholderTile label="The bar" toneIndex={0} style={{ aspectRatio: "1/1" }} />
          </div>
          <div style={{ marginTop: 28 }}>
            <Button variant="secondary" onClick={() => navigate("/gallery")}>See the gallery</Button>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface-marble)", padding: "clamp(64px,10vw,128px) 0" }}>
        <div ref={revealTeam} data-reveal className="hh-container">
          <SectionHeading eyebrow="The chairs" title="Who's cutting" motto="know your barber" lede="Book a name, or leave it to whoever's free." />
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {(barbers || []).map((b) => (
              <BarberCard key={b.id} name={b.name} role={b.role} signature={b.signature} note={b.note} photo={b.photo} onBook={() => startBookingWithBarber(b.id)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--hh-bone-050)", padding: "clamp(64px,10vw,128px) 0" }}>
        <div ref={revealReviews} data-reveal className="hh-container">
          <SectionHeading eyebrow="What people say" title="From the chair" />
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(24px,4vw,56px)" }}>
            {(reviews || []).map((r) => (
              <div key={r.who} style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 18 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.02, textTransform: "uppercase", color: "var(--hh-black)" }}>{r.quote}</p>
                <div style={{ marginTop: 16, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-muted)" }}>{r.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--hh-white)", padding: "clamp(56px,8vw,96px) 0" }}>
        <div ref={revealInsta} data-reveal>
          <div className="hh-container" style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
            <span className="hh-eyebrow">On Instagram</span>
            <a href={shop.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase" }}>{shop.instagramHandle}</a>
          </div>
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 2 }}>
            <div style={{ aspectRatio: "1/1", overflow: "hidden" }}><img src="/images/art-wall.jpg" alt="" className="hh-photo" style={{ filter: "grayscale(1)" }} /></div>
            <PlaceholderTile toneIndex={1} style={{ aspectRatio: "1/1" }} />
            <PlaceholderTile toneIndex={2} style={{ aspectRatio: "1/1" }} />
            <div style={{ aspectRatio: "1/1", overflow: "hidden" }}><img src="/images/art-wall.jpg" alt="" className="hh-photo" style={{ objectPosition: "20% 40%", filter: "grayscale(1)" }} /></div>
            <PlaceholderTile toneIndex={0} style={{ aspectRatio: "1/1" }} />
            <PlaceholderTile toneIndex={1} style={{ aspectRatio: "1/1" }} />
          </div>
        </div>
      </section>

      <VisitSection narrow={false} revealRef={revealVisit} />
    </>
  );
}

/* ============================== work section ============================== */

function WorkSection({ narrow }) {
  if (!narrow) return null;
  return (
    <section style={{ background: "var(--hh-bone-050)", padding: "40px 0 44px" }}>
      <div style={{ padding: "0 20px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ fontSize: "clamp(30px,9vw,38px)" }}>The work</h2>
        <Link to="/gallery" style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-black)" }}>See all</Link>
      </div>
      <div style={{ marginTop: 16, padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 2 }}>
        <div style={{ aspectRatio: "1/1", overflow: "hidden" }}><img src="/images/art-wall.jpg" alt="" className="hh-photo" style={{ filter: "grayscale(1)" }} /></div>
        <PlaceholderTile toneIndex={0} style={{ aspectRatio: "1/1" }} />
        <PlaceholderTile toneIndex={1} style={{ aspectRatio: "1/1" }} />
        <PlaceholderTile toneIndex={2} style={{ aspectRatio: "1/1" }} />
        <div style={{ aspectRatio: "1/1", overflow: "hidden" }}><img src="/images/art-wall.jpg" alt="" className="hh-photo" style={{ objectPosition: "20% 40%", filter: "grayscale(1)" }} /></div>
        <PlaceholderTile toneIndex={0} style={{ aspectRatio: "1/1" }} />
      </div>
    </section>
  );
}

/* ============================== visit section ============================== */

export function VisitSection({ narrow, revealRef }) {
  const { shop, hours, status } = useContent();

  if (narrow) {
    return (
      <section style={{ background: "var(--surface-marble)", padding: "40px 0 44px" }}>
        <div style={{ padding: "0 20px" }}>
          <h2 style={{ fontSize: "clamp(30px,9vw,38px)" }}>Visit us</h2>
          <div style={{ marginTop: 20, borderTop: "2px solid var(--hh-black)", paddingTop: 16 }}>
            <div style={{ fontSize: 15, color: "var(--hh-black)", lineHeight: 1.5 }}>{shop.addressLines.join(", ")}</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: ".02em", color: "var(--text-body)", lineHeight: 1.9 }}>
              {hours.map((h) => (
                <div key={h.day} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ textTransform: "uppercase" }}>{h.day}</span>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
            <MapEmbed mapsQuery={shop.mapsQuery} />
            <div style={{ marginTop: 14 }}>
              <a href={shop.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="hh-tap" style={{ display: "flex", alignItems: "center", border: "none", fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-black)", textDecoration: "underline" }}>
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--hh-bone-050)", padding: "clamp(64px,10vw,128px) 0" }}>
      <div ref={revealRef} data-reveal className="hh-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>
        <div>
          <SectionHeading eyebrow="Find us" title={shop.addressLines[0]} motto="the door is black" lede={`${shop.addressLines.slice(1).join(", ")}. Two minutes from the Whiteladies Road bus stops.`} />
          <div style={{ marginTop: 28 }}>
            <a href={shop.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".02em" }}>Get directions</a>
          </div>
          <MapEmbed mapsQuery={shop.mapsQuery} style={{ marginTop: 28 }} />
        </div>
        <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <span className="hh-eyebrow">Opening hours</span>
            <Badge tone={status.isOpen ? "open" : "closed"}>{status.isOpen ? "Open now" : "Closed"}</Badge>
          </div>
          <HoursTable rows={hours.map((h) => ({ day: h.day, hours: h.label === "Closed" ? null : h.label }))} today={status.today} style={{ marginTop: 20 }} />
          <p style={{ marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>Last appointment 30 minutes before closing. Walk-ins welcome when a chair is free — booking is safer.</p>
        </div>
      </div>
    </section>
  );
}

function MapEmbed({ mapsQuery, style }) {
  return (
    <div style={{ position: "relative", aspectRatio: "16/9", filter: "grayscale(1) contrast(1.05)", ...style }}>
      <iframe
        title="Hair Hood on Google Maps"
        src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
