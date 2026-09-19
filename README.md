# Hair Hood — website

React + Vite site for the Hair Hood barbershop, built from the Claude Design
Canvas mockup in [`Claude Design Mockup/`](./Claude%20Design%20Mockup). Content
is served from Sanity, booking runs through Square, and it's *meant* to
deploy to Cloudflare (static assets + serverless Functions for the API
routes that need secret keys) — see the infrastructure status below before
assuming any of that is actually working.

**Edit content:** https://hairhood.sanity.studio

## ⚠️ Infrastructure status — read this before touching deploys

As of 2026-09-19, this repo **has never successfully deployed anywhere**.
Ground truth, confirmed directly against the Cloudflare account (id
`ebc9ea50d0e2e9123136f0c3ff353218`, GitHub repo `IC31-AT/hairhood`):

- **No Cloudflare Pages project exists on this account at all**
  (`npx wrangler pages project list` returns empty). The `pages_build_output_dir`
  key in `wrangler.jsonc` and the old `wrangler pages deploy
  --project-name=hairhood-website` instructions later in this file describe
  the *original plan*, not anything that currently exists.
- **A Cloudflare Worker named `hairhood` exists instead**, created via the
  dashboard's "Import a Git repository" wizard, reachable only at its default
  subdomain **`https://hairhood.ishaan-chauhan.workers.dev`** (no custom
  domain or route is bound to it). GitHub CI ("Workers Builds") is connected
  to this repo's `main` branch and successfully runs `npm run build`
  (vite) on every push, but every deploy step has failed — first
  `wrangler deploy` (wrong command for a project configured with
  `pages_build_output_dir`), then `wrangler pages deploy` (no Pages project
  to deploy to), with API-token permission gaps compounding both.
- **That Worker is currently serving a completely different, unrelated
  codebase** — a real, content-complete Next.js build of the Hair Hood site
  (`<title>Hair Hood — Barbershop, Whiteladies Road, Bristol</title>`,
  matching real shop copy), sharing the same Sanity project (`ep0gakki`) but
  otherwise nothing to do with this repo. Its origin is unconfirmed — possibly
  an agency/previous-developer build. **Do not overwrite it without
  confirming with the site owner first.**

**Open decision before deploy will work at all:** either (a) create the
classic Pages project this repo's code assumes (matches `functions/api/**`
Pages Functions as-is, no code changes needed), or (b) convert to a real
Workers-with-static-assets deploy (`assets.directory` in `wrangler.jsonc`,
`wrangler deploy`, and rewrite `functions/api/**` as a single Worker fetch
handler, since Pages Functions' file-based routing doesn't work under plain
Workers). Nothing below this point in the README has been verified to
actually work end-to-end — treat the "Deploying" section as aspirational
until this is resolved.

## Architecture

```
website/
├── src/            React app (Vite). Pages fetch content via useContent();
│                   booking state lives in src/booking/BookingContext.jsx.
├── functions/api/  Cloudflare Pages Functions — the only place secret keys
│                   (Square access token, Sanity write token) ever live.
│                   functions/api/square/*  — availability + create-booking
│                   functions/api/contact.js — writes the contact form to Sanity
├── studio/         Standalone Sanity Studio (separate package.json/deploy —
│                   not bundled into the site). Schema in studio/schemaTypes/.
└── public/         Static images/fonts.
```

Content flow: `src/lib/content.js` reads from Sanity (project `ep0gakki`,
dataset `production`) via the public CDN client, and falls back to the
static placeholder data in `src/data/shop.js` per-query if Sanity is
unreachable or a document type is empty — the site never hard-fails on a
CMS hiccup. `src/context/ContentContext.jsx` fetches everything once and
seeds instantly with the fallback so there's no loading spinner for
marketing copy.

Booking flow: still runs on the front-end-only simulated engine in
`BookingContext.jsx` (fake network delay, random conflict/decline states,
so all the UI states are reachable) — see "Square" below for what's needed
to make it real.

## Running it

```bash
npm install
cp .env.example .env.local        # Sanity project id/dataset (non-secret)
npm run dev                        # http://localhost:5173
npm run build                      # -> dist/
```

For the Studio:

```bash
cd studio
npm install
npm run dev                        # http://localhost:3333
```

For Functions locally (Square/contact — needs secrets, see below):

```bash
cp .dev.vars.example .dev.vars     # fill in real values, gitignored
npx wrangler pages dev dist
```

## Deploying

**See the infrastructure status section at the top of this file first** —
the site deploy path below is not currently working; `hairhood-website` is
not a real Pages project. The Studio deploy (bottom command) is unaffected
and does work.

```bash
# Site — NOT CURRENTLY WORKING, see status section above
npm run build
npx wrangler pages deploy dist --project-name=hairhood-website

# Studio (only needed when studio/schemaTypes changes) — this one's fine
cd studio && npx sanity deploy
```

`wrangler` needs `CLOUDFLARE_API_TOKEN` (Pages:Edit scope) and
`CLOUDFLARE_ACCOUNT_ID` in the environment — see `wrangler.jsonc`.
Runtime secrets for `functions/api/**` are set once via
`wrangler pages secret put NAME --project-name=hairhood-website` (already
done for `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_WRITE_TOKEN` — see
`.dev.vars.example` for the full list including Square, not yet set).

## Editing content

Go to **hairhood.sanity.studio**, sign in, edit away — changes appear on
the live site within the CDN cache window (a minute or so), no redeploy
needed. Document types: Shop settings (singleton — hours/address/contact),
Barber, Service, Add-on, Review, FAQ, and Contact message (read-only inbox
for the site's contact form).

`studio/seed.mjs` is the one-off script that populated the dataset with the
current placeholder content initially — safe to re-run (`createOrReplace`
on fixed `_id`s), not needed again in normal use.

## Square — what's wired vs. what's left

`functions/api/square/*.js` are written against Square's actual documented
Bookings/Catalog/Customers REST API (plain `fetch`, no SDK — see
`functions/_shared/square.js`) but **have no credentials yet**, so they 501.
The booking flow on the site still runs the local simulation. To go live:

1. developer.squareup.com → your app → **Sandbox** tab → copy the Access
   Token. Also grab a Location ID from `GET /api/square/locations` once the
   token's set (or the Square dashboard).
2. `wrangler pages secret put SQUARE_ACCESS_TOKEN --project-name=hairhood-website`
   (and `SQUARE_LOCATION_ID`; `SQUARE_ENVIRONMENT=sandbox` is already a
   public var in `wrangler.jsonc`).
3. Hit `GET /api/square/catalog` and `GET /api/square/team-members` to get
   real IDs, then fill in each Sanity `service` doc's `squareServiceVariationId`
   and each `barber` doc's `squareTeamMemberId` in the Studio.
4. `BookingContext.jsx` still needs rewiring to call `/api/square/availability`
   and `/api/square/bookings` instead of the local simulation once the above
   exists — not done yet, since it can't be tested without real IDs.
5. Switch `SQUARE_ENVIRONMENT` to `production` with production credentials
   when ready to take real bookings.

## Before this goes fully live — please read

1. **Richardson Script font is not licensed for commercial use.** It's the
   script face used for "Welcome to my hood" (hero, footer, about, booking
   confirmation). `public/fonts/RichardsonScript-DEMO.otf` is a demo/
   personal-use cut — see the mockup's own
   `_ds/.../assets/fonts/RichardsonScript-LICENSE.txt`. Buy a commercial
   license or swap `--font-script` in `src/styles/tokens.css` before
   shipping.
2. **Most content is still placeholder**, seeded from copy written in the
   brand's voice, not real facts (the original Square Online site couldn't
   be scraped — see the mockup's own README). Confirm every name, price and
   hour in the Studio before launch — that's the whole point of it now
   being CMS-editable rather than hardcoded.
3. **Analytics/ads are stubbed, not wired up.** The cookie banner
   (`src/context/CookieConsentContext.jsx`) already gates consent into
   localStorage; `index.html` has a commented-out GA4/Google Ads snippet
   ready to uncomment once you have real IDs, gated on
   `localStorage.getItem("hh_cookie_consent") === "all"`.
4. **Real photography.** Only a handful of real shop photos exist; most of
   the gallery/Instagram grid is a labelled grey placeholder tile. Upload
   real ones as Sanity `barber.photo` fields, or extend the `service`/
   gallery schema for shop photography.
5. The `SANITY_WRITE_TOKEN` currently set on Cloudflare is the same
   Administrator token used for initial setup — fine for now, but worth
   swapping for a narrower Editor-scoped token (Sanity → API → Tokens) once
   things settle, since the deployed function only ever needs to create
   `message` documents.

## Source images

`public/images/*.jpg` were re-compressed from the mockup's original
5MB+ camera JPEGs (see `Claude Design Mockup/uploads/`) down to ~100–250KB
each at web-appropriate dimensions. Compress new photography similarly
before uploading — either here for barber portraits (via Sanity, which
serves them through its own CDN already) or `public/images/` for anything
static.
