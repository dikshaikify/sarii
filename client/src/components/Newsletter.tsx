export default function Newsletter() {
  return (
    <section style={{
      background: "#5c0a1e", color: "#f5e6c8",
      padding: "100px 40px", textAlign: "center",
    }}>
      <p style={{
        fontSize: 10, letterSpacing: 4, marginBottom: 22,
        textTransform: "uppercase", opacity: 0.85,
      }}>
        Join the Sāri Circle
      </p>
      <h3 className="serif" style={{
        fontSize: "clamp(36px, 5.5vw, 60px)",
        marginBottom: 20, lineHeight: 1.1,
      }}>
        The beautiful things<br />
        <span className="italic" style={{ color: "#e8b96a" }}>come first.</span>
      </h3>
      <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 38 }}>
        New collections, private edits and festive stories — delivered occasionally.
      </p>
      <form
        onSubmit={e => e.preventDefault()}
        style={{ display: "flex", maxWidth: 500, margin: "0 auto", gap: 0 }}
      >
        <input
          type="email"
          placeholder="Your email address"
          required
          style={{
            flex: 1, padding: "15px 20px",
            background: "transparent",
            border: "1px solid rgba(245,230,200,0.35)",
            borderRight: "none",
            color: "#f5e6c8",
            fontSize: 13, outline: "none",
          }}
        />
        <button style={{
          background: "#0f0f0f", color: "#f5e6c8",
          padding: "0 32px",
          fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
        }}>
          Subscribe
        </button>
      </form>
    </section>
  );
}