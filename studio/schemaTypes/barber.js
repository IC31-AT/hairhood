import { defineField, defineType } from "sanity";

export default defineType({
  name: "barber",
  title: "Barber",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", description: "e.g. Owner · Senior Barber" }),
    defineField({ name: "signature", title: "Signature text", type: "string", description: "Script overlay on their photo card — usually just their first name" }),
    defineField({ name: "note", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first",
    }),
    defineField({
      name: "squareTeamMemberId",
      title: "Square team member ID",
      type: "string",
      description: "From GET /api/square/team-members once Square is connected. Leave blank until then — the barber just won't be bookable yet.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
