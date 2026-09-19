import { Link } from "react-router-dom";
import { useBookingActions } from "../../booking/BookingContext.jsx";
import { useContent } from "../../context/ContentContext.jsx";
import "./Footer.css";

/**
 * One footer for every breakpoint and every page. Merges the desktop
 * mockup's hours/address column with the mobile mockup's booking shortcuts
 * and legal links, so nothing is mobile-only or desktop-only anymore.
 */
export function Footer() {
  const { startBookingByService, startBookingAny } = useBookingActions();
  const { shop: SHOP, hours: HOURS, status } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="hh-inverse hh-footer">
      <div className="hh-container hh-footer-grid">
        <div>
          <div className="hh-logo" style={{ fontSize: 30, color: "#fff" }}>{SHOP.name}</div>
          <div className="hh-motto" style={{ color: "#fff", fontSize: 30, marginTop: 8 }}>{SHOP.tagline}</div>
          <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,.64)", maxWidth: "38ch" }}>
            Barbering, a bar and a wall worth looking at. Whiteladies Road, Clifton.
          </p>
          <div className="hh-footer-social">
            <a href={SHOP.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SHOP.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="hh-footer-col">
          <span className="hh-eyebrow" style={{ color: "var(--hh-ink-300)" }}>Shop</span>
          <Link to="/">Home</Link>
          <Link to="/services">Prices</Link>
          <Link to="/gallery">Gallery &amp; Reviews</Link>
          <Link to="/team">Meet the Team</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact &amp; FAQ</Link>
        </div>

        <div className="hh-footer-col">
          <span className="hh-eyebrow" style={{ color: "var(--hh-ink-300)" }}>Booking</span>
          <a href="#" onClick={(e) => { e.preventDefault(); startBookingByService(); }}>Book by service</a>
          <Link to="/team">Book by barber</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); startBookingAny(); }}>Book any barber</a>
        </div>

        <div className="hh-footer-col" style={{ gap: 10 }}>
          <span className="hh-eyebrow" style={{ color: "var(--hh-ink-300)" }}>Find us</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,.64)", lineHeight: 1.5 }}>
            {SHOP.addressLines.map((l, i) => (
              <span key={l}>
                {l}
                {i < SHOP.addressLines.length - 1 && <br />}
              </span>
            ))}
          </span>
          <a href={`tel:${SHOP.phoneHref}`}>{SHOP.phoneDisplay}</a>
          <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".02em", color: "rgba(255,255,255,.64)", marginTop: 4 }}>{status.label}</span>
          <div className="hh-footer-hours">
            {HOURS.map((h) => (
              <div key={h.day}>
                <span>{h.day.slice(0, 3)}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hh-container hh-footer-legal">
        <Link to="/privacy">Privacy Policy</Link>
        <span className="hh-footer-dot">·</span>
        <Link to="/cookies">Cookie Policy</Link>
        <span className="hh-footer-dot">·</span>
        <Link to="/terms">Booking Terms</Link>
        <span className="hh-footer-dot">·</span>
        <span style={{ color: "var(--hh-ink-300)" }}>© {year} {SHOP.legalName}</span>
        <span className="hh-footer-dot">·</span>
        <span style={{ color: "var(--hh-ink-300)" }}>Bristol, UK</span>
      </div>
    </footer>
  );
}
