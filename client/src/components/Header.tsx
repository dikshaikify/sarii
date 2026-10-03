import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import GoogleAuth from "./GoogleAuth";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
};

export default function Header({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{
        background: "#5c0a1e", color: "#f5e6c8",
        textAlign: "center", padding: "9px 16px",
        fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
      }}>
        Free shipping above ₹1,999 · Authentic Indian craft · Easy returns · Secure checkout
      </div>

      <header style={{
        background: "#131313", color: "#fff",
        padding: "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: "1px solid #262626",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => setOpen(!open)}
            style={{ color: "#fff", display: "none" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              border: "1px solid #e8b96a",
              display: "grid", placeItems: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, color: "#e8b96a",
            }}>S</div>
            <div>
              <div className="serif" style={{ fontSize: 22, letterSpacing: 5, lineHeight: 1 }}>
                SĀRI
              </div>
              <div style={{ fontSize: 8, letterSpacing: 3, color: "#8a7a68", marginTop: 2 }}>
                THE INDIAN DRAPE
              </div>
            </div>
          </div>
        </div>

        <nav style={{
          display: "flex", gap: 34,
          fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
        }}>
          <a href="#">New In</a>
          <a href="#shop">Sarees</a>
          <a href="#collections">Collections</a>
          <a href="#story">Our Story</a>
          <a href="#">Contact</a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 6, top: 8, color: "#777" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search sarees"
              style={{
                padding: "7px 4px 7px 26px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #444",
                color: "#fff",
                width: 170,
                fontSize: 12,
                outline: "none",
              }}
            />
          </div>

          <GoogleAuth />

          {/* Wishlist button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Open wishlist"
            style={{
              position: "relative",
              background: "none",
              border: "none",
              color: "#fff",
              padding: 4,
              cursor: "pointer",
            }}
          >
            <Heart size={17} />
            {wishlistCount > 0 && <Badge n={wishlistCount} />}
          </button>

          {/* Cart button */}
          <button
            onClick={onOpenCart}
            aria-label="Open cart"
            style={{
              position: "relative",
              background: "none",
              border: "none",
              color: "#fff",
              padding: 4,
              cursor: "pointer",
            }}
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && <Badge n={cartCount} />}
          </button>
        </div>
      </header>
    </>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span style={{
      position: "absolute", top: -6, right: -8,
      background: "#5c0a1e", color: "#f5e6c8",
      fontSize: 9, width: 16, height: 16,
      borderRadius: "50%",
      display: "grid", placeItems: "center",
      fontWeight: 600,
    }}>{n}</span>
  );
}