import { ShoppingBag } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClear: () => void;
};

export default function CartBar({ count, total, onClear }: Props) {
  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
      background: "#1a1a1a", color: "#f5e6c8",
      padding: "14px 24px", borderRadius: 50,
      display: "flex", alignItems: "center", gap: 20,
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      zIndex: 100,
    }}>
      <ShoppingBag size={18} />
      <span style={{ fontSize: 13 }}>{count} item{count > 1 ? "s" : ""}</span>
      <span className="serif" style={{ fontSize: 16, color: "#e8b96a" }}>
        ₹{total.toLocaleString("en-IN")}
      </span>
      <button
        onClick={onClear}
        style={{
          background: "#5c0a1e", color: "#f5e6c8",
          padding: "8px 18px", fontSize: 10,
          letterSpacing: 1.5, textTransform: "uppercase",
        }}
      >
        Clear
      </button>
    </div>
  );
}