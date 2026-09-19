import { useCookieConsent } from "../../context/CookieConsentContext.jsx";
import { useNarrow } from "../../lib/useMediaQuery.js";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import "./CookieBanner.css";

/**
 * Essential-only vs accept-all cookie banner. Real analytics/ads scripts
 * should only be injected once `consent === "all"` — see
 * CookieConsentContext and the Cookie Policy page.
 */
export function CookieBanner() {
  const { showBanner, acceptAll, essentialOnly } = useCookieConsent();
  const narrow = useNarrow();
  const location = useLocation();
  if (!showBanner) return null;

  const stickyBarShowing = narrow && location.pathname !== "/book";

  return (
    <div className={"hh-inverse hh-cookie-banner" + (stickyBarShowing ? " hh-cookie-banner-raised" : "")}>
      <p>We use cookies to run this site and to see how our ads are performing. You can accept all cookies or continue with essential only.</p>
      <div className="hh-cookie-banner-actions">
        <Button full onClick={acceptAll}>Accept all</Button>
        <Button variant="secondary" full onClick={essentialOnly}>Essential only</Button>
      </div>
    </div>
  );
}
