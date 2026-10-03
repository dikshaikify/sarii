import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import CategoryTiles from "./components/CategoryTiles";
import StoryBanner from "./components/StoryBanner";
import ProductGrid from "./components/ProductGrid";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartBar from "./components/CartBar";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import type { Saree, Meta } from "./types";

const API = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [occasion, setOccasion] = useState("");
  const [sort, setSort] = useState("");

  const [cart, setCart] = useState<Saree[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Drawer open/close state
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/meta`)
      .then(r => r.json())
      .then(setMeta)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (category) p.set("category", category);
    if (fabric) p.set("fabric", fabric);
    if (occasion) p.set("occasion", occasion);
    if (sort) p.set("sort", sort);

    fetch(`${API}/api/sarees?${p}`)
      .then(r => r.json())
      .then(d => setSarees(d.sarees))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category, fabric, occasion, sort]);

  const cartTotal = useMemo(
    () => cart.reduce((s, x) => s + x.price, 0),
    [cart]
  );

  const toggleWishlist = (id: number) =>
    setWishlist(w => (w.includes(id) ? w.filter(x => x !== id) : [...w, id]));

  const addToCart = (s: Saree) => setCart(c => [...c, s]);

  const removeFromCart = (id: number) =>
    setCart(c => c.filter(x => x.id !== id));

  const clearFilters = () => {
    setCategory(""); setFabric(""); setOccasion(""); setSort(""); setSearch("");
  };

  // Derived: get wishlist Saree objects
  const wishlistItems = useMemo(
    () => sarees.filter(s => wishlist.includes(s.id)),
    [sarees, wishlist]
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fdf8f3" }}>
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />
      <HeroCarousel />
      <CategoryTiles
        onSelect={(c) => {
          setCategory(c);
          document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <StoryBanner />
      <ProductGrid
        sarees={sarees}
        loading={loading}
        meta={meta}
        category={category} setCategory={setCategory}
        fabric={fabric} setFabric={setFabric}
        occasion={occasion} setOccasion={setOccasion}
        sort={sort} setSort={setSort}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onAdd={addToCart}
        onClear={clearFilters}
      />
      <Newsletter />
      <Footer />

      {cart.length > 0 && !cartOpen && (
        <CartBar
          count={cart.length}
          total={cartTotal}
          onClear={() => setCart([])}
        />
      )}

      {/* Drawers */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onClear={() => setCart([])}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistItems}
        onRemove={toggleWishlist}
        onAddToCart={addToCart}
      />
    </div>
  );
}