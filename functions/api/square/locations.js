// GET /api/square/locations — list Square locations on this account.
// Setup helper: use this to find the Location ID to put in SQUARE_LOCATION_ID.
// Not linked from the site UI.
import { squareFetch, jsonResponse, errorResponse } from "../../_shared/square.js";

export async function onRequestGet({ env }) {
  try {
    const data = await squareFetch(env, "/v2/locations");
    return jsonResponse(data.locations || []);
  } catch (err) {
    return errorResponse(err);
  }
}
