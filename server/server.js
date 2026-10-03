import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === "production";

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
app.use(cookieParser());

// ───── Google OAuth ─────
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "change_me_secret";

app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture, sub } = ticket.getPayload();

    const token = jwt.sign({ id: sub, email, name, picture }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: IS_PROD ? "none" : "lax",
      secure: IS_PROD,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ ok: true, user: { email, name, picture } });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ ok: false, error: "Invalid Google token" });
  }
});

app.get("/api/auth/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ ok: false });
  try {
    res.json({ ok: true, user: jwt.verify(token, JWT_SECRET) });
  } catch {
    res.status(401).json({ ok: false });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

// ───── Contact ─────
app.get("/api/contact", (_req, res) => {
  res.json({
    email: "dikshakoppad@gmail.com",
    phone: "+91 80889 33427",
    address: "Shivapur Badavane, Byadgi, Dist: Haveri, Karnataka 581106",
    whatsapp: "918088933427",
  });
});

// ───── Data ─────
const categories = ["Banarasi","Kanjivaram","Chanderi","Organza","Cotton","Linen","Georgette","Mysore Silk","Paithani","Handloom","Designer","Wedding"];
const fabrics    = ["Silk","Cotton","Organza","Chanderi","Linen","Georgette"];
const colors     = ["Red","Blue","Green","Pink","Purple","Black","White","Gold","Orange","Yellow","Maroon","Teal"];
const occasions  = ["Wedding","Festive","Party","Office","Casual","Reception"];

// ✅ RELATIVE PATHS — served from client/public/sarees/ by Vercel
// 36 files: saree-1..8.jpg, saree-9.png, saree-10.jpg, saree-11.png, saree-12..36.jpg
const sareePhotos = [
  "/sarees/saree-1.jpg",
  "/sarees/saree-2.jpg",
  "/sarees/saree-3.jpg",
  "/sarees/saree-4.jpg",
  "/sarees/saree-5.jpg",
  "/sarees/saree-6.jpg",
  "/sarees/saree-7.jpg",
  "/sarees/saree-8.jpg",
  "/sarees/saree-9.png",
  "/sarees/saree-10.jpg",
  "/sarees/saree-11.png",
  "/sarees/saree-12.jpg",
  "/sarees/saree-13.jpg",
  "/sarees/saree-14.jpg",
  "/sarees/saree-15.jpg",
  "/sarees/saree-16.jpg",
  "/sarees/saree-17.jpg",
  "/sarees/saree-18.jpg",
  "/sarees/saree-19.jpg",
  "/sarees/saree-20.jpg",
  "/sarees/saree-21.jpg",
  "/sarees/saree-22.jpg",
  "/sarees/saree-23.jpg",
  "/sarees/saree-24.jpg",
  "/sarees/saree-25.jpg",
  "/sarees/saree-26.jpg",
  "/sarees/saree-27.jpg",
  "/sarees/saree-28.jpg",
  "/sarees/saree-29.jpg",
  "/sarees/saree-30.jpg",
  "/sarees/saree-31.jpg",
  "/sarees/saree-32.jpg",
  "/sarees/saree-33.jpg",
  "/sarees/saree-34.jpg",
  "/sarees/saree-35.jpg",
  "/sarees/saree-36.jpg",
];

const sarees = Array.from({ length: 36 }, (_, i) => {
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
    image: sareePhotos[i],
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
    environment: IS_PROD ? "production" : "development",
    endpoints: [
      "GET /api/health",
      "GET /api/meta",
      "GET /api/sarees",
      "GET /api/sarees/:id",
      "GET /api/contact",
      "POST /api/auth/google",
      "GET /api/auth/me",
      "POST /api/auth/logout",
    ],
  });
});

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", count: sarees.length, env: IS_PROD ? "prod" : "dev" })
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

app.listen(PORT, () => console.log(`🚀 SĀRI API on port ${PORT} (${IS_PROD ? "prod" : "dev"})`));