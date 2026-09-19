import { useState } from "react";
import { useNarrow } from "../lib/useMediaQuery.js";
import { useContent } from "../context/ContentContext.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import "./Contact.css";

export function Contact() {
  const narrow = useNarrow();
  const { faqs: FAQS, shop: SHOP } = useContent();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [toast, setToast] = useState(null);

  const disabled = !form.name.trim() || !form.message.trim() || status === "sending";

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
      showToast("Thanks — we'll get back to you.");
    } catch {
      setStatus("error");
      showToast(`Couldn't send that — please call or email us on ${SHOP.phoneDisplay} instead.`);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <main>
      <section className="hh-inverse" style={{ background: "#000", padding: `clamp(48px,8vw,96px) 0 clamp(40px,6vw,64px)` }}>
        <div className="hh-container">
          <h1 style={{ fontSize: narrow ? "clamp(40px,12vw,56px)" : "clamp(52px,10vw,120px)", color: "#fff" }}>Contact &amp; FAQ</h1>
        </div>
      </section>

      <section style={{ background: "var(--hh-bone-050)", padding: "clamp(40px,6vw,64px) 0" }}>
        <div className="hh-container" style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "minmax(0,1fr) minmax(0,1.2fr)", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>
          <div>
            <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={`tel:${SHOP.phoneHref}`} style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 16, letterSpacing: ".02em", color: "var(--hh-black)" }}>{SHOP.phoneDisplay}</a>
              <a href={`mailto:${SHOP.email}`} style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: ".02em", color: "var(--hh-black)" }}>{SHOP.email}</a>
              <span style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.5 }}>{SHOP.addressSingleLine}</span>
            </div>

            <div style={{ marginTop: 32, display: "flex", flexDirection: "column" }}>
              {FAQS.map((f) => (
                <div key={f.q} style={{ borderTop: "1px solid var(--border-hairline)", padding: "16px 0" }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".02em", textTransform: "uppercase", color: "var(--hh-black)" }}>{f.q}</div>
                  <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--text-body)" }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <span className="hh-eyebrow">Send a message</span>
            <Input className="hh-input" label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input className="hh-input" label="Email (optional)" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <Input className="hh-input" label="Message" placeholder="How can we help?" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
            <Button full disabled={disabled} onClick={submit}>{status === "sending" ? "Sending…" : "Send"}</Button>
          </div>
        </div>
      </section>

      {toast && (
        <div className="hh-inverse hh-toast" role="status">
          {toast}
        </div>
      )}
    </main>
  );
}
