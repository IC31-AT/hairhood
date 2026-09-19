// ===========================================================================
// Thin fetch wrapper around Square's REST API (v2). No SDK — Square's Node
// SDK isn't guaranteed edge-runtime-safe, and these Functions only need a
// handful of endpoints, so plain `fetch` keeps this dependency-free and fast
// on Cloudflare's Workers runtime.
//
// Required env (set via `wrangler pages secret put`, or .dev.vars locally):
//   SQUARE_ACCESS_TOKEN   — secret. Sandbox or production token.
//   SQUARE_LOCATION_ID    — the shop's Square location id.
//   SQUARE_ENVIRONMENT    — "sandbox" | "production" (defaults to sandbox).
// ===========================================================================

const SQUARE_VERSION = "2026-09-16"; // Square-Version header; bump periodically per Square's changelog.

export class SquareConfigError extends Error {}

function baseUrl(env) {
  const mode = (env.SQUARE_ENVIRONMENT || "sandbox").toLowerCase();
  if (mode === "production") return "https://connect.squareup.com";
  return "https://connect.squareupsandbox.com";
}

export function assertSquareConfigured(env) {
  if (!env.SQUARE_ACCESS_TOKEN) throw new SquareConfigError("SQUARE_ACCESS_TOKEN is not set");
  if (!env.SQUARE_LOCATION_ID) throw new SquareConfigError("SQUARE_LOCATION_ID is not set");
}

/**
 * Calls a Square REST API endpoint. Throws SquareApiError (with Square's own
 * error payload attached) on a non-2xx response so callers can decide how to
 * surface it.
 */
export async function squareFetch(env, path, { method = "GET", body } = {}) {
  assertSquareConfigured(env);
  const res = await fetch(`${baseUrl(env)}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
      "Square-Version": SQUARE_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.errors?.[0]?.detail || `Square API error (${res.status})`);
    err.status = res.status;
    err.squareErrors = data?.errors || [];
    throw err;
  }
  return data;
}

export function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

export function errorResponse(err, fallbackStatus = 500) {
  const status = err instanceof SquareConfigError ? 501 : err.status || fallbackStatus;
  const message = err instanceof SquareConfigError
    ? "Booking isn't configured yet on the server (missing Square credentials)."
    : err.message || "Something went wrong talking to Square.";
  return jsonResponse({ error: message }, { status });
}
