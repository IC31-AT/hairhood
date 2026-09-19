import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "who", title: "Attributed to", type: "string", description: "e.g. \"Adam T.\"" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: {
    select: { title: "who", subtitle: "quote" },
  },
});
