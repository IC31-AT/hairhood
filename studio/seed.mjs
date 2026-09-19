// One-off seed script — pushes the current placeholder content (from the
// site's src/data/shop.js, ported by hand below) into Sanity so the Studio
// isn't empty and the live content pipeline can be verified end-to-end.
// Run once: SANITY_AUTH_TOKEN=... node seed.mjs
// Safe to re-run — every document has a fixed _id and uses createOrReplace.
import { readFileSync } from "node:fs";

const PROJECT_ID = "ep0gakki";
const DATASET = "production";
const TOKEN = process.env.SANITY_AUTH_TOKEN;
if (!TOKEN) throw new Error("Set SANITY_AUTH_TOKEN");

const API = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01`;

async function mutate(mutations) {
  const res = await fetch(`${API}/data/mutate/${DATASET}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(`Mutate failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function uploadImage(path) {
  const bytes = readFileSync(path);
  const res = await fetch(`${API}/assets/images/${DATASET}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/octet-stream" },
    body: bytes,
  });
  if (!res.ok) throw new Error(`Asset upload failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.document._id;
}

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  name: "Hair Hood",
  tagline: "Welcome to my hood",
  phoneDisplay: "07307 453917",
  phoneHref: "+447307453917",
  email: "amir@hairhood.co.uk",
  addressLines: ["91B Whiteladies Road", "Clifton, Bristol", "BS8 2NT"],
  postcode: "BS8 2NT",
  mapsQuery: "91B+Whiteladies+Road,+Bristol,+BS8+2NT",
  instagramUrl: "https://instagram.com",
  instagramHandle: "@hairhood_",
  whatsappUrl: "https://wa.me/447307453917",
  hours: [
    { _key: "mon", day: "Monday", openTime: "10:00", closeTime: "18:00", closed: false },
    { _key: "tue", day: "Tuesday", openTime: "09:00", closeTime: "19:00", closed: false },
    { _key: "wed", day: "Wednesday", openTime: "09:00", closeTime: "19:00", closed: false },
    { _key: "thu", day: "Thursday", openTime: "09:00", closeTime: "19:00", closed: false },
    { _key: "fri", day: "Friday", openTime: "09:00", closeTime: "19:00", closed: false },
    { _key: "sat", day: "Saturday", openTime: "09:00", closeTime: "17:00", closed: false },
    { _key: "sun", day: "Sunday", openTime: "", closeTime: "", closed: true },
  ],
};

const barbers = [
  { id: "barber-amir", name: "Amir", role: "Owner · Senior Barber", signature: "Amir", note: "Skin fades and cutthroat work. Runs the shop and the bar behind it.", squareTeamMemberId: "", order: 1 },
  { id: "barber-alex", name: "Alex", role: "Barber", signature: "Alex", note: "Scissor work, longer hair, textured crops.", squareTeamMemberId: "", order: 2 },
  { id: "barber-arthur", name: "Arthur", role: "Barber", signature: "Arthur", note: "Classic cuts, tapers and beard shaping.", squareTeamMemberId: "", order: 3 },
  { id: "barber-hamid", name: "Hamid", role: "Junior Barber", signature: "Hamid", note: "Fades taken clean to the skin. Fast, never rushed.", squareTeamMemberId: "", order: 4 },
  { id: "barber-saahil", name: "Saahil", role: "Apprentice Barber", signature: "Saahil", note: "Crops, tapers and hot towel shaves.", squareTeamMemberId: "", order: 5 },
];

const services = [
  { id: "svc-haircut", name: "Haircut", category: "cuts", durationDisplay: "20–30 min", priceDisplay: "£22", bookingKey: "haircut", featured: true, order: 1 },
  { id: "svc-skinfade", name: "Skin fade", category: "cuts", durationDisplay: "40–50 min", priceDisplay: "£27", bookingKey: "skinfade", featured: true, order: 2 },
  { id: "svc-taperfade", name: "Taper fade", category: "cuts", durationDisplay: "30–40 min", priceDisplay: "£24", bookingKey: "taper", featured: true, order: 3 },
  { id: "svc-scissorcut", name: "Scissor cut", category: "cuts", durationDisplay: "25–35 min", priceDisplay: "£23", bookingKey: "scissor", order: 4 },
  { id: "svc-crewcut", name: "Crew cut", category: "cuts", durationDisplay: "15–25 min", priceDisplay: "£15", bookingKey: "haircut", order: 5 },
  { id: "svc-longhair", name: "Long hair", category: "cuts", durationDisplay: "45–55 min", priceDisplay: "£29", bookingKey: "haircut", order: 6 },
  { id: "svc-haircutbeard", name: "Haircut & beard trim", category: "beards", durationDisplay: "35–45 min", priceDisplay: "£30", bookingKey: "haircut", featured: true, order: 1 },
  { id: "svc-skinfadebeard", name: "Skin fade & beard trim", category: "beards", durationDisplay: "50–60 min", priceDisplay: "£35", bookingKey: "skinfade", order: 2 },
  { id: "svc-taperbeardcutthroat", name: "Taper fade & beard trim, cutthroat", category: "beards", durationDisplay: "45 min", priceDisplay: "£32", bookingKey: "taper", order: 3 },
  { id: "svc-crewbeard", name: "Crew cut & beard trim", category: "beards", durationDisplay: "25–35 min", priceDisplay: "£25", bookingKey: "haircut", order: 4 },
  { id: "svc-beardtrim", name: "Beard trim", category: "beards", durationDisplay: "15–25 min", priceDisplay: "£15", bookingKey: "beard", order: 5 },
  { id: "svc-haircuthottowel", name: "Haircut & hot towel shave", category: "shaves", durationDisplay: "45–55 min", priceDisplay: "£35", bookingKey: "hottowel", order: 1 },
  { id: "svc-skinfadehottowel", name: "Skin fade & hot towel shave", category: "shaves", durationDisplay: "1 hr – 1 hr 15", priceDisplay: "£40", bookingKey: "hottowel", order: 2 },
  { id: "svc-taperhottowel", name: "Taper fade & hot towel shave", category: "shaves", durationDisplay: "50 min", priceDisplay: "£37", bookingKey: "hottowel", order: 3 },
  { id: "svc-facehottowel", name: "Hot towel face shave", category: "shaves", durationDisplay: "40 min", priceDisplay: "£25", bookingKey: "hottowel", featured: true, order: 4 },
  { id: "svc-headhottowel", name: "Hot towel head shave", category: "shaves", durationDisplay: "40 min", priceDisplay: "£25", bookingKey: "hottowel", order: 5 },
  { id: "svc-headfacehottowel", name: "Hot towel head & face shave", category: "shaves", durationDisplay: "1 hr 20 min", priceDisplay: "£45", bookingKey: "hottowel", order: 6 },
  { id: "svc-studenthaircut", name: "Student haircut", category: "students", durationDisplay: "20–30 min", priceDisplay: "£20", bookingKey: "haircut", featured: true, order: 1 },
  { id: "svc-studentskinfade", name: "Student skin fade", category: "students", durationDisplay: "40–50 min", priceDisplay: "£25", bookingKey: "skinfade", order: 2 },
  { id: "svc-studenttaperfade", name: "Student taper fade", category: "students", durationDisplay: "30–40 min", priceDisplay: "£22", bookingKey: "taper", order: 3 },
  { id: "svc-facial", name: "Full facial, hot towel & mask", category: "extras", durationDisplay: "20–30 min", priceDisplay: "£20", bookingKey: "hottowel", order: 1 },
];

const addons = [
  { id: "addon-beardline", name: "Beard line-up", priceDisplay: "+£8", applicableServiceIds: ["svc-haircut", "svc-skinfade", "svc-taperfade", "svc-scissorcut"] },
  { id: "addon-hottowelfinish", name: "Hot towel finish", priceDisplay: "+£6", applicableServiceIds: ["svc-haircut", "svc-skinfade", "svc-taperfade"] },
];

const reviews = [
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

const faqs = [
  { q: "Do you take walk-ins?", a: "Welcome when a chair is free. Friday and Saturday, book ahead." },
  { q: "Do you offer a student price?", a: "Yes — reduced prices on cuts, fades and tapers. Bring your card." },
  { q: "How do I pay?", a: "Card and cash. Booking deposits are taken through Square." },
  { q: "Do I need to book?", a: "Booking is safer, especially at weekends, but walk-ins are always welcome when there's a free chair." },
];

async function main() {
  console.log("Uploading Amir's photo...");
  const amirImageAssetId = await uploadImage(new URL("../public/images/amir-portrait.jpg", import.meta.url));

  const mutations = [{ createOrReplace: siteSettings }];

  barbers.forEach((b, i) => {
    mutations.push({
      createOrReplace: {
        _id: b.id,
        _type: "barber",
        name: b.name,
        role: b.role,
        signature: b.signature,
        note: b.note,
        order: b.order,
        squareTeamMemberId: b.squareTeamMemberId,
        ...(i === 0 ? { photo: { _type: "image", asset: { _type: "reference", _ref: amirImageAssetId } } } : {}),
      },
    });
  });

  services.forEach((s) => {
    mutations.push({
      createOrReplace: {
        _id: s.id,
        _type: "service",
        name: s.name,
        category: s.category,
        durationDisplay: s.durationDisplay,
        priceDisplay: s.priceDisplay,
        bookingKey: s.bookingKey,
        featured: !!s.featured,
        order: s.order,
      },
    });
  });

  addons.forEach((a) => {
    mutations.push({
      createOrReplace: {
        _id: a.id,
        _type: "addon",
        name: a.name,
        priceDisplay: a.priceDisplay,
        applicableServices: a.applicableServiceIds.map((ref, i) => ({ _key: `ref${i}`, _type: "reference", _ref: ref })),
      },
    });
  });

  reviews.forEach((r, i) => {
    mutations.push({
      createOrReplace: { _id: `review-${i + 1}`, _type: "review", quote: r.quote, who: r.who, order: i + 1 },
    });
  });

  faqs.forEach((f, i) => {
    mutations.push({
      createOrReplace: { _id: `faq-${i + 1}`, _type: "faq", question: f.q, answer: f.a, order: i + 1 },
    });
  });

  console.log(`Writing ${mutations.length} documents...`);
  await mutate(mutations);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
