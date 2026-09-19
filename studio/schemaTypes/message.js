import { defineField, defineType } from "sanity";

// Contact-form submissions land here (written server-side by
// functions/api/contact.js using a write token — never from the browser).
// Editors read/triage these in the Studio; there's no public read access.
export default defineType({
  name: "message",
  title: "Contact message",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({ name: "receivedAt", title: "Received at", type: "datetime" }),
    defineField({ name: "handled", title: "Handled", type: "boolean", initialValue: false }),
  ],
  orderings: [
    { title: "Newest first", name: "receivedAtDesc", by: [{ field: "receivedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "message" },
  },
});
