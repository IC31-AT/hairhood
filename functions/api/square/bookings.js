// POST /api/square/bookings
// body: {
//   startAt: ISO string,
//   segments: [{ serviceVariationId, serviceVariationVersion, teamMemberId, durationMinutes }],
//   customer: { name, phone, email? },
//   idempotencyKey: string  — client-generated (crypto.randomUUID()); Square
//                             dedupes retries of the same booking on this.
// }
// Finds-or-creates the Square customer by phone, then creates the booking.
import { squareFetch, jsonResponse, errorResponse } from "../../_shared/square.js";

function toE164UK(raw) {
  const digits = String(raw || "").replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return "+44" + digits.slice(1);
  return digits;
}

async function findOrCreateCustomer(env, { name, phone, email }) {
  const phoneNumber = toE164UK(phone);
  const search = await squareFetch(env, "/v2/customers/search", {
    method: "POST",
    body: { query: { filter: { phone_number: { exact: phoneNumber } } }, limit: 1 },
  });
  if (search.customers?.[0]?.id) return search.customers[0].id;

  const [givenName, ...rest] = String(name || "").trim().split(/\s+/);
  const created = await squareFetch(env, "/v2/customers", {
    method: "POST",
    body: {
      given_name: givenName || undefined,
      family_name: rest.join(" ") || undefined,
      phone_number: phoneNumber || undefined,
      email_address: email || undefined,
    },
  });
  return created.customer.id;
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { startAt, segments, customer, idempotencyKey } = body || {};
    if (!startAt || !Array.isArray(segments) || segments.length === 0 || !customer?.phone) {
      return jsonResponse({ error: "startAt, segments and customer.phone are required" }, { status: 400 });
    }

    const customerId = await findOrCreateCustomer(env, customer);

    const data = await squareFetch(env, "/v2/bookings", {
      method: "POST",
      body: {
        idempotency_key: idempotencyKey || crypto.randomUUID(),
        booking: {
          location_id: env.SQUARE_LOCATION_ID,
          customer_id: customerId,
          start_at: startAt,
          customer_note: customer.note || undefined,
          appointment_segments: segments.map((s) => ({
            team_member_id: s.teamMemberId,
            service_variation_id: s.serviceVariationId,
            service_variation_version: s.serviceVariationVersion,
            duration_minutes: s.durationMinutes,
          })),
        },
      },
    });

    const b = data.booking;
    return jsonResponse({
      bookingId: b.id,
      status: b.status,
      startAt: b.start_at,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
