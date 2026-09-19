import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { StickyBookBar } from "./StickyBookBar.jsx";
import { CookieBanner } from "./CookieBanner.jsx";
import { useNarrow } from "../../lib/useMediaQuery.js";

/** Page shell: header, routed content, footer, and the two fixed overlays. */
export function Layout() {
  const location = useLocation();
  const narrow = useNarrow();
  const stickyBarShowing = narrow && location.pathname !== "/book";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ background: "var(--hh-bone-050)", minHeight: "100dvh" }}>
      <Header />
      <div style={{ paddingBottom: stickyBarShowing ? "calc(66px + env(safe-area-inset-bottom))" : 0 }}>
        <Outlet />
      </div>
      <Footer />
      <StickyBookBar />
      <CookieBanner />
    </div>
  );
}
