import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../data/shop.js";
import { useBookingActions } from "../../booking/BookingContext.jsx";
import { useContent } from "../../context/ContentContext.jsx";
import { useNarrow } from "../../lib/useMediaQuery.js";
import { Button } from "../ui/Button.jsx";
import "./Header.css";

export function Header() {
  const narrow = useNarrow();
  const { startBooking } = useBookingActions();
  const { shop: SHOP } = useContent();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // close the mobile menu on every navigation
  useEffect(() => setMenuOpen(false), [location.pathname]);
  // lock body scroll while the full-screen menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="hh-inverse hh-header" style={{ height: narrow ? 56 : 72 }}>
        <div className="hh-container hh-header-row">
          <Link to="/" className="hh-header-logo" style={{ fontSize: narrow ? 24 : undefined }}>
            {SHOP.name}
          </Link>

          {!narrow && (
            <>
              <nav className="hh-header-nav">
                {NAV_LINKS.map((n) => (
                  <Link key={n.to} to={n.to} className="hh-header-link">
                    {n.label}
                  </Link>
                ))}
              </nav>
              <Button size="sm" onClick={() => startBooking(null)}>
                Book a chair
              </Button>
            </>
          )}

          {narrow && (
            <button className="hh-tap hh-header-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              <i />
              <i />
              <i />
            </button>
          )}
        </div>
      </header>

      {narrow && menuOpen && (
        <div className="hh-inverse hh-mobile-menu" role="dialog" aria-modal="true">
          <div className="hh-mobile-menu-top">
            <span className="hh-header-logo">{SHOP.name}</span>
            <button className="hh-tap hh-mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              ×
            </button>
          </div>
          <nav className="hh-mobile-menu-nav">
            {NAV_LINKS.map((n) => (
              <Link key={n.to} to={n.to} className="hh-mobile-menu-link">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hh-mobile-menu-bottom">
            <div className="hh-motto" style={{ color: "#fff", fontSize: 34 }}>
              {SHOP.tagline}
            </div>
            <Button size="lg" full onClick={() => startBooking(null)}>
              Book a chair
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
