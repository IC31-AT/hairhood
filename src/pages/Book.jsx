import { Link } from "react-router-dom";
import { useBooking } from "../booking/BookingContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { useNarrow } from "../lib/useMediaQuery.js";
import { Button } from "../components/ui/Button.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { Input } from "../components/ui/Input.jsx";
import { ServiceRow } from "../components/shop/ServiceRow.jsx";
import { TimeSlotGrid } from "../components/shop/TimeSlotGrid.jsx";

const STEP_LABELS = ["Barber", "Service", "Add-ons", "Time", "Details", "Review"];

export function Book() {
  const book = useBooking();
  const { shop: SHOP } = useContent();
  const narrow = useNarrow();

  return (
    <main style={{ background: "var(--hh-bone-050)", minHeight: "70dvh" }}>
      <section className="hh-inverse" style={{ background: "#000", padding: "24px 0" }}>
        <div className="hh-container-narrow">
          <a href="#" onClick={(e) => { e.preventDefault(); book.back(); }} style={{ border: "none", fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--hh-ink-300)" }}>
            ← Back
          </a>
          <h1 style={{ margin: "14px 0 0", fontSize: narrow ? "clamp(32px,10vw,44px)" : "clamp(40px,7vw,64px)", color: "#fff" }}>{book.stepTitle}</h1>
          {!book.atDone && !book.atDeclined && (
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: `repeat(${STEP_LABELS.length},1fr)`, gap: 6 }}>
              {STEP_LABELS.map((label) => (
                <div key={label} style={{ paddingTop: 10 }}>
                  <i style={{ display: "block", height: 3, background: "var(--hh-ink-700)" }} />
                  <span style={{ display: "block", marginTop: 8, fontFamily: "var(--font-ui)", fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--hh-ink-400)" }}>{label}</span>
                </div>
              ))}
            </div>
          )}
          {!book.atDone && !book.atDeclined && (
            <div style={{ marginTop: 8, height: 3, background: "var(--hh-brass-500)", width: book.progress, transition: "width .22s var(--ease-standard)" }} />
          )}
        </div>
      </section>

      <section style={{ padding: "32px 0 64px" }}>
        <div className="hh-container-narrow">
          {book.atBarber && <BarberStep book={book} />}
          {book.atService && <ServiceStep book={book} />}
          {book.atAddons && <AddonsStep book={book} />}
          {book.atTime && <TimeStep book={book} narrow={narrow} />}
          {book.atDetails && <DetailsStep book={book} />}
          {book.atReview && <ReviewStep book={book} />}
          {book.atDone && <DoneStep book={book} />}
          {book.atDeclined && <DeclinedStep book={book} />}

          {book.showNav && (
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <Button size="lg" disabled={book.nextDisabled} onClick={book.next}>{book.nextLabel}</Button>
              {book.atAddons && (
                <Button size="lg" variant="ghost" onClick={book.skipAddons}>Skip</Button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function BarberStep({ book }) {
  const { barbers } = useContent();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12 }}>
      {book.hasAnyOption && (
        <button onClick={() => book.pickBarber("any")} style={pickTileStyle(book.barberId === "any")}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--hh-bone-050)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--text-muted)" }}>Any</div>
          <span style={pickTileLabelStyle}>Any barber</span>
        </button>
      )}
      {book.barberChoices.map((b) => {
        const full = barbers.find((x) => x.id === b.id);
        return (
          <button key={b.id} onClick={() => book.pickBarber(b.id)} style={pickTileStyle(book.barberId === b.id)}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", background: "var(--hh-ink-600)" }}>
              {full?.photo && <img src={full.photo} alt={b.name} className="hh-photo" style={{ objectPosition: "50% 20%" }} />}
            </div>
            <span style={pickTileLabelStyle}>{b.name}</span>
          </button>
        );
      })}
    </div>
  );
}
const pickTileStyle = (active) => ({
  cursor: "pointer",
  border: "2px solid " + (active ? "var(--hh-black)" : "transparent"),
  background: "var(--surface-card)",
  boxShadow: active ? "none" : "inset 0 0 0 1px var(--border-hairline)",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
});
const pickTileLabelStyle = { fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".02em" };

function ServiceStep({ book }) {
  return (
    <div>
      {book.serviceChoices.map((s) => (
        <ServiceRow key={s.id} name={s.name} duration={s.duration} price={s.price} selected={book.serviceId === s.id} onSelect={() => book.pickService(s.id)} />
      ))}
    </div>
  );
}

function AddonsStep({ book }) {
  return (
    <div>
      <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--text-muted)" }}>Optional — skip if you don't need them.</p>
      {book.addonChoices.map((a) => (
        <div key={a.id} onClick={() => book.toggleAddon(a.id)} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderTop: "1px solid var(--border-hairline)", padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 20, height: 20, border: "1.5px solid var(--hh-black)", background: a.selected ? "var(--hh-black)" : "transparent", flexShrink: 0 }} />
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: ".02em", textTransform: "uppercase" }}>{a.name}</div>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 14 }}>{a.price}</div>
        </div>
      ))}
      <div style={{ marginTop: 20, borderTop: "2px solid var(--hh-black)", paddingTop: 12, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".02em", textTransform: "uppercase" }}>
        <span>Running total</span>
        <span>{book.runningTotal}</span>
      </div>
    </div>
  );
}

function TimeStep({ book, narrow }) {
  return (
    <div>
      <span className="hh-eyebrow">Pick a day</span>
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {book.days.map((d) => (
          <Tag key={d.i} selected={d.on} onClick={() => book.setDay(d.i)}>{d.label}</Tag>
        ))}
      </div>
      <div style={{ marginTop: 28, borderTop: "2px solid var(--hh-black)", paddingTop: 16 }}>
        <span className="hh-eyebrow">Pick a time</span>
        {book.hasSlots ? (
          <TimeSlotGrid slots={book.slots} value={book.time} onChange={book.setTime} columns={narrow ? 3 : 6} style={{ marginTop: 16 }} />
        ) : (
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--text-muted)" }}>Nothing left on this day. Try tomorrow.</p>
        )}
      </div>
    </div>
  );
}

function DetailsStep({ book }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
      <Input className="hh-input" label="Name" placeholder="Your name" value={book.name} onChange={(e) => book.setField("name", e.target.value)} />
      <Input className="hh-input" label="Mobile" type="tel" inputMode="tel" placeholder="07…" hint="We'll text you the day before." value={book.phone} onChange={(e) => book.setField("phone", e.target.value)} />
      <Input className="hh-input" label="Email (optional)" type="email" placeholder="you@email.com" value={book.email} onChange={(e) => book.setField("email", e.target.value)} />
    </div>
  );
}

function ReviewStep({ book }) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SummaryRow label="Barber" value={book.summaryBarber} border />
        <SummaryRow label="Service" value={book.summaryService} />
        {book.hasAddonsSummary && <SummaryRow label="Add-ons" value={book.summaryAddons} />}
        <SummaryRow label="When" value={book.summaryWhen} />
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--hh-black)", paddingTop: 12, marginTop: 6 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: ".02em", textTransform: "uppercase" }}>Total (in-shop)</span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 20 }}>{book.summaryTotal}</span>
        </div>
        <p style={{ marginTop: 4, fontSize: 12, color: "var(--text-muted)" }}>Payment is taken in the shop. This just holds your chair.</p>
      </div>

      {book.timeConflict && (
        <div style={{ marginTop: 24, borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".02em", textTransform: "uppercase" }}>That time just got taken</div>
          <p style={{ marginTop: 8, fontSize: 13, color: "var(--text-muted)" }}>Nearest times still open:</p>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {book.altTimesResolved.map((t) => (
              <Tag key={t} onClick={() => book.setTime(t)}>{t}</Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function SummaryRow({ label, value, border }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, borderTop: border ? "2px solid var(--hh-black)" : undefined, paddingTop: border ? 12 : undefined }}>
      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, textTransform: "uppercase", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function DoneStep({ book }) {
  return (
    <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 24 }}>
      <div className="hh-motto" style={{ fontSize: "clamp(30px,8vw,40px)", lineHeight: 1.05, color: "var(--hh-black)" }}>{SHOP.tagline}</div>
      <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.5, color: "var(--text-body)" }}>
        {book.summaryWhen} with {book.summaryBarber}. We'll text you the day before. {SHOP.addressLines[0]} — the door is black.
      </p>
      <div style={{ marginTop: 16, fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".02em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        Reference <span style={{ color: "var(--hh-black)" }}>{book.ref}</span>
      </div>
      <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Link to="/" style={{ border: "none" }}><Button>Back to the shop</Button></Link>
        <Button variant="secondary" onClick={book.restart}>Book another</Button>
      </div>
    </div>
  );
}

function DeclinedStep({ book }) {
  return (
    <div>
      <div style={{ borderTop: "2px solid var(--hh-black)", paddingTop: 14 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: ".02em", textTransform: "uppercase" }}>Unable to complete this booking online</div>
        <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, color: "var(--text-body)" }}>Please call the shop to finish booking your chair.</p>
      </div>
      <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button onClick={book.callShop}>Call the shop</Button>
        <Link to="/" style={{ border: "none" }}><Button variant="secondary">Back to the shop</Button></Link>
      </div>
    </div>
  );
}
