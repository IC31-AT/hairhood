// GET /api/square/team-members — list bookable staff.
// Setup helper: use the returned team_member_id to fill in each Sanity
// `barber` document's `squareTeamMemberId` field. Not linked from the site UI.
import { squareFetch, jsonResponse, errorResponse } from "../../_shared/square.js";

export async function onRequestGet({ env }) {
  try {
    const qs = new URLSearchParams({ bookable_only: "true", location_id: env.SQUARE_LOCATION_ID || "" });
    const data = await squareFetch(env, `/v2/bookings/team-member-booking-profiles?${qs}`);
    const profiles = (data.team_member_booking_profiles || []).map((p) => ({
      teamMemberId: p.team_member_id,
      displayName: p.display_name,
      isBookable: p.is_bookable,
    }));
    return jsonResponse(profiles);
  } catch (err) {
    return errorResponse(err);
  }
}
