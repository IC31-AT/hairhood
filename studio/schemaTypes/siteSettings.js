import { defineField, defineType } from "sanity";

// Singleton — shop identity, contact details and opening hours. The Studio
// desk structure (see structure.js) pins this to one editable document
// instead of letting editors create multiple "site settings".
export default defineType({
  name: "siteSettings",
  title: "Shop settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Shop name", type: "string", initialValue: "Hair Hood" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", initialValue: "Welcome to my hood" }),
    defineField({ name: "phoneDisplay", title: "Phone (display)", type: "string", description: "e.g. 07307 453917" }),
    defineField({ name: "phoneHref", title: "Phone (tel: link)", type: "string", description: "E.164, e.g. +447307453917" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "addressLines",
      title: "Address lines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "postcode", title: "Postcode", type: "string" }),
    defineField({ name: "mapsQuery", title: "Google Maps query", type: "string", description: "URL-encoded address used for the embed & directions link" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "instagramHandle", title: "Instagram handle", type: "string" }),
    defineField({ name: "whatsappUrl", title: "WhatsApp URL", type: "url" }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      of: [
        {
          type: "object",
          name: "hoursRow",
          fields: [
            { name: "day", title: "Day", type: "string" },
            { name: "openTime", title: "Opens (24h, HH:MM)", type: "string" },
            { name: "closeTime", title: "Closes (24h, HH:MM)", type: "string" },
            { name: "closed", title: "Closed all day", type: "boolean", initialValue: false },
          ],
          preview: {
            select: { day: "day", openTime: "openTime", closeTime: "closeTime", closed: "closed" },
            prepare({ day, openTime, closeTime, closed }) {
              return { title: day, subtitle: closed ? "Closed" : `${openTime} – ${closeTime}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Shop settings" };
    },
  },
});
