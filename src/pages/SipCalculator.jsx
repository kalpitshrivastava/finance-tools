import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCoins, FaPiggyBank, FaChartLine } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const formatIndianAmount = (amount) => {
  if (!amount) return "";
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`;
  return amount.toLocaleString("en-IN");
};

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [rateOfReturn, setRateOfReturn] = useState(12);
  const [tenureYears, setTenureYears] = useState(10);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "SIP Calculator Online | Plan Your Investments";
    calculateSIP();
  }, [monthlyInvestment, rateOfReturn, tenureYears]);

  const calculateSIP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/sip/calculate`, {
        monthlyInvestment,
        annualInterestRate: rateOfReturn,
        years: tenureYears,
      });
      setResult(res.data);

      // Build chart data (yearly corpus growth)
      const n = tenureYears;
      const r = rateOfReturn / 100 / 12;
      let corpus = 0;
      const chart = [];
      for (let month = 1; month <= n * 12; month++) {
        corpus = (corpus + monthlyInvestment) * (1 + r);
        if (month % 12 === 0) {
          chart.push({
            year: month / 12,
            corpus: Math.round(corpus),
          });
        }
      }
      setChartData(chart);

    } catch {
      setResult(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.backBtn}>← Back</Link>
        <h1 style={styles.title}>SIP Calculator</h1>
        <p style={styles.subtitle}>
          Plan your investments with <strong>Indian Lakh & Crore format</strong>
        </p>

        {/* Monthly Investment */}
        <div style={styles.field}>
          <label>Monthly Investment (₹)</label>
          <input
            type="range"
            min="1000"
            max="200000"
            step="1000"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.value}>₹{monthlyInvestment.toLocaleString("en-IN")} ({formatIndianAmount(monthlyInvestment)})</div>
        </div>

        {/* Rate of Return */}
        <div style={styles.field}>
          <label>Expected Rate of Return (% p.a.)</label>
          <input
            type="range"
            min="1"
            max="25"
            step="0.1"
            value={rateOfReturn}
            onChange={(e) => setRateOfReturn(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.value}>{rateOfReturn}%</div>
        </div>

        {/* Tenure */}
        <div style={styles.field}>
          <label>Tenure (Years)</label>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.value}>{tenureYears} years</div>
        </div>

        {loading && <p style={styles.info}>Calculating…</p>}

        {/* Results */}
        {result && !loading && (
          <>
            <div style={styles.resultGrid}>
              <div style={{ ...styles.resultBox, background: "#dcfce7" }}>
                <FaPiggyBank style={styles.icon} />
                <span>Total Investment</span>
                <strong style={styles.mainValue}>₹{result.investment.toLocaleString("en-IN")}</strong>
                <div style={styles.subValue}>{formatIndianAmount(result.investment)}</div>
              </div>
              <div style={{ ...styles.resultBox, background: "#fee2e2" }}>
                <FaCoins style={styles.icon} />
                <span>Estimated Returns</span>
                <strong style={styles.mainValue}>₹{result.returns.toLocaleString("en-IN")}</strong>
                <div style={styles.subValue}>{formatIndianAmount(result.returns)}</div>
              </div>
              <div style={{ ...styles.resultBox, background: "#e0f2fe" }}>
                <FaChartLine style={styles.icon} />
                <span>Expected Corpus</span>
                <strong style={styles.mainValue}>₹{result.corpus.toLocaleString("en-IN")}</strong>
                <div style={styles.subValue}>{formatIndianAmount(result.corpus)}</div>
              </div>
            </div>

            {/* Chart */}
            <div style={{ marginTop: 40, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottomRight", offset: -5 }} />
                  <YAxis tickFormatter={formatIndianAmount} />
                  <Tooltip formatter={(value) => `₹${formatIndianAmount(value)}`} />
                  <Line type="monotone" dataKey="corpus" stroke="#2563eb" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* FAQ */}
        <div style={styles.faq}>
          <h2>FAQs</h2>
          <p><strong>What is SIP?</strong><br />SIP is a method of investing a fixed sum regularly in mutual funds.</p>
          <p><strong>How is SIP corpus calculated?</strong><br />Using future value formula considering monthly investment, tenure, and expected returns.</p>
          <p><strong>Can I change SIP amount?</strong><br />Yes, you can increase or decrease SIP anytime.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #020617)", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 },
  card: { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", maxWidth: 750, width: "100%", padding: 30, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" },
  backBtn: { color: "#2563eb", fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 10 },
  title: { textAlign: "center", marginBottom: 6, color: "#1e40af" },
  subtitle: { textAlign: "center", color: "#334155", marginBottom: 25, fontWeight: 500 },
  field: { marginBottom: 22 },
  value: { textAlign: "right", fontWeight: 600, fontSize: 16, color: "#0f172a", display: "flex", justifyContent: "flex-end", gap: 6, alignItems: "center" },
  slider: { width: "100%", cursor: "pointer", accentColor: "#2563eb" },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16, marginTop: 28 },
  resultBox: { padding: 16, borderRadius: 16, textAlign: "center", fontWeight: 600, transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  icon: { fontSize: 22, marginBottom: 6, color: "#2563eb" },
  mainValue: { fontSize: 18, display: "block", marginBottom: 4 },
  subValue: { fontSize: 14, color: "#475569", marginTop: 0 },
  info: { textAlign: "center", color: "#2563eb", fontWeight: 600 },
  faq: { marginTop: 35, background: "#f1f5f9", padding: 18, borderRadius: 14, fontSize: 15 },
};
