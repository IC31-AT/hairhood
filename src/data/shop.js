// ===========================================================================
// Hair Hood — shop data.
//
// This is placeholder/demo content ported from the Claude Design Canvas
// mockup (the design system README says as much: "site copy could not be
// scraped... confirm names, prices and hours before anything goes live").
// The mockup shipped as two divergent prototypes (a simpler desktop flow and
// a richer mobile flow with per-barber pricing + add-ons); this file merges
// them into one consistent data set so the booking engine and every page
// agree with each other. Swap in real names/prices/copy before launch.
// ===========================================================================

export const SHOP = {
  name: "Hair Hood",
  legalName: "Hair Hood LTD",
  tagline: "Welcome to my hood",
  phoneDisplay: "07307 453917",
  phoneHref: "+447307453917",
  email: "amir@hairhood.co.uk",
  addressLines: ["91B Whiteladies Road", "Clifton, Bristol", "BS8 2NT"],
  addressSingleLine: "91B Whiteladies Road, Clifton, Bristol BS8 2NT",
  mapsQuery: "91B+Whiteladies+Road,+Bristol,+BS8+2NT",
  mapsDirectionsUrl: "https://maps.google.com/?q=91B+Whiteladies+Road+Bristol+BS8+2NT",
  instagramUrl: "https://instagram.com",
  instagramHandle: "@hairhood_",
  whatsappUrl: "https://wa.me/447307453917",
};

// day/open/close used to compute live "open now / closes at" status
export const HOURS = [
  { day: "Monday", open: [10, 0], close: [18, 0], label: "10:00 – 18:00" },
  { day: "Tuesday", open: [9, 0], close: [19, 0], label: "09:00 – 19:00" },
  { day: "Wednesday", open: [9, 0], close: [19, 0], label: "09:00 – 19:00" },
  { day: "Thursday", open: [9, 0], close: [19, 0], label: "09:00 – 19:00" },
  { day: "Friday", open: [9, 0], close: [19, 0], label: "09:00 – 19:00" },
  { day: "Saturday", open: [9, 0], close: [17, 0], label: "09:00 – 17:00" },
  { day: "Sunday", open: null, close: null, label: "Closed" },
];

export function getOpenStatus(hours = HOURS, now = new Date()) {
  const todayIdx = now.getDay(); // 0 = Sunday
  const todayData = hours[todayIdx === 0 ? 6 : todayIdx - 1];
  if (!todayData.open) return { isOpen: false, label: "Closed today", today: todayData.day };
  const mins = now.getHours() * 60 + now.getMinutes();
  const openMins = todayData.open[0] * 60 + todayData.open[1];
  const closeMins = todayData.close[0] * 60 + todayData.close[1];
  const isOpen = mins >= openMins && mins < closeMins;
  const pad = (n) => String(n).padStart(2, "0");
  const label = isOpen
    ? `Open now · closes ${pad(todayData.close[0])}:${pad(todayData.close[1])}`
    : mins < openMins
    ? `Opens today at ${pad(todayData.open[0])}:${pad(todayData.open[1])}`
    : "Closed now";
  return { isOpen, label, today: todayData.day };
}

// ---- team --------------------------------------------------------------
// id must match BARBER_PRICING below.
export const BARBERS = [
  {
    id: "amir",
    name: "Amir",
    role: "Owner · Senior Barber",
    signature: "Amir",
    note: "Skin fades and cutthroat work. Runs the shop and the bar behind it.",
    photo: "/images/amir-portrait.jpg",
  },
  {
    id: "alex",
    name: "Alex",
    role: "Barber",
    signature: "Alex",
    note: "Scissor work, longer hair, textured crops.",
  },
  {
    id: "hamid",
    name: "Hamid",
    role: "Junior Barber",
    signature: "Hamid",
    note: "Fades taken clean to the skin. Fast, never rushed.",
  },
];

// ---- bookable base services ----------------------------------------------
// Every priced item on the site resolves to one of these for the booking
// engine. addOns lists which add-on ids can be attached to this service.
export const BASE_SERVICES = [
  { id: "haircut", name: "Haircut", addOns: ["beardline", "hottowelfinish"] },
  { id: "skinfade", name: "Skin Fade", addOns: ["beardline", "hottowelfinish"] },
  { id: "taper", name: "Taper Fade", addOns: ["beardline", "hottowelfinish"] },
  { id: "scissor", name: "Scissor Cut", addOns: ["beardline"] },
  { id: "beard", name: "Beard Trim", addOns: [] },
  { id: "hottowel", name: "Hot Towel Shave", addOns: [] },
];

// [price GBP, duration minutes] per barber per base service. Omitted pairing
// means that barber doesn't offer that service.
export const BARBER_PRICING = {
  amir: { haircut: [24, 20], skinfade: [29, 40], taper: [26, 30], scissor: [25, 25], beard: [15, 15], hottowel: [25, 40] },
  alex: { haircut: [22, 25], skinfade: [27, 45], taper: [24, 35], scissor: [22, 25], beard: [15, 20], hottowel: [25, 40] },
  hamid: { haircut: [20, 25], skinfade: [24, 45], taper: [22, 35], scissor: [21, 30], beard: [13, 20] },
};

export const ADDONS = {
  beardline: { name: "Beard line-up", price: 8, duration: 10, barbers: ["amir", "alex", "hamid"] },
  hottowelfinish: { name: "Hot towel finish", price: 6, duration: 10, barbers: ["amir", "alex"] },
};

// ---- marketing price list -------------------------------------------------
// Static display copy for the Services page / homepage teaser. duration and
// price here are the advertised range; the booking flow always shows the
// live per-barber figure once a barber is chosen. bookId maps each row onto
// a BASE_SERVICES id so every row can start a real booking.
export const CATEGORY_LABELS = {
  cuts: "Cuts",
  beards: "Beards",
  shaves: "Hot towel shaves",
  students: "Students",
  extras: "Extras",
};

export const SERVICES = [
  { name: "Haircut", cat: "cuts", duration: "20–30 min", price: "£22", bookId: "haircut" },
  { name: "Skin fade", cat: "cuts", duration: "40–50 min", price: "£27", bookId: "skinfade" },
  { name: "Taper fade", cat: "cuts", duration: "30–40 min", price: "£24", bookId: "taper" },
  { name: "Scissor cut", cat: "cuts", duration: "25–35 min", price: "£23", bookId: "scissor" },
  { name: "Crew cut", cat: "cuts", duration: "15–25 min", price: "£15", bookId: "haircut" },
  { name: "Long hair", cat: "cuts", duration: "45–55 min", price: "£29", bookId: "haircut" },
  { name: "Haircut & beard trim", cat: "beards", duration: "35–45 min", price: "£30", bookId: "haircut" },
  { name: "Skin fade & beard trim", cat: "beards", duration: "50–60 min", price: "£35", bookId: "skinfade" },
  { name: "Taper fade & beard trim, cutthroat", cat: "beards", duration: "45 min", price: "£32", bookId: "taper" },
  { name: "Crew cut & beard trim", cat: "beards", duration: "25–35 min", price: "£25", bookId: "haircut" },
  { name: "Beard trim", cat: "beards", duration: "15–25 min", price: "£15", bookId: "beard" },
  { name: "Haircut & hot towel shave", cat: "shaves", duration: "45–55 min", price: "£35", bookId: "hottowel" },
  { name: "Skin fade & hot towel shave", cat: "shaves", duration: "1 hr – 1 hr 15", price: "£40", bookId: "hottowel" },
  { name: "Taper fade & hot towel shave", cat: "shaves", duration: "50 min", price: "£37", bookId: "hottowel" },
  { name: "Hot towel face shave", cat: "shaves", duration: "40 min", price: "£25", bookId: "hottowel" },
  { name: "Hot towel head shave", cat: "shaves", duration: "40 min", price: "£25", bookId: "hottowel" },
  { name: "Hot towel head & face shave", cat: "shaves", duration: "1 hr 20 min", price: "£45", bookId: "hottowel" },
  { name: "Student haircut", cat: "students", duration: "20–30 min", price: "£20", bookId: "haircut" },
  { name: "Student skin fade", cat: "students", duration: "40–50 min", price: "£25", bookId: "skinfade" },
  { name: "Student taper fade", cat: "students", duration: "30–40 min", price: "£22", bookId: "taper" },
  { name: "Full facial, hot towel & mask", cat: "extras", duration: "20–30 min", price: "£20", bookId: "hottowel" },
];

export const FEATURED_SERVICE_NAMES = ["Haircut", "Skin fade", "Taper fade", "Haircut & beard trim", "Hot towel face shave", "Student haircut"];

export const PRICE_TEASER = [
  { name: "Skin fade", price: "£27", duration: "40–50 min", bookId: "skinfade" },
  { name: "Haircut", price: "£22", duration: "20–30 min", bookId: "haircut" },
  { name: "Beard trim", price: "£15", duration: "15–25 min", bookId: "beard" },
  { name: "Hot towel shave", price: "£25", duration: "40 min", bookId: "hottowel" },
];

export const REVIEWS = [
  { quote: "“Amir gives a clean fade, sharp finish, no fuss.”", who: "Adam T." },
  { quote: "“Best mens barbershop in Bristol. Book in advance.”", who: "Danny J." },
  { quote: "“He listens carefully and delivers exactly what's asked.”", who: "Mohammadhadi S." },
  { quote: "“Doesn't just cut and send you out — real styling advice too.”", who: "Alexandros F." },
  { quote: "“Clean lines, natural layers. Shows how skilled he is.”", who: "Edouard B." },
  { quote: "“Offers a drink as soon as you walk in. Top barber.”", who: "Samuel" },
  { quote: "“Probably the best barber in Bristol.”", who: "Ishaan C." },
  { quote: "“Consistent, sharp finish. First choice for a haircut.”", who: "Joe D." },
  { quote: "“Set me up for a wedding in Madrid. Will be returning.”", who: "Joe H." },
  { quote: "“Attention to detail and friendly service are the best I've found.”", who: "Jeryl W." },
  { quote: "“Took his time, checked in throughout. A genuine great person.”", who: "Shak K." },
  { quote: "“Very good fade — took one look and made it better than the photo.”", who: "Micah X." },
];

export const FAQS = [
  { q: "Do you take walk-ins?", a: "Welcome when a chair is free. Friday and Saturday, book ahead." },
  { q: "Do you offer a student price?", a: "Yes — reduced prices on cuts, fades and tapers. Bring your card." },
  { q: "How do I pay?", a: "Card and cash. Booking deposits are taken through Square." },
  { q: "Do I need to book?", a: "Booking is safer, especially at weekends, but walk-ins are always welcome when there's a free chair." },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Team", to: "/team" },
  { label: "About", to: "/about" },
];

// ---- booking engine helpers ------------------------------------------------
export function eligibleBarbersForService(serviceId) {
  return BARBERS.filter((b) => BARBER_PRICING[b.id] && BARBER_PRICING[b.id][serviceId]);
}
export function eligibleAddonIds(serviceId, barberId) {
  const svc = BASE_SERVICES.find((s) => s.id === serviceId);
  if (!svc) return [];
  return svc.addOns.filter((aid) => {
    const addon = ADDONS[aid];
    if (!barberId || barberId === "any") {
      return addon.barbers.some((bb) => BARBER_PRICING[bb] && BARBER_PRICING[bb][serviceId]);
    }
    return addon.barbers.includes(barberId);
  });
}
export function minPrice(serviceId) {
  const elig = eligibleBarbersForService(serviceId);
  if (!elig.length) return null;
  return Math.min(...elig.map((b) => BARBER_PRICING[b.id][serviceId][0]));
}
export function serviceName(id) {
  const s = BASE_SERVICES.find((x) => x.id === id);
  return s ? s.name : "";
}
export function groupServicesByCategory(categories) {
  return categories.map((c) => ({
    cat: c,
    label: CATEGORY_LABELS[c],
    items: SERVICES.filter((x) => x.cat === c),
  }));
}
