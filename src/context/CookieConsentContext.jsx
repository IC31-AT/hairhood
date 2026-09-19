import { createContext, useCallback, useContext, useState } from "react";

// ===========================================================================
// Cookie consent — essential-only vs accept-all, persisted in localStorage.
// Ports the mockup's CookieYes-managed banner. Wire GA4 / Google Ads init
// behind `consent === "all"` wherever you add those scripts (see index.html
// and the Cookie Policy page for the placeholders).
// ===========================================================================

const STORAGE_KEY = "hh_cookie_consent";
const CookieConsentContext = createContext(null);

function readStoredConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // localStorage unavailable — banner just stays visible
  }
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readStoredConsent);

  const choose = useCallback((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  }, []);

  const value = {
    consent,
    showBanner: !consent,
    acceptAll: () => choose("all"),
    essentialOnly: () => choose("essential"),
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}
