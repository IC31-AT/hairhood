// POST /api/square/availability
// body: { startAt: ISO string, endAt: ISO string, segments: [{ serviceVariationId, teamMemberId? }] }
// segments mirrors a booking's appointment_segments — one entry for the main
// service, plus one more per add-on. Omit teamMemberId on a segment (or pass
// "any") to let Square return slots across every eligible team member.
//
// Returns: [{ startAt, locationId, segments: [{ teamMemberId, serviceVariationId, serviceVariationVersion, durationMinutes }] }]
import { squareFetch, jsonResponse, errorResponse } from "../../_shared/square.js";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { startAt, endAt, segments } = body || {};
    if (!startAt || !endAt || !Array.isArray(segments) || segments.length === 0) {
      return jsonResponse({ error: "startAt, endAt and at least one segment are required" }, { status: 400 });
    }

    const segmentFilters = segments.map((s) => {
      const f = { service_variation_id: s.serviceVariationId };
      if (s.teamMemberId && s.teamMemberId !== "any") f.team_member_id_filter = { any: [s.teamMemberId] };
      return f;
    });

    const data = await squareFetch(env, "/v2/bookings/availability/search", {
      method: "POST",
      body: {
        query: {
          filter: {
            start_at_range: { start_at: startAt, end_at: endAt },
            location_id: env.SQUARE_LOCATION_ID,
            segment_filters: segmentFilters,
          },
        },
      },
    });

    const availabilities = (data.availabilities || []).map((a) => ({
      startAt: a.start_at,
      locationId: a.location_id,
      segments: (a.appointment_segments || []).map((seg) => ({
        teamMemberId: seg.team_member_id,
        serviceVariationId: seg.service_variation_id,
        serviceVariationVersion: seg.service_variation_version,
        durationMinutes: seg.duration_minutes,
      })),
    }));

    return jsonResponse(availabilities);
  } catch (err) {
    return errorResponse(err);
  }
}
