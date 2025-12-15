import { Link } from "react-router-dom";
import {
  FaCalculator,
  FaMoneyBillWave,
  FaPiggyBank,
  FaFileInvoiceDollar,
  FaWallet,
  FaGamepad
} from "react-icons/fa";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "FinanceTools | Vibrant Calculators";

    // Trigger AdSense ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }, []);

  const tools = [
    { name: "EMI Calculator", desc: "Loan EMI & tenure", link: "/emi-calculator", icon: <FaCalculator />, color: "#FF6B6B" },
    { name: "SIP Calculator", desc: "Investment growth", link: "/sip-calculator", icon: <FaMoneyBillWave />, color: "#4ECDC4" },
    { name: "FD Calculator", desc: "FD returns", link: "/fd-calculator", icon: <FaPiggyBank />, color: "#FFD93D" },
    { name: "Income Tax", desc: "Old vs New regime", link: "/income-tax-calculator", icon: <FaFileInvoiceDollar />, color: "#FF6B6B" },
    { name: "Salary Calculator", desc: "CTC → In-hand", link: "/salary-calculator", icon: <FaWallet />, color: "#1E90FF" },
    { name: "Money Flow", desc: "Life-cycle planning", link: "/money-flow-calculator", icon: <FaWallet />, color: "#9B59B6" },
    { name: "Mini Game", desc: "Quick brain break", link: "/mini-game", icon: <FaGamepad />, color: "#FF9F1C" }
  ];

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Smart Finance Tools</h1>
        <p style={styles.heroSubtitle}>
          Vibrant, accurate, and interactive calculators for Indian finance.
        </p>
      </section>

      {/* Google AdSense Ad */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <ins className="adsbygoogle"
             style={{ display: "block", width: "100%", maxWidth: 728, height: 90, margin: "0 auto" }}
             data-ad-client="ca-pub-5755839292408890"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* Tools Grid */}
      <section style={styles.grid}>
        {tools.map((t, i) => (
          <Link key={i} to={t.link} style={styles.link}>
            <div
              style={{ ...styles.card, background: `linear-gradient(135deg, ${t.color}20, ${t.color}40)` }}
              className="hover-card"
            >
              <div style={{ ...styles.icon, color: t.color }}>{t.icon}</div>
              <div style={styles.cardTitle}>{t.name}</div>
              <div style={styles.cardDesc}>{t.desc}</div>
            </div>
          </Link>
        ))}
      </section>

      {/* Trust / Highlights */}
      <section style={styles.trust}>
        <span>✔ Free</span>
        <span>✔ No Ads</span>
        <span>✔ No Login</span>
        <span>✔ Vibrant & Interactive</span>
      </section>

      {/* Hover styles */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 16px 32px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    background: "#f8fafc",
    minHeight: "calc(100vh - 120px)",
    padding: "32px 18px",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#0f172a"
  },

  hero: {
    maxWidth: 900,
    margin: "0 auto 32px",
    textAlign: "center",
    padding: "20px",
    borderRadius: 16,
    background: "linear-gradient(135deg, #1E90FF, #4ECDC4)",
    color: "#fff",
    boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
  },

  heroTitle: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 6
  },

  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)"
  },

  grid: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20
  },

  link: { textDecoration: "none", color: "inherit" },

  card: {
    height: 140,
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
  },

  icon: {
    fontSize: 28,
    marginBottom: 8
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4
  },

  cardDesc: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center"
  },

  trust: {
    maxWidth: 900,
    margin: "40px auto 0",
    display: "flex",
    justifyContent: "space-around",
    fontSize: 12,
    color: "#64748b"
  }
};
