import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
import type { Saree } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  items: Saree[];
  onRemove: (id: number) => void;
  onAddToCart: (s: Saree) => void;
};

export default function WishlistDrawer({
  open,
  onClose,
  items,
  onRemove,
  onAddToCart,
}: Props) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s",
          zIndex: 150,
        }}
      />

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(420px, 100vw)",
          background: "#1a1a1a",
          color: "#f5e6c8",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s ease",
          zIndex: 160,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 24px",
            borderBottom: "1px solid #2a2a2a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Heart size={18} fill="#e8b96a" color="#e8b96a" />
            <h3 className="serif" style={{ fontSize: 22, letterSpacing: 1 }}>
              Wishlist
            </h3>
            <span style={{ fontSize: 11, opacity: 0.6 }}>
              ({items.length})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            style={{ color: "#f5e6c8", padding: 4, cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.55 }}>
              <Heart size={32} style={{ marginBottom: 14, opacity: 0.5 }} />
              <p style={{ fontSize: 14 }}>Your wishlist is empty.</p>
              <p style={{ fontSize: 11, marginTop: 6 }}>
                Tap ♡ on any saree to save it.
              </p>
            </div>
          ) : (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((s) => (
                <li
                  key={s.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr auto",
                    gap: 14,
                    alignItems: "center",
                    paddingBottom: 16,
                    borderBottom: "1px solid #2a2a2a",
                  }}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    width={70}
                    height={90}
                    style={{ objectFit: "cover", borderRadius: 6 }}
                  />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                      {s.name}
                    </p>
                    <p style={{ fontSize: 11, opacity: 0.6, marginBottom: 8 }}>
                      {s.category} · {s.fabric}
                    </p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => onAddToCart(s)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 9,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          padding: "6px 12px",
                          background: "#5c0a1e",
                          color: "#f5e6c8",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <ShoppingBag size={11} /> Add
                      </button>
                      <p className="serif" style={{ fontSize: 16, alignSelf: "center" }}>
                        ₹{s.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(s.id)}
                    aria-label="Remove"
                    style={{
                      color: "#e8b96a",
                      opacity: 0.7,
                      cursor: "pointer",
                      padding: 6,
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}