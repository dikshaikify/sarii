import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import type { Saree, Meta } from "../types";

type Props = {
  sarees: Saree[];
  loading: boolean;
  meta: Meta | null;
  category: string; setCategory: (v: string) => void;
  fabric: string; setFabric: (v: string) => void;
  occasion: string; setOccasion: (v: string) => void;
  sort: string; setSort: (v: string) => void;
  wishlist: number[];
  onWishlist: (id: number) => void;
  onAdd: (s: Saree) => void;
  onClear: () => void;
};

export default function ProductGrid({
  sarees, loading, meta,
  category, setCategory,
  sort, setSort,
  wishlist, onWishlist, onAdd, onClear,
}: Props) {
  const [visible, setVisible] = useState(8);

  useEffect(() => setVisible(8), [sarees.length, category, sort]);

  const tabs = ["All", ...(meta?.categories.slice(0, 7) || [])];
  const hasFilter = category || sort;

  return (
    <section id="shop" style={{ padding: "90px 40px", background: "#fdf8f3" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 44 }}>
          <p style={{
            fontSize: 10, letterSpacing: 4, marginBottom: 16,
            textTransform: "uppercase", color: "#8b1e3f",
          }}>
            The Collection
          </p>
          <h3 className="serif" style={{
            fontSize: "clamp(36px, 5vw, 54px)",
            color: "#1a1a1a", lineHeight: 1.1,
          }}>
            New <span className="italic" style={{ color: "#8b1e3f" }}>arrivals.</span>
          </h3>
        </div>

        <div style={{
          display: "flex", gap: 10, flexWrap: "wrap",
          alignItems: "center", marginBottom: 40,
        }}>
          {tabs.map(c => {
            const active = (c === "All" && !category) || category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c === "All" ? "" : c)}
                style={{
                  padding: "9px 20px",
                  fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase",
                  border: "1px solid",
                  borderColor: active ? "#1a1a1a" : "#e0d5c8",
                  background: active ? "#1a1a1a" : "transparent",
                  color: active ? "#f5e6c8" : "#1a1a1a",
                  transition: "all .2s",
                }}
              >
                {c}
              </button>
            );
          })}

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              marginLeft: "auto",
              padding: "9px 16px",
              border: "1px solid #e0d5c8",
              background: "transparent",
              fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase",
              outline: "none",
            }}
          >
            <option value="">Featured</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>

          {hasFilter && (
            <button
              onClick={onClear}
              style={{
                fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase",
                color: "#8b1e3f",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: 80, color: "#8b1e3f" }}>
            Loading collection…
          </p>
        ) : sarees.length === 0 ? (
          <p style={{ textAlign: "center", padding: 80, color: "#888" }}>
            No sarees found. Try another filter.
          </p>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 26,
            }}>
              {sarees.slice(0, visible).map(s => (
                <ProductCard
                  key={s.id}
                  saree={s}
                  liked={wishlist.includes(s.id)}
                  onLike={() => onWishlist(s.id)}
                  onAdd={() => onAdd(s)}
                />
              ))}
            </div>

            {visible < sarees.length && (
              <div style={{ textAlign: "center", marginTop: 50 }}>
                <button
                  onClick={() => setVisible(v => v + 8)}
                  style={{
                    padding: "14px 40px",
                    border: "1px solid #1a1a1a",
                    background: "transparent",
                    fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
                    color: "#1a1a1a",
                  }}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}