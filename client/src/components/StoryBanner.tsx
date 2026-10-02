import { ArrowRight } from "lucide-react";
import { STORY_IMAGE } from "../data/sareeImages";

export default function StoryBanner() {
  return (
    <section id="story" style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
      background: "#2b0a12",
    }}>
      <div style={{ minHeight: 480, overflow: "hidden" }}>
        <img
          src={STORY_IMAGE}
          alt="Saree craftsmanship"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{
        padding: "80px 60px", color: "#f5e6c8",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <p style={{ fontSize: 10, letterSpacing: 4, marginBottom: 24, textTransform: "uppercase", opacity: 0.75 }}>
          The Sāri Philosophy
        </p>
        <h3 className="serif" style={{
          fontSize: "clamp(36px, 5vw, 52px)",
          lineHeight: 1.15, marginBottom: 26,
        }}>
          Made for moments<br />
          <span className="italic" style={{ color: "#e8b96a" }}>worth remembering.</span>
        </h3>
        <p style={{
          fontSize: 15, lineHeight: 1.8,
          opacity: 0.8, marginBottom: 34, maxWidth: 480,
        }}>
          From heirloom silks to effortless everyday weaves, every piece is selected
          for its texture, story and ability to become part of yours.
        </p>
        <a href="#" style={{
          background: "#5c0a1e", color: "#f5e6c8",
          padding: "15px 34px", fontSize: 10, letterSpacing: 2.5,
          textTransform: "uppercase", alignSelf: "flex-start",
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          Discover Our Story <ArrowRight size={13} />
        </a>
      </div>
    </section>
  );
}