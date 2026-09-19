# Hair Hood — Design System

A design system for **Hair Hood LTD**, a barbershop in Bristol, UK. Sleek, professional, modern. The palette is black and white, the typography is loud and condensed, and the tone is confident and unfussy.

---

## 1. Company & product context

**Hair Hood LTD** is an independent barbershop on Whiteladies Road in Clifton, Bristol — but the branding leans **gentlemen's club**, not barbershop. There's a bar at the back of the shop, curated art on the walls (monochrome prints; jewel-studded antlers in Union Jack red, blue and silver glitter), and a members'-room feel with the door open to anyone.

The idea the brand sells is **exclusivity plus community**: you're not a customer, you're in. The motto — **"Welcome to my hood"** — is the brand's core phrase and belongs in Richardson Script wherever it appears.

Services are the usual barbering menu (skin fades, scissor cuts, beard work, hot-towel shaves, kids' cuts). Appointments are bookable online; walk-ins are taken when a chair is free.

**Surfaces represented in this system**

| Surface | What it is | Where it lives here |
| --- | --- | --- |
| Marketing website | Public shopfront: hero, services & prices, team, gallery, visit/hours, footer | `ui_kits/website/` |
| Booking flow | Pick service → barber → date & time → details → confirmation | `ui_kits/booking/` |

### Sources given to me

- **Website:** https://www.hairhood.co.uk/ — built on **Square Online**. Its `theme-color` and Windows tile colour are both `#000000`, which is the strongest machine-readable brand signal on the page.
- **Fonts (uploaded):**
  - `uploads/Bungee/` — Bungee Regular + OFL licence (Google Fonts / David Jonathan Ross).
  - `uploads/franchise_2/` — Franchise + Franchise Filled (condensed all-caps display).
  - `uploads/richardson_script/` — Richardson Script **DEMO** (.otf), plus the vendor read-me and a specimen image.
- **Brief:** "a sleek, professional and modern barber in Bristol, UK. colour palette is blacks and whites."

### Gaps and substitutions — please read

1. **No logo was supplied, and I did not draw one.** Everywhere a mark would sit, the wordmark **HAIR HOOD** is set in `--font-display` (Franchise), uppercase. `assets/` contains no logo file. Send an SVG/PNG and I'll wire it in.
2. **Bungee carries UI text and prices, as briefed — but not paragraphs.** Bungee is a single-weight signage face; at paragraph length it is genuinely unreadable, so running prose uses **Archivo** (Google Fonts) as `--font-body`. Everything the brief calls "readability elsewhere" — labels, buttons, nav, times, prices, table figures — is Bungee (`--font-ui`). **Flagging this split for your approval**; if you want Bungee on paragraphs too, say so and I'll change it.
3. **Richardson Script is the free DEMO cut, licensed for personal use only** (`assets/fonts/RichardsonScript-LICENSE.txt`). It is wired up as `--font-script` but must not ship commercially until licensed. Use it once per page at most.
4. **Reference photos supplied:** the framed monochrome cat print from behind the bar, and the jewel-studded Union Jack antlers. A third (someone seated at the bar — marble top, brass light fittings, high-spec clean finish) was described but **did not arrive in the project**; please re-attach it. Only two reference photos were supplied (the framed Kusama-style monochrome cat print from behind the bar, and the jewel-studded Union Jack antlers). They informed the art direction but are not in `assets/` as brand imagery. Every image area in the UI kits is a labelled placeholder — real shop, art-wall and haircut photography is the single biggest upgrade available.
5. **Site copy could not be scraped** (Square Online renders client-side, so the pages return metadata only). Copy in this system is written *in the brand's voice* as a pattern to follow, not lifted verbatim. Confirm names, prices and hours before anything goes live.
6. **No icon set was supplied.** I link **Lucide** from CDN (see Iconography).

---

## 2. Content fundamentals

**Voice.** A good barber talking, not a brand — and a host as much as a barber. Short, certain, slightly blunt, quietly proud of the room. No apologising, no hype, no exclamation marks.

**The core phrase.** **"Welcome to my hood"** — set in Richardson Script, used once per page (hero, footer, or booking confirmation). It's the invitation the whole brand hangs on: exclusive-feeling, but the door is open. Related mottos follow the same pattern — lowercase, three or four words, script: *same for every chair*, *know your barber*, *straight from the chair*, *the door is black*.

**Two things to keep saying.** Exclusivity ("members' feel, open door") and community ("you're a regular from the first cut"). The bar and the art are proof, so mention them plainly — "take a drink from the bar while you wait", "ask about any of it" — never as luxury language ("indulge", "bespoke", "elevate").

**Casing.**
- Display and headings: **UPPERCASE**. This is the loudest brand signal after black.
- Eyebrows and labels: uppercase, letterspaced `--ls-eyebrow` / `--ls-label`.
- Body copy: sentence case, normal punctuation.
- Never Title Case A Sentence Like This.

**Person.** Address the customer as **you**; speak for the shop as **we**. Never "I". Never third-person ("Hair Hood offers…").

**Length.** Headlines 2–5 words. Sub-lines one sentence. Body paragraphs 1–3 sentences, max ~62 characters wide (`--measure-prose`). If a paragraph needs a third sentence, it usually needs cutting instead.

**Numbers.** Prices as `£28`, no decimals unless real. Durations as `45 min`. Times as `9:00`–`18:00` (24h in schedule UI, 12h in prose). Phone numbers spaced as dialled.

**Emoji: never.** Not in UI, not in copy, not in social captions rendered inside product surfaces. Unicode used as ornament is limited to `·` separators and `—` em dashes.

**Examples — do this**

- Hero: `SHARP, EVERY TIME` / *welcome to my hood* / "Clifton's barbershop. A chair, a drink from the bar, and out looking sharper than you came in."
- Booking CTA: `BOOK A CHAIR`
- Services eyebrow: `THE MENU`
- Walk-in note: "Walk-ins welcome when a chair is free. Booking is safer."
- Closed state: "Closed now — opens Tuesday, 9:00."
- Confirmation: `YOU'RE IN.` / "Wednesday 14 August, 10:30 with Reece. We'll text you the day before."
- Empty slot list: "Nothing left on this day. Try tomorrow."

**Examples — don't**

- "Welcome to Hair Hood! 💈 We're passionate about hair!"
- "Elevate your grooming journey with our premium bespoke experience."
- "Oops! Something went wrong. Please try again later."
- "Book Your Appointment Today And Save!"

**Microcopy rules.** Buttons are verbs in uppercase, 1–3 words (`BOOK A CHAIR`, `PICK A TIME`, `CONFIRM`). Errors state the fix, not the fault ("Enter a mobile number we can text."). Never use "please" as filler.

---

## 3. Visual foundations

**The idea.** A black-and-white members' room with a barber's chair in it. Classic, sophisticated, robust — never techy. Big condensed type, hairline rules, flat surfaces, hard corners. Contrast and typographic scale do all the work; when the design needs energy it gets *bigger*, not more colourful.

**Two hard bans.**
1. **No rounded rectangles.** Every corner in the system is 0 (`--radius-card`, `--radius-control`, `--radius-image`). Radios are the only circles; nothing else curves. Badges, toggles and chips are all square.
2. **No highlighted callout boxes.** No tinted panels, no accent left-borders, no "info card" treatments. When content needs setting apart, use a **2px black rule above it** (`--rule-strong`) and let the white space do the rest.

### Materials — what the room is made of
The shop is finished to a high spec and the design should read the same way: **marble, brass, black, clean lines, nothing cluttered.**
- **Marble** is the bar top: cool and pale with faint grey veining (`--hh-marble-050` `#F2F1EF`, veining `--hh-marble-vein` `#CFCEC9`, `--surface-marble`). Use it as a quiet alternative page/section surface — never a busy stone texture, never warm travertine.
- **Brass** is the light fittings and the bar rail. In the UI it appears as **fine metal only**: a 1px `--rule-metal` divider on black, a thin underline on an active item, a small mark or number. `--accent-metal` `#C79A4E`, bright `--accent-metal-bright` `#E0C079`. **Never a fill, never a button, never a large area** — the moment brass covers surface area the design stops looking expensive.
- **Cleanliness is a rule, not a mood.** No clutter, no stacked decoration, no more than one accent per view. Generous empty space and straight, unbroken lines are the luxury signal — if a layout looks busy, it's wrong.

### Colour
- Two anchors: `--hh-black` `#000000` and `--hh-white` `#FFFFFF`.
- A warm paper pair keeps light pages from feeling clinical: `--hh-bone-050` `#F6F5F2` (page) and `--hh-bone-100` `#EDEBE7` (sunken).
- A 10-step ink ramp (`--hh-ink-100`…`--hh-ink-900`) covers text, borders and disabled states.
- **Colour is signal only.** `--status-open` green, `--status-closing` amber, `--status-closed` red, and `--hh-brass-500` `#C79A4E` as the focus ring / one-off accent. Never a fill for large areas.
- **Jewel accents** — `--hh-jewel-ruby` `#A32330`, `--hh-jewel-sapphire` `#1F3A93`, `--hh-jewel-silver` `#C9CCD1` — come from the studded antlers. They exist **for art and imagery only**: a hairline marker under an art photo, a caption swatch. Never a button, never a background, never a callout.
- Sections invert wholesale via the `.hh-inverse` class scope — hero, footer and the sticky booking bar are black; content sections are bone. **Max two background values per page.**

### Typography — four faces, four jobs

| Face | Token | Job |
| --- | --- | --- |
| **Franchise** | `--font-logo`, `--font-display` | **The logo, and every title.** A *dimensional* face — the glyphs carry their own drop shadow, so it must be set large (`--fs-700`+), uppercase, `--lh-tight` 0.88, with air around it. Never at label size; the shadow closes up and turns to mud. |
| **Franchise Filled** | `--font-display-inline` | The inline/striped cut of Franchise. One word at a time, signage moments only (a banner, a sticker) — never a full headline. |
| **Bungee** | `--font-ui` | **Everything readable elsewhere: labels, buttons, nav, dates, times and all prices.** Uppercase, small — `--fs-100` for labels, `--fs-500` for prices. |
| **Richardson Script** | `--font-script` | **Mottos and fancy subtext.** "Welcome to my hood", "same for every chair", "know your barber". One per section, never functional. |
| **Archivo** | `--font-body` | Running paragraphs only — the substitute face, because Bungee can't hold prose. |

Never use Franchise for a label, Bungee for a title, or Richardson for anything a customer has to act on.

### Layout & spacing
- 4px base scale (`--space-1`…`--space-40`). Sections breathe at `--section-y` 96px (128px on large screens).
- `--container-max` 1240px, `--container-narrow` 760px for prose, 24/56px inline gutters.
- Grids are asymmetric: a service list is a 2-column price list with a leader rule, not evenly-spaced cards. Full-bleed black bands separate content zones.
- Fixed elements: a sticky top header (transparent over the hero, then solid black on scroll) and, on mobile, a fixed bottom booking bar. Nothing else pins.
- Layout uses flex/grid with `gap` throughout.

### Backgrounds & imagery
- No gradients as decoration. The only gradients allowed are **protection scrims** over photography (`--scrim-image`, `--scrim-bottom`) so white type stays legible.
- Photography is the one place colour enters: **desaturated, cool-neutral, high-contrast, slight grain**; skin tones kept true. Prefer black-and-white for portraits and the art wall, muted colour for interiors. The jewelled pieces are the one permitted burst of saturation, and only as the subject of a photo.
- **Interiors must look immaculate.** Marble surfaces, warm brass fittings against cool greys, straight sightlines, nothing on the counter. Wide, level, architectural framing — no tight crops on mess, no products scattered for "authenticity".
- Images are full-bleed or edge-to-edge in their column, square corners, no border, no shadow.
- Texture is allowed as a whisper: fine grain or a subtle paper tone on bone surfaces. No repeating logo patterns.

### Cards, borders, radii
- **Corner radius is 0.** `--radius-card`, `--radius-control`, `--radius-image` all resolve to `0px`. `--radius-pill` survives for exactly one component: the Radio circle. Nothing else in the system curves — no pill badges, no rounded toggles, no soft cards.
- Cards are defined by a **hairline border** (`--rule-hairline`, 1px at 12% black) on a white surface, with no shadow (`--shadow-card: none`). A "raised" card gets a 2px black border instead of a shadow. In page layouts, prefer a **2px black rule above the content** to a bordered box entirely — the kits use rules, not cards, for hours, walk-in notes and booking summaries.
- Rules separate list rows: 1px hairline, full width of the row.
- Buttons are hard rectangles: solid black (primary), 1.5px black outline (secondary), text-only (ghost).

### Shadows & transparency
- Shadow exists in three steps but is used almost nowhere: `--shadow-1` for a lifted image, `--shadow-2` for a dropdown, `--shadow-3` for modals only.
- Transparency and blur are limited to two cases: the scrolled header (`--blur-glass`, black at 80%) and modal scrims (`--surface-scrim`, black 64%). Never frosted cards.

### Motion
- Fast and mechanical. `--dur-fast` 140ms for control state changes, `--dur-base` 220ms for panels, `--dur-reveal` 700ms for a section fade-up on scroll.
- Easing is `--ease-standard` `cubic-bezier(.2,0,.2,1)`. **No bounce, no spring, no overshoot** — this brand doesn't bounce.
- Transitions: opacity, colour and small translates only. Never animate scale on entry.
- `prefers-reduced-motion` zeroes every duration (handled in `tokens/motion.css`).

### States
- **Hover:** filled elements go one step *lighter* on black (`--action-primary-bg-hover` `#1E1E1E`); outlined elements **invert** to solid black with white text; ghost gets an 8% black wash. Links shift to `--text-link-hover` and keep their 1px underline.
- **Press:** `transform: scale(0.98)` (`--press-scale`) plus one more step of darkening. No ripple.
- **Focus:** 2px `--focus-ring` brass outline, 2px offset — the only place brass appears in the UI by default.
- **Disabled:** `--action-disabled-bg` `#D8D8D8` / `#8A8A8A` text, no opacity tricks.
- **Selected (booking):** solid black fill with white text — selection reads as inversion, never as a tint.

---

## 4. Iconography

- **No icon set was supplied by the brand**, and I did not draw one. I link **[Lucide](https://lucide.dev)** from CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.js`) — outline, 2px stroke, square-ish geometry, which matches the flat hairline aesthetic. **This is a substitution; flag it if the shop already uses something else.**
- Usage: `stroke-width: 1.75`, `currentColor`, sized 16 / 20 / 24 px on the same optical line as `--fs-300` text. Icons never carry colour of their own.
- Icons are **functional only** — nav, close, chevrons, calendar, clock, phone, map pin, scissors, Instagram. No decorative icon grids, no icon-per-bullet lists, no icons inside headlines.
- **No icon font, no PNG icons, no emoji.** Unicode is used only for `·` and `—`.
- Social marks (Instagram, Google) come from Lucide's brand-adjacent glyphs; if a real Instagram mark is needed, supply the official asset.

---

## 5. Index

**Root**
- `styles.css` — the single entry point consumers link. `@import` list only.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skills-compatible wrapper.
- `thumbnail.html` — homepage tile.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `borders.css`, `elevation.css`, `motion.css`, `base.css`

**`assets/fonts/`** — Bungee-Regular.ttf, Franchise.ttf, FranchiseFilled.ttf, RichardsonScript-DEMO.otf + licences. *(No logo, no imagery — see Gaps.)*

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand). Type cards are split by *job*: logo/titles, UI & prices, mottos, prose, the four together. Brand cards include **Art direction — the hood** and **Hard edges only** (the do/don't for rounded boxes and callouts).

**`components/core/`** — Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip
**`components/shop/`** — SectionHeading, ServiceRow, BarberCard, HoursTable, TimeSlotGrid

**`ui_kits/`** — `website/` (marketing shopfront, including a "The hood" section for the bar and the art wall), `booking/` (appointment flow)

### Intentional additions

No source defined a component inventory (brand brief + fonts only), so `components/core/` is a standard primitive set sized to a booking site. `components/shop/` adds five brand-specific patterns the surfaces genuinely need: `SectionHeading` (eyebrow + condensed headline pairing), `ServiceRow` (price list with leader rule), `BarberCard`, `HoursTable`, `TimeSlotGrid`. Each is a real pattern on a barbershop site, not a speculative primitive.
