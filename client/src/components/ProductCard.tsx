import { Heart, Star } from "lucide-react";
import type { Saree } from "../types";

type Props = {
  saree: Saree;
  liked: boolean;
  onLike: () => void;
  onAdd: () => void;
};

export default function ProductCard({ saree, liked, onLike, onAdd }: Props) {
  return (
    <article style={{ background: "#fff", position: "relative" }}>
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
        <img
          src={saree.image}
          alt={saree.name}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform .6s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />

        {saree.discount > 0 && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: "#5c0a1e", color: "#f5e6c8",
            fontSize: 10, letterSpacing: 1.5, padding: "5px 10px",
          }}>
            {saree.discount}% OFF
          </span>
        )}

        <button
          onClick={onLike}
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(255,255,255,0.92)",
            width: 34, height: 34, borderRadius: "50%",
            display: "grid", placeItems: "center",
          }}
        >
          <Heart
            size={15}
            fill={liked ? "#8b1e3f" : "none"}
            color={liked ? "#8b1e3f" : "#1a1a1a"}
          />
        </button>
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        <p style={{
          fontSize: 10, letterSpacing: 1.5, color: "#8b1e3f",
          textTransform: "uppercase", marginBottom: 8,
        }}>
          {saree.category} · {saree.fabric}
        </p>

        <h4 className="serif" style={{
          fontSize: 19, lineHeight: 1.25,
          color: "#1a1a1a", marginBottom: 10,
          minHeight: 46,
        }}>
          {saree.name}
        </h4>

        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
          <Star size={11} fill="#c89b3c" color="#c89b3c" />
          <span style={{ fontSize: 11, color: "#666" }}>
            {saree.rating} ({saree.ratingCount})
          </span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#999" }}>
            {saree.color}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
          <span className="serif" style={{ fontSize: 22, color: "#1a1a1a" }}>
            ₹{saree.price.toLocaleString("en-IN")}
          </span>
          <span style={{ fontSize: 12, color: "#999", textDecoration: "line-through" }}>
            ₹{saree.mrp.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={onAdd}
          style={{
            width: "100%",
            padding: "11px 0",
            background: "transparent",
            border: "1px solid #1a1a1a",
            fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
            color: "#1a1a1a",
            transition: "all .25s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#1a1a1a";
            e.currentTarget.style.color = "#f5e6c8";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#1a1a1a";
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}