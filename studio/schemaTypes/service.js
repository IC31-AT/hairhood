import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "Cuts", value: "cuts" },
  { title: "Beards", value: "beards" },
  { title: "Hot towel shaves", value: "shaves" },
  { title: "Students", value: "students" },
  { title: "Extras", value: "extras" },
];

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORIES },
      validation: (r) => r.required(),
    }),
    defineField({ name: "durationDisplay", title: "Duration (display text)", type: "string", description: "e.g. \"40–50 min\" — shown on the price list; the real duration at booking time comes from Square." }),
    defineField({ name: "priceDisplay", title: "Price (display text)", type: "string", description: "e.g. \"£27\" or \"from £27\" — marketing copy, not what's actually charged." }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first within their category",
    }),
    defineField({
      name: "bookingKey",
      title: "Booking key",
      type: "string",
      description: "Which bookable service this is, for the simulated booking flow that runs until Square is fully connected: haircut, skinfade, taper, scissor, beard, or hottowel. Leave blank and it just won't be quick-bookable from this row yet.",
      options: {
        list: ["haircut", "skinfade", "taper", "scissor", "beard", "hottowel"],
      },
    }),
    defineField({
      name: "squareServiceVariationId",
      title: "Square service variation ID",
      type: "string",
      description: "From GET /api/square/catalog once Square is connected. Leave blank until then — the service just won't be bookable yet.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
