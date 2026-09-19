import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";

export function NotFound() {
  return (
    <main className="hh-inverse" style={{ background: "#000", minHeight: "60dvh", display: "flex", alignItems: "center" }}>
      <div className="hh-container">
        <span className="hh-eyebrow" style={{ color: "var(--hh-ink-300)" }}>404</span>
        <h1 style={{ marginTop: 16, fontSize: "clamp(48px,10vw,96px)", color: "#fff" }}>Wrong door</h1>
        <p style={{ marginTop: 16, fontSize: 16, color: "rgba(255,255,255,.64)" }}>That page isn't in this shop. The door is black, this one wasn't it.</p>
        <div style={{ marginTop: 28 }}>
          <Link to="/" style={{ border: "none" }}><Button>Back to the shop</Button></Link>
        </div>
      </div>
    </main>
  );
}
