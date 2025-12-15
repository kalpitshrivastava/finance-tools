import { useState, useEffect } from "react"; // useEffect is needed
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaRupeeSign, FaChartLine } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const formatIndianAmount = (amount) => {
  if (!amount) return "";
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`;
  return amount.toLocaleString("en-IN");
};

export default function TaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [regime, setRegime] = useState("old");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const calculateTax = async (income = annualIncome, selectedRegime = regime) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/tax/calculate`, { annualIncome: income, regime: selectedRegime });
      setResult(res.data);

      // Chart data
      const chart = res.data.slabs.map(s => ({ label: s.slab, value: s.tax }));
      setChartData(chart);
    } catch {
      setResult(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial calculation on first render
  useEffect(() => {
    calculateTax();
  }, []); // Correct hook

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.backBtn}>← Back</Link>
        <h1 style={styles.title}>Income Tax Calculator</h1>
        <p style={styles.subtitle}>Calculate your <strong>tax liability</strong> and net income instantly</p>

        {/* Annual Income */}
        <div style={styles.field}>
          <label>Annual Income (₹)</label>
          <input
            type="range"
            min="50000"
            max="50000000"
            step="10000"
            value={annualIncome}
            onChange={(e) => {
              const value = Number(e.target.value);
              setAnnualIncome(value);
              calculateTax(value, regime); // recalc immediately
            }}
            style={styles.slider}
          />
          <div style={styles.value}>
            ₹{annualIncome.toLocaleString("en-IN")} ({formatIndianAmount(annualIncome)})
          </div>
        </div>

        {/* Tax Regime */}
        <div style={styles.field}>
          <label>Tax Regime:</label>
          <select
            value={regime}
            onChange={(e) => {
              const value = e.target.value;
              setRegime(value);
              calculateTax(annualIncome, value); // recalc immediately
            }}
            style={styles.select}
          >
            <option value="old">Old Regime</option>
            <option value="new">New Regime</option>
          </select>
        </div>

        {loading && <p style={styles.info}>Calculating…</p>}

        {result && !loading && (
          <>
            <div style={styles.resultGrid}>
              <div style={{ ...styles.resultBox, background: "#fee2e2" }}>
                <FaMoneyBillWave style={styles.icon} />
                <span>Tax Payable</span>
                <strong style={styles.mainValue}>₹{result.tax.toLocaleString("en-IN")}</strong>
                <div style={styles.subValue}>{formatIndianAmount(result.tax)}</div>
              </div>
              <div style={{ ...styles.resultBox, background: "#dcfce7" }}>
                <FaRupeeSign style={styles.icon} />
                <span>Net Income</span>
                <strong style={styles.mainValue}>₹{result.netIncome.toLocaleString("en-IN")}</strong>
                <div style={styles.subValue}>{formatIndianAmount(result.netIncome)}</div>
              </div>
              <div style={{ ...styles.resultBox, background: "#e0f7ff" }}>
                <FaChartLine style={styles.icon} />
                <span>Max Tax in Slab</span>
                <strong style={styles.mainValue}>₹{Math.max(...result.slabs.map(s => s.tax)).toLocaleString("en-IN")}</strong>
                <div style={styles.subValue}>
                  {formatIndianAmount(Math.max(...result.slabs.map(s => s.tax)))}
                </div>
              </div>
            </div>

            {/* Slab Table */}
            <div style={{ marginTop: 30 }}>
              <h4>Slab-wise Breakdown</h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={styles.th}>Slab</th>
                    <th style={styles.th}>Taxable Income</th>
                    <th style={styles.th}>Rate</th>
                    <th style={styles.th}>Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {result.slabs.map((s, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{s.slab}</td>
                      <td style={styles.td}>₹{s.taxableIncome.toLocaleString("en-IN")}</td>
                      <td style={styles.td}>{s.taxRate * 100}%</td>
                      <td style={styles.td}>₹{s.tax.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart */}
            <div style={{ marginTop: 40, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis tickFormatter={formatIndianAmount} />
                  <Tooltip formatter={(value) => `₹${formatIndianAmount(value)}`} />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Styles (same as before)
const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #020617)", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 },
  card: { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", maxWidth: 800, width: "100%", padding: 30, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" },
  backBtn: { color: "#2563eb", fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 10 },
  title: { textAlign: "center", marginBottom: 6, color: "#1e40af" },
  subtitle: { textAlign: "center", color: "#334155", marginBottom: 25, fontWeight: 500 },
  field: { marginBottom: 22 },
  value: { textAlign: "right", fontWeight: 600, fontSize: 16, color: "#0f172a", display: "flex", justifyContent: "flex-end", gap: 6, alignItems: "center" },
  slider: { width: "100%", cursor: "pointer", accentColor: "#2563eb" },
  select: { width: "100%", padding: 8, fontSize: 16, marginTop: 6, borderRadius: 6 },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16, marginTop: 28 },
  resultBox: { padding: 16, borderRadius: 16, textAlign: "center", fontWeight: 600, transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  icon: { fontSize: 22, marginBottom: 6, color: "#2563eb" },
  mainValue: { fontSize: 18, display: "block", marginBottom: 4 },
  subValue: { fontSize: 14, color: "#475569", marginTop: 0 },
  info: { textAlign: "center", color: "#2563eb", fontWeight: 600 },
  faq: { marginTop: 35, background: "#f1f5f9", padding: 18, borderRadius: 14, fontSize: 15 },
  th: { padding: 8, borderBottom: "1px solid #cbd5e1", textAlign: "left", fontWeight: 600 },
  td: { padding: 8, borderBottom: "1px solid #e2e8f0" },
};
