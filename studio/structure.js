// Desk structure: pins "Shop settings" to a single editable document
// (there should only ever be one) and lists everything else normally.
export const structure = (S) =>
  S.list()
    .title("Hair Hood content")
    .items([
      S.listItem()
        .title("Shop settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);
