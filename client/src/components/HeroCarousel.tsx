import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    image: "/sarees/saree-31.jpg",
    eyebrow: "The Festive Edit · 2026",
    title: "Where heritage\nmeets elegance.",
    subtitle: "Curated Indian sarees woven with stories, craftsmanship and timeless beauty.",
    cta: "Shop the Collection",
    href: "#shop",
  },
  {
    image: "/sarees/saree-32.jpg",
    eyebrow: "Banarasi Collection",
    title: "Banarasis,\nThen & Tomorrow.",
    subtitle: "Handwoven silk sarees from the looms of Varanasi — heirlooms in the making.",
    cta: "Shop Now",
    href: "#shop",
  },
  {
    image: "/sarees/saree-33.jpg",
    eyebrow: "New Arrival · ENAKSHI",
    title: "Every Banarasi\nhas a Story.",
    subtitle: "Discover our latest collection — crafted by master weavers, made for you.",
    cta: "Shop Now",
    href: "#shop",
  },
  {
    image: "/sarees/saree-34.jpg",
    eyebrow: "The Symphony of Traditions",
    title: "NAZM\nis now live.",
    subtitle: "Experience the melodious blend of tradition and craftsmanship.",
    cta: "Shop Now!",
    href: "#shop",
  },
  {
    image: "/sarees/saree-27.jpg",
    eyebrow: "Butta Bomma",
    title: "In Banarasi\nwe trust.",
    subtitle: "Timeless yellow silks, handwoven with intricate gold butta motifs.",
    cta: "Shop Now",
    href: "#shop",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "min(88vh, 760px)",
        minHeight: 560,
        overflow: "hidden",
        background: "#0f0f0f",
        color: "#f5e6c8",
      }}
    >
      {/* Full-bleed background image */}
      {SLIDES.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt={s.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        />
      ))}

      {/* Rich radial vignette — dark edges, softer center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(10,5,10,0.5) 0%, rgba(10,5,10,0.72) 55%, rgba(10,5,10,0.95) 100%)",
          zIndex: 1,
        }}
      />

      {/* Centered text panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 40px",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: 5,
            marginBottom: 26,
            textTransform: "uppercase",
            color: "#e8b96a",
          }}
        >
          {slide.eyebrow}
        </p>

        <h2
          className="serif"
          style={{
            fontSize: "clamp(46px, 6.5vw, 88px)",
            lineHeight: 1,
            marginBottom: 28,
            whiteSpace: "pre-line",
            maxWidth: 900,
            color: "#f5e6c8",
            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
          }}
        >
          {slide.title}
        </h2>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            marginBottom: 42,
            opacity: 0.9,
            maxWidth: 560,
            color: "#f5e6c8",
          }}
        >
          {slide.subtitle}
        </p>

        <a
          href={slide.href}
          style={{
            background: "#5c0a1e",
            color: "#f5e6c8",
            padding: "16px 44px",
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            border: "1px solid #5c0a1e",
            transition: "background 0.25s, color 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#e8b96a";
            e.currentTarget.style.borderColor = "#e8b96a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#5c0a1e";
            e.currentTarget.style.color = "#f5e6c8";
            e.currentTarget.style.borderColor = "#5c0a1e";
          }}
        >
          {slide.cta} <ArrowRight size={13} />
        </a>
      </div>

      {/* Left / right arrows */}
      <button onClick={prev} style={arrowStyle("left")} aria-label="Previous slide">
        <ChevronLeft size={18} color="#f5e6c8" />
      </button>
      <button onClick={next} style={arrowStyle("right")} aria-label="Next slide">
        <ChevronRight size={18} color="#f5e6c8" />
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          zIndex: 5,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === index ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === index ? "#e8b96a" : "rgba(245,230,200,0.4)",
              transition: "all 0.3s",
              cursor: "pointer",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 24,
    transform: "translateY(-50%)",
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "rgba(20,20,20,0.55)",
    border: "1px solid rgba(245,230,200,0.25)",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    zIndex: 5,
    backdropFilter: "blur(6px)",
  };
}