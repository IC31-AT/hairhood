import { LegalPage } from "./LegalPage.jsx";

const sections = [
  { heading: "Essential", body: "Required for the site and booking flow to work. These can't be disabled." },
  { heading: "Analytics", body: "Google Analytics — page views and traffic sources. Only runs if you accept all cookies." },
  { heading: "Advertising", body: "Google Ads conversion tracking — measures whether an ad led to a booking. Only runs if you accept all cookies." },
  { heading: "Managing consent", body: "Consent is handled by CookieYes. Analytics and advertising scripts only fire once you accept all cookies, and the full cookie list here stays current automatically." },
];

export function Cookies() {
  return <LegalPage title="Cookie Policy" sections={sections} />;
}
