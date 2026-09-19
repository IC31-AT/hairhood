import { createClient } from "@sanity/client";

// ===========================================================================
// Read-only Sanity client — public CDN-backed reads, no token needed (the
// `service`, `barber`, `review`, `faq` and `siteSettings` document types are
// all public marketing content; see studio/schemaTypes). Configure via env:
//   VITE_SANITY_PROJECT_ID
//   VITE_SANITY_DATASET      (defaults to "production")
// Set these in .env.local for dev and in the Cloudflare Pages dashboard
// (Settings → Environment variables) for the deployed site.
// ===========================================================================

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(projectId);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-01-01",
      useCdn: true,
    })
  : null;

if (!sanityConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn("[sanity] VITE_SANITY_PROJECT_ID is not set — falling back to the static defaults in src/data/shop.js. See .env.example.");
}
