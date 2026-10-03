import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import type { Saree } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  items: Saree[];
  onRemove: (id: number) => void;
  onClear: () => void;
};

// WhatsApp checkout number — country code + number, no + or spaces
// India (+91) + 8088933427 → "918088933427"
const WHATSAPP_NUMBER = "918088933427";

export default function CartDrawer({ open, onClose, items, onRemove, onClear }: Props) {
  const total = items.reduce((s, x) => s + x.price, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const lines = [
      "Hello SĀRI, I'd like to place an order:",
      "",
      ...items.map(
        (s, i) =>
          `${i + 1}. ${s.name} — ₹${s.price.toLocaleString("en-IN")} (ID: ${s.id})`
      ),
      "",
      `Total: ₹${total.toLocaleString("en-IN")}`,
      `Items: ${items.length}`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
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

      {/* Drawer */}
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
        {/* Header */}
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
            <ShoppingBag size={18} />
            <h3 className="serif" style={{ fontSize: 22, letterSpacing: 1 }}>
              Your Cart
            </h3>
            <span style={{ fontSize: 11, opacity: 0.6 }}>
              ({items.length})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              color: "#f5e6c8",
              padding: 4,
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.55 }}>
              <ShoppingBag size={32} style={{ marginBottom: 14, opacity: 0.5 }} />
              <p style={{ fontSize: 14 }}>Your cart is empty.</p>
              <p style={{ fontSize: 11, marginTop: 6 }}>
                Add a saree to get started.
              </p>
            </div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {items.map((s) => (
                <li
                  key={`${s.id}-${Math.random()}`}
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
                    <p style={{ fontSize: 11, opacity: 0.6, marginBottom: 6 }}>
                      {s.category} · {s.fabric}
                    </p>
                    <p className="serif" style={{ fontSize: 16 }}>
                      ₹{s.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(s.id)}
                    aria-label="Remove"
                    style={{
                      color: "#e8b96a",
                      opacity: 0.7,
                      cursor: "pointer",
                      padding: 6,
                      background: "none",
                      border: "none",
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #2a2a2a",
              background: "#161616",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
                fontSize: 13,
              }}
            >
              <span style={{ opacity: 0.75 }}>Subtotal</span>
              <span className="serif" style={{ fontSize: 20, color: "#e8b96a" }}>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                background: "#5c0a1e",
                color: "#f5e6c8",
                padding: "14px 0",
                fontSize: 10,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 10,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#7a0f2a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#5c0a1e")}
            >
              Checkout on WhatsApp <ArrowRight size={13} />
            </button>

            <button
              onClick={onClear}
              style={{
                width: "100%",
                padding: "10px 0",
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#e8b96a",
                opacity: 0.8,
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}