import { sanityClient, sanityConfigured } from "./sanityClient.js";
import { urlForImage } from "./sanityImage.js";
import * as fallback from "../data/shop.js";

// ===========================================================================
// Content fetchers — read from Sanity when configured, otherwise (or on any
// per-query failure) fall back to the static placeholder data in
// src/data/shop.js. Every function returns data already shaped to match what
// the fallback module exports, so page components don't need to know which
// source they got. See src/context/ContentContext.jsx for how these are
// combined and cached for the app.
// ===========================================================================

async function safeFetch(query, fallbackValue) {
  if (!sanityConfigured) return fallbackValue;
  try {
    const result = await sanityClient.fetch(query);
    return result ?? fallbackValue;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[content] Sanity fetch failed, using fallback data:", err);
    return fallbackValue;
  }
}

export async function fetchShopSettings() {
  const doc = await safeFetch(
    `*[_type == "siteSettings"][0]{ name, tagline, phoneDisplay, phoneHref, email, addressLines, postcode, mapsQuery, instagramUrl, instagramHandle, whatsappUrl, hours }`,
    null
  );
  if (!doc) return { shop: fallback.SHOP, hours: fallback.HOURS };

  const shop = {
    name: doc.name || fallback.SHOP.name,
    legalName: fallback.SHOP.legalName, // editorial/legal name kept static — not worth a CMS field
    tagline: doc.tagline || fallback.SHOP.tagline,
    phoneDisplay: doc.phoneDisplay || fallback.SHOP.phoneDisplay,
    phoneHref: doc.phoneHref || fallback.SHOP.phoneHref,
    email: doc.email || fallback.SHOP.email,
    addressLines: doc.addressLines?.length ? doc.addressLines : fallback.SHOP.addressLines,
    addressSingleLine: doc.addressLines?.length ? doc.addressLines.join(", ") : fallback.SHOP.addressSingleLine,
    mapsQuery: doc.mapsQuery || fallback.SHOP.mapsQuery,
    mapsDirectionsUrl: doc.mapsQuery ? `https://maps.google.com/?q=${doc.mapsQuery}` : fallback.SHOP.mapsDirectionsUrl,
    instagramUrl: doc.instagramUrl || fallback.SHOP.instagramUrl,
    instagramHandle: doc.instagramHandle || fallback.SHOP.instagramHandle,
    whatsappUrl: doc.whatsappUrl || fallback.SHOP.whatsappUrl,
  };

  const hours = doc.hours?.length
    ? doc.hours.map((h) => ({
        day: h.day,
        open: h.closed ? null : parseHHMM(h.openTime),
        close: h.closed ? null : parseHHMM(h.closeTime),
        label: h.closed ? "Closed" : `${h.openTime} – ${h.closeTime}`,
      }))
    : fallback.HOURS;

  return { shop, hours };
}

function parseHHMM(value) {
  const [h, m] = String(value || "0:0").split(":").map(Number);
  return [h || 0, m || 0];
}

export async function fetchBarbers() {
  const docs = await safeFetch(
    `*[_type == "barber"] | order(order asc) { _id, name, role, signature, note, "photo": photo, squareTeamMemberId }`,
    null
  );
  if (!docs?.length) return fallback.BARBERS;
  return docs.map((d) => ({
    id: d._id,
    name: d.name,
    role: d.role || "",
    signature: d.signature || d.name,
    note: d.note || "",
    photo: urlForImage(d.photo, { width: 800 }),
    squareTeamMemberId: d.squareTeamMemberId || null,
  }));
}

export async function fetchServices() {
  const docs = await safeFetch(
    `*[_type == "service"] | order(category asc, order asc) { _id, name, category, durationDisplay, priceDisplay, featured, bookingKey, squareServiceVariationId }`,
    null
  );
  if (!docs?.length) {
    return {
      services: fallback.SERVICES,
      featured: fallback.SERVICES.filter((s) => fallback.FEATURED_SERVICE_NAMES.includes(s.name)),
    };
  }
  const services = docs.map((d) => ({
    id: d._id,
    name: d.name,
    cat: d.category,
    duration: d.durationDisplay || "",
    price: d.priceDisplay || "",
    // bookId is what the (still-simulated) booking flow keys off — see
    // studio/schemaTypes/service.js "bookingKey". squareServiceVariationId
    // is the real thing, used once functions/api/square/* is wired up.
    bookId: d.bookingKey || null,
    squareServiceVariationId: d.squareServiceVariationId || null,
  }));
  return { services, featured: services.filter((s) => docs.find((d) => d._id === s.id)?.featured) };
}

export async function fetchAddons() {
  const docs = await safeFetch(
    `*[_type == "addon"] { _id, name, priceDisplay, "applicableServiceIds": applicableServices[]->_id, squareServiceVariationId }`,
    null
  );
  if (!docs) return null; // no fallback concept for addons pre-Sanity; booking layer handles null
  return docs.map((d) => ({
    id: d._id,
    name: d.name,
    price: d.priceDisplay || "",
    applicableServiceIds: d.applicableServiceIds || [],
    squareServiceVariationId: d.squareServiceVariationId || null,
  }));
}

export async function fetchReviews() {
  const docs = await safeFetch(`*[_type == "review"] | order(order asc) { quote, who }`, null);
  return docs?.length ? docs : fallback.REVIEWS;
}

export async function fetchFaqs() {
  const docs = await safeFetch(`*[_type == "faq"] | order(order asc) { question, answer }`, null);
  if (!docs?.length) return fallback.FAQS;
  return docs.map((d) => ({ q: d.question, a: d.answer }));
}
