export default function About() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.title}>About FinanceTools</h1>
        <p style={styles.subtitle}>
          Your one-stop hub for smart, interactive finance calculators.
        </p>
      </section>

      
      {/* Google AdSense Ad */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <ins className="adsbygoogle"
             style={{ display: "block", width: "100%", maxWidth: 728, height: 30, margin: "0 auto" }}
             data-ad-client="ca-pub-5755839292408890"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <section style={styles.content}>
        <p>
          FinanceTools is designed for Indian users who want **fast, accurate, and reliable financial tools**.
          From EMI to SIP planning, FD returns, income tax, salary calculations, and more, we help you make informed financial decisions.
        </p>

        <ul style={styles.list}>
          <li>No login required</li>
          <li>No data tracking</li>
          <li>Accurate and transparent formulas</li>
          <li>Vibrant & interactive interface</li>
        </ul>

        <p>
          Built by passionate engineers who believe finance should be **simple, engaging, and accessible to everyone**.
        </p>
      </section>

    </div>
  );
}

const styles = {
  page: {
    maxWidth: 900,
    margin: "40px auto",
    padding: 20,
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#0f172a",
  },

  hero: {
    textAlign: "center",
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    background: "linear-gradient(135deg, #4ECDC4, #1E90FF)",
    color: "#fff",
    boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
  },

  content: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#334155",
  },

  list: {
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 20,
    listStyleType: "disc",
    color: "#0f172a",
  },
};
