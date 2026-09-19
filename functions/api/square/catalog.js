// GET /api/square/catalog — list bookable services (catalog items whose
// product_type is APPOINTMENTS_SERVICE) with their variations flattened.
// Setup helper: use the returned variation ids to fill in each Sanity
// `service` document's `squareServiceVariationId` field. Not linked from the
// site UI.
import { squareFetch, jsonResponse, errorResponse } from "../../_shared/square.js";

export async function onRequestGet({ env }) {
  try {
    const services = [];
    let cursor;
    do {
      const qs = new URLSearchParams({ types: "ITEM" });
      if (cursor) qs.set("cursor", cursor);
      const data = await squareFetch(env, `/v2/catalog/list?${qs}`);
      for (const obj of data.objects || []) {
        if (obj.type !== "ITEM" || obj.item_data?.product_type !== "APPOINTMENTS_SERVICE") continue;
        for (const v of obj.item_data.variations || []) {
          const vd = v.item_variation_data || {};
          services.push({
            itemId: obj.id,
            itemName: obj.item_data.name,
            variationId: v.id,
            variationVersion: v.version,
            variationName: vd.name,
            priceAmount: vd.price_money?.amount ?? null,
            priceCurrency: vd.price_money?.currency ?? null,
            durationMinutes: vd.service_duration ? Math.round(Number(vd.service_duration) / 60000) : null,
            teamMemberIds: vd.team_member_ids || [],
          });
        }
      }
      cursor = data.cursor;
    } while (cursor);

    return jsonResponse(services);
  } catch (err) {
    return errorResponse(err);
  }
}
