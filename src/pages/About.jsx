import { useNavigate } from "react-router-dom";
import { useBookingActions } from "../booking/BookingContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { Button } from "../components/ui/Button.jsx";

export function About() {
  const { startBooking } = useBookingActions();
  const { shop: SHOP } = useContent();
  const navigate = useNavigate();

  return (
    <main>
      <section className="hh-inverse" style={{ position: "relative", background: "#000", minHeight: "min(62dvh,520px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img src="/images/hero-landscape.jpg" alt="" className="hh-photo" style={{ position: "absolute", inset: 0, objectPosition: "50% 28%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.92))" }} />
        <div className="hh-container" style={{ position: "relative", width: "100%", paddingBottom: "clamp(40px,6vw,64px)" }}>
          <h1 style={{ fontSize: "clamp(52px,10vw,120px)", color: "#fff" }}>About us</h1>
        </div>
      </section>

      <section style={{ background: "var(--hh-bone-050)", padding: "clamp(56px,9vw,112px) 0 0" }}>
        <div className="hh-container-narrow">
          <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 24, marginBottom: "clamp(48px,7vw,80px)" }}>
            <span className="hh-eyebrow">A word from Amir</span>
            <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", maxWidth: "none" }}>Hi, and welcome to my hood.</p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", maxWidth: "none" }}>My name is Amir, and I'm the director of Hair Hood.</p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", maxWidth: "none" }}>I've been providing my barbering skills for over a decade.</p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", maxWidth: "none" }}>
              My top priority is giving a quality, high end service whilst allowing my clients to feel comfortable and relaxed with their complimentary drink in hand.
            </p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", maxWidth: "none" }}>I hope we meet soon!</p>
            <p className="hh-motto" style={{ marginTop: 20, fontSize: "clamp(26px,4vw,36px)", color: "var(--hh-black)" }}>— Amir Baghery</p>
          </div>

          <div style={{ marginBottom: "clamp(48px,7vw,80px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 2 }}>
            <div style={{ gridColumn: "span 2", overflow: "hidden", aspectRatio: "16/10" }}>
              <img src="/images/bar.jpg" alt="Amir cutting a client's hair" className="hh-photo" />
            </div>
            <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
              <img src="/images/amir-portrait.jpg" alt="Amir cutting a client's hair, street view" className="hh-photo" style={{ objectPosition: "50% 20%" }} />
            </div>
            <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
              <img src="/images/fade-closeup.jpg" alt="Close-up of a fade being finished" className="hh-photo" />
            </div>
            <div style={{ gridColumn: "span 2", overflow: "hidden", aspectRatio: "16/9" }}>
              <img src="/images/art-wall.jpg" alt="The art wall behind the bar" className="hh-photo" style={{ objectPosition: "50% 40%" }} />
            </div>
          </div>

          <p style={{ fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.4, color: "var(--hh-black)", maxWidth: "none" }}>
            A haircut is measurement, angle and pressure. Get those right and it grows out well for six weeks. Get them wrong and no amount of product saves it.
          </p>
          <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, color: "var(--text-body)", maxWidth: "none" }}>
            That is the whole idea behind Hair Hood. We book longer than most shops on Whiteladies Road because a skin fade taken properly to the skin needs fifty minutes, not twenty-five. We check the shape twice — once wet, once dry — before anything is finished.
          </p>
          <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.6, color: "var(--text-body)", maxWidth: "none" }}>
            The room is part of it too. There is a bar at the back, monochrome prints on the wall, and a set of jewel-studded antlers nobody expects. Take a drink while you wait. Ask about any of it.
          </p>

          <div className="hh-motto" style={{ marginTop: 48, fontSize: "clamp(30px,5vw,52px)", lineHeight: 1.05, color: "var(--hh-black)" }}>{SHOP.tagline}</div>

          <div style={{ marginTop: 32, paddingBottom: "clamp(56px,9vw,112px)", display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button size="lg" onClick={() => startBooking(null)}>Book a chair</Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/team")}>Meet the team</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
