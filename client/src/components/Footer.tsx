export default function Footer() {
  const cols = [
    { t: "Shop",   l: ["New Arrivals", "Sarees", "Collections", "Festive Edit"] },
    { t: "Help",   l: ["Shipping", "Returns", "Contact", "FAQs"] },
    { t: "Follow", l: ["Instagram", "Pinterest", "Facebook"] },
  ];

  return (
    <footer style={{ background: "#0f0f0f", color: "#f5e6c8", padding: "70px 40px 30px" }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 40,
      }}>
        <div>
          <h4 className="serif" style={{ fontSize: 22, letterSpacing: 6, marginBottom: 12 }}>
            SĀRI
          </h4>
          <p style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.7, maxWidth: 280 }}>
            Indian sarees, thoughtfully curated for the modern wardrobe.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.t}>
            <p style={{
              fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
              marginBottom: 18, opacity: 0.7,
            }}>
              {col.t}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.l.map(x => (
                <li key={x} style={{ fontSize: 12, opacity: 0.75 }}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: 1400, margin: "40px auto 0",
        paddingTop: 24, borderTop: "1px solid rgba(245,230,200,0.1)",
        fontSize: 11, opacity: 0.5, textAlign: "center", letterSpacing: 1,
      }}>
        © 2026 SĀRI. All rights reserved.
      </div>
    </footer>
  );
}