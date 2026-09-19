import { defineField, defineType } from "sanity";

export default defineType({
  name: "addon",
  title: "Add-on",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "priceDisplay", title: "Price (display text)", type: "string", description: "e.g. \"+£8\"" }),
    defineField({
      name: "applicableServices",
      title: "Available on these services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "squareServiceVariationId",
      title: "Square service variation ID",
      type: "string",
      description: "Add-ons are their own bookable catalog item in Square (an appointment segment). From GET /api/square/catalog.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "priceDisplay" },
  },
});
