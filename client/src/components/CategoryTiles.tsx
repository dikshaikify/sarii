import { ArrowRight } from "lucide-react";
import { CATEGORY_IMAGES } from "../data/sareeImages";

type Props = { onSelect: (category: string) => void };

const TILES = ["Banarasi", "Kanjivaram", "Organza", "Handloom"];

export default function CategoryTiles({ onSelect }: Props) {
  return (
    <section id="collections" style={{ padding: "90px 40px", background: "#0f0f0f", color: "#f5e6c8" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 50,
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: 4, marginBottom: 18, textTransform: "uppercase", opacity: 0.7 }}>
              Shop by Category
            </p>
            <h3 className="serif" style={{ fontSize: "clamp(36px, 5vw, 54px)", lineHeight: 1.1 }}>
              Find your <span className="italic" style={{ color: "#e8b96a" }}>signature drape.</span>
            </h3>
          </div>
          <a href="#shop" style={{
            fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            View All <ArrowRight size={13} />
          </a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}>
          {TILES.map(name => (
            <button
              key={name}
              onClick={() => onSelect(name)}
              style={{
                position: "relative", aspectRatio: "3/4",
                overflow: "hidden", textAlign: "left", padding: 0,
              }}
            >
              <img
                src={CATEGORY_IMAGES[name]}
                alt={name}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform .7s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: 26,
                color: "#f5e6c8",
              }}>
                <p style={{ fontSize: 9, letterSpacing: 3, marginBottom: 8, opacity: 0.85 }}>DISCOVER</p>
                <p className="serif" style={{ fontSize: 30 }}>{name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}