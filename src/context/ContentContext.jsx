import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchShopSettings, fetchBarbers, fetchServices, fetchAddons, fetchReviews, fetchFaqs } from "../lib/content.js";
import { getOpenStatus, SHOP, HOURS, CATEGORY_LABELS, SERVICES, FEATURED_SERVICE_NAMES, REVIEWS, FAQS, BARBERS } from "../data/shop.js";

// ===========================================================================
// Site content — seeded instantly with the static placeholder data (so
// there's never a loading spinner for marketing copy, and every page can
// assume these arrays are always populated), then upgraded in the
// background with whatever's live in Sanity. See src/lib/content.js for the
// per-query fallback behaviour. `ready` distinguishes "still the static
// placeholder" from "confirmed resolved" for anything that cares (the
// booking engine, mainly — it needs to know whether Square-id fields have
// actually been checked yet).
// ===========================================================================

const ContentContext = createContext(null);

const initialState = {
  shop: SHOP,
  hours: HOURS,
  barbers: BARBERS,
  services: SERVICES,
  featuredServices: SERVICES.filter((s) => FEATURED_SERVICE_NAMES.includes(s.name)),
  addons: null, // no static-data equivalent pre-Sanity; booking layer treats null as "unknown, assume none yet"
  reviews: REVIEWS,
  faqs: FAQS,
  ready: false, // true once every query has resolved (live or fallback)
};

export function ContentProvider({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ shop, hours }, barbers, { services, featured }, addons, reviews, faqs] = await Promise.all([
        fetchShopSettings(),
        fetchBarbers(),
        fetchServices(),
        fetchAddons(),
        fetchReviews(),
        fetchFaqs(),
      ]);
      if (cancelled) return;
      setState({
        shop,
        hours,
        barbers,
        services,
        featuredServices: featured,
        addons,
        reviews,
        faqs,
        ready: true,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    const status = getOpenStatus(state.hours);
    const groupedServices = groupByCategory(state.services || []);
    return { ...state, status, groupedServices, categoryLabels: CATEGORY_LABELS };
  }, [state]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

function groupByCategory(services) {
  const cats = [...new Set(services.map((s) => s.cat))];
  return cats.map((cat) => ({ cat, label: CATEGORY_LABELS[cat] || cat, items: services.filter((s) => s.cat === cat) }));
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
