import { ArrowRight } from "lucide-react";
import { HERO_IMAGE } from "../data/sareeImages";

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "85vh",
      background: "#1a1a1a",
      color: "#f5e6c8",
      display: "flex", alignItems: "center",
      overflow: "hidden",
    }}>
      <img
        src={HERO_IMAGE}
        alt="Saree model"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: 0.55,
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(15,5,10,0.95) 0%, rgba(15,5,10,0.6) 45%, rgba(15,5,10,0.15) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1400, margin: "0 auto", width: "100%",
        padding: "60px 40px 180px",
      }}>
        <div style={{ maxWidth: 620 }}>
          <p style={{
            fontSize: 10, letterSpacing: 4, marginBottom: 26,
            textTransform: "uppercase", color: "#e8b96a",
          }}>
            The Festive Edit · 2026
          </p>
          <h2 className="serif" style={{
            fontSize: "clamp(48px, 7vw, 86px)",
            lineHeight: 1, marginBottom: 28,
          }}>
            Where heritage<br />
            <span className="italic" style={{ color: "#e8b96a" }}>meets elegance.</span>
          </h2>
          <p style={{
            fontSize: 15, lineHeight: 1.8, marginBottom: 40,
            opacity: 0.85, maxWidth: 480,
          }}>
            Curated Indian sarees woven with stories, craftsmanship and timeless beauty.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#shop" style={{
              background: "#5c0a1e", color: "#f5e6c8",
              padding: "15px 34px", fontSize: 10, letterSpacing: 2.5,
              textTransform: "uppercase", display: "inline-flex",
              alignItems: "center", gap: 12,
              border: "1px solid #5c0a1e",
            }}>
              Shop the Collection <ArrowRight size={13} />
            </a>
            <a href="#collections" style={{
              border: "1px solid #e8b96a", color: "#f5e6c8",
              padding: "15px 34px", fontSize: 10, letterSpacing: 2.5,
              textTransform: "uppercase",
            }}>
              Explore Edits
            </a>
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(10,10,10,0.92)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        borderTop: "1px solid #262626",
      }}>
        {[
          { t: "Curated Craft", s: "Authentic collections" },
          { t: "Free Shipping", s: "Orders above ₹1,999" },
          { t: "Secure Checkout", s: "Protected payments" },
          { t: "Personal Support", s: "Here when you need us" },
        ].map((f, i) => (
          <div key={i} style={{
            padding: "20px 24px",
            borderRight: i < 3 ? "1px solid #262626" : "none",
          }}>
            <p style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#e8b96a", marginBottom: 5 }}>
              {f.t}
            </p>
            <p style={{ fontSize: 11, opacity: 0.55 }}>{f.s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}