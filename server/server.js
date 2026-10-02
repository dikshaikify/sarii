import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// ───── CORS: localhost + Vercel + Render wildcards ─────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return cb(null, true);
    if (/^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin)) return cb(null, true);
    console.warn("❌ CORS blocked:", origin);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

// ───── Data ─────
const categories = ["Banarasi","Kanjivaram","Chanderi","Organza","Cotton","Linen","Georgette","Mysore Silk","Paithani","Handloom","Designer","Wedding"];
const fabrics    = ["Silk","Cotton","Organza","Chanderi","Linen","Georgette"];
const colors     = ["Red","Blue","Green","Pink","Purple","Black","White","Gold","Orange","Yellow","Maroon","Teal"];
const occasions  = ["Wedding","Festive","Party","Office","Casual","Reception"];

const SAREES_BASE_URL =
  process.env.SAREES_BASE_URL ||
  process.env.CLIENT_URL ||
  "http://localhost:5173";

const sareePhotos = [
  `${SAREES_BASE_URL}/sarees/saree-1.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-2.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-3.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-4.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-5.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-6.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-7.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-8.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-9.png`,
  `${SAREES_BASE_URL}/sarees/saree-10.jpg`,
  `${SAREES_BASE_URL}/sarees/saree-11.png`,
];

const sarees = Array.from({ length: 48 }, (_, i) => {
  const category = categories[i % categories.length];
  const fabric   = fabrics[i % fabrics.length];
  const color    = colors[i % colors.length];
  const occasion = occasions[i % occasions.length];
  const price    = 2499 + ((i * 977) % 22000);
  const mrp      = Math.round(price * 1.35);
  const rating   = +(3.8 + ((i * 7) % 12) / 10).toFixed(1);
  const ratingCount = 40 + ((i * 13) % 260);
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return {
    id: i + 1,
    name: `${color} ${category} Saree`,
    category, fabric, color, occasion,
    price, mrp, discount, rating, ratingCount,
    image: sareePhotos[i % sareePhotos.length],
    description: `Handwoven ${fabric.toLowerCase()} saree in ${color.toLowerCase()} — perfect for ${occasion.toLowerCase()} occasions.`,
    inStock: true,
  };
});

// ───── Routes ─────
app.get("/", (_req, res) => {
  res.json({
    name: "SĀRI API",
    version: "1.0.0",
    sarees: sarees.length,
    endpoints: [
      "GET /api/health",
      "GET /api/meta",
      "GET /api/sarees",
      "GET /api/sarees/:id",
    ],
  });
});

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", count: sarees.length })
);

app.get("/api/meta", (_req, res) =>
  res.json({ categories, fabrics, colors, occasions })
);

app.get("/api/sarees", (req, res) => {
  const { category, fabric, color, occasion, search, sort, min, max, limit } = req.query;
  let result = [...sarees];

  if (category) result = result.filter(s => s.category === category);
  if (fabric)   result = result.filter(s => s.fabric === fabric);
  if (color)    result = result.filter(s => s.color === color);
  if (occasion) result = result.filter(s => s.occasion === occasion);
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.color.toLowerCase().includes(q)
    );
  }
  if (min) result = result.filter(s => s.price >= +min);
  if (max) result = result.filter(s => s.price <= +max);

  if (sort === "price_asc")  result.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
  if (sort === "rating")     result.sort((a, b) => b.rating - a.rating);
  if (sort === "newest")     result.sort((a, b) => b.id - a.id);

  if (limit) result = result.slice(0, +limit);

  res.json({ count: result.length, sarees: result });
});

app.get("/api/sarees/:id", (req, res) => {
  const saree = sarees.find(s => s.id === +req.params.id);
  if (!saree) return res.status(404).json({ error: "Saree not found" });
  res.json(saree);
});

app.listen(PORT, () => console.log(`🚀 SĀRI API on port ${PORT}`));