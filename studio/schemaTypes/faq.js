import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: {
    select: { title: "question" },
  },
});
