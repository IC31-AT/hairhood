// POST /api/contact — writes a `message` document into Sanity so the shop
// owner can read/triage it in the Studio. Needs SANITY_PROJECT_ID,
// SANITY_DATASET and a write-capable SANITY_WRITE_TOKEN (Studio → API →
// Tokens → "Editor" permission) set as env/secrets. Falls back to a 501 with
// a clear message if those aren't configured yet, same pattern as Square.
import { jsonResponse } from "../_shared/square.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(body?.name || "").trim();
  const message = String(body?.message || "").trim();
  const email = String(body?.email || "").trim();
  if (!name || !message) {
    return jsonResponse({ error: "name and message are required" }, { status: 400 });
  }

  if (!env.SANITY_PROJECT_ID || !env.SANITY_WRITE_TOKEN) {
    return jsonResponse({ error: "The contact form isn't fully configured on the server yet." }, { status: 501 });
  }

  const dataset = env.SANITY_DATASET || "production";
  const res = await fetch(`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mutations: [
        {
          create: {
            _type: "message",
            name,
            email: email || undefined,
            message,
            receivedAt: new Date().toISOString(),
            handled: false,
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return jsonResponse({ error: "Could not save your message. Please try phoning or emailing instead.", detail }, { status: 502 });
  }

  return jsonResponse({ ok: true });
}
