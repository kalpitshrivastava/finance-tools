import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Get in Touch</h1>
        <p style={styles.subtitle}>
          We love to hear from you! Questions, suggestions, or feedback.
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

      <section style={styles.contactGrid}>
        <div style={{ ...styles.card, background: "#FF6B6B20" }}>
          <FaEnvelope style={{ ...styles.icon, color: "#FF6B6B" }} />
          <h3>Email Us</h3>
          <p>support@finance-tools.com</p>
        </div>

        <div style={{ ...styles.card, background: "#4ECDC420" }}>
          <FaPhone style={{ ...styles.icon, color: "#4ECDC4" }} />
          <h3>Call Us</h3>
          <p>+91 88002 86328</p>
        </div>

        <div style={{ ...styles.card, background: "#FFD93D20" }}>
          <FaMapMarkerAlt style={{ ...styles.icon, color: "#FFD93D" }} />
          <h3>Our Office</h3>
          <p>Noida, India</p>
        </div>
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
    background: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
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

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20,
    marginTop: 32,
  },

  card: {
    padding: 24,
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },

  icon: {
    fontSize: 28,
    marginBottom: 12,
  },
};
