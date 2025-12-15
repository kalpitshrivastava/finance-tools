import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaMoneyBillWave, FaCoins } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";

const formatIndianAmount = (amount) => {
  if (!amount) return "";
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`;
  return amount.toLocaleString("en-IN");
};

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [tenureMonths, setTenureMonths] = useState(12);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "FD Calculator Online | Fixed Deposit Returns 2025";
  }, []);

  useEffect(() => {
    calculateFd();
    // eslint-disable-next-line
  }, [principal, rate, tenureMonths]);

  const calculateFd = async () => {
    setLoading(true);
    try {
      const T = parseFloat(tenureMonths) / 12; // months → years
      const res = await axios.post(`${API_URL}/api/fd/calculate`, {
        principal: parseFloat(principal),
        annualInterestRate: parseFloat(rate),
        years: T,
        compoundingPerYear: 4
      });
      setResult(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.backBtn}>← Back</Link>
        <h1 style={styles.title}>FD Calculator</h1>
        <p style={styles.subtitle}>Calculate your Fixed Deposit returns with <strong>quarterly compounding</strong></p>

        {/* Inputs */}
        <div style={styles.field}>
          <label>Principal (₹)</label>
          <input type="range" min="5000" max="50000000" step="1000"
            value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} style={styles.slider} />
          <div style={styles.value}><FaRupeeSign /> {principal.toLocaleString("en-IN")} <span style={styles.hint}>({formatIndianAmount(principal)})</span></div>
        </div>

        <div style={styles.field}>
          <label>Interest Rate (% p.a.)</label>
          <input type="range" min="1" max="15" step="0.1"
            value={rate} onChange={(e) => setRate(Number(e.target.value))} style={styles.slider} />
          <div style={styles.value}>{rate}%</div>
        </div>

        <div style={styles.field}>
          <label>Tenure (Months)</label>
          <input type="range" min="1" max="120" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} style={styles.slider} />
          <div style={styles.value}>{tenureMonths} months</div>
        </div>

        {loading && <p style={styles.info}>Calculating…</p>}

        {/* Results */}
        {result && !loading && (
          <>
            <div style={styles.resultGrid}>
              <div style={{ ...styles.resultBox, background: "#e0f2fe" }}>
                <FaMoneyBillWave style={styles.icon} />
                <span>Maturity Amount</span>
                <strong style={styles.mainValue}>₹{formatIndianAmount(result.maturityAmount)}</strong>
              </div>
              <div style={{ ...styles.resultBox, background: "#fee2e2" }}>
                <FaCoins style={styles.icon} />
                <span>Total Interest</span>
                <strong style={styles.mainValue}>₹{formatIndianAmount(result.totalInterest)}</strong>
              </div>
              <div style={{ ...styles.resultBox, background: "#dcfce7" }}>
                <FaRupeeSign style={styles.icon} />
                <span>Max Interest Per Quarter</span>
                <strong style={styles.mainValue}>₹{formatIndianAmount(result.maxInterestPerPeriod)}</strong>
              </div>
            </div>

            {/* Improved Growth Chart */}
            <h3 style={{ marginTop: 30 }}>FD Growth: Principal vs Interest</h3>
            <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={result?.growthDetails || []}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                <YAxis tickFormatter={formatIndianAmount} />
                <Tooltip formatter={(val) => `₹${formatIndianAmount(val)}`} />
                <Legend verticalAlign="top" height={36}/>
                <Area type="monotone" dataKey="principalAccumulated" stroke="#0ea5e9" fill="#bae6fd" name="Principal Accumulated"/>
                <Area type="monotone" dataKey="interestAccumulated" stroke="#ef4444" fill="#fecaca" name="Interest Accumulated"/>
              </AreaChart>
            </ResponsiveContainer>
            </div>

            <p style={{ marginTop: 20 }}>Effective Annual Yield (EAY): {result.effectiveAnnualYield}%</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #020617)", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 },
  card: { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", maxWidth: 900, width: "100%", padding: 30, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" },
  backBtn: { color: "#2563eb", fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 10 },
  title: { textAlign: "center", marginBottom: 6, color: "#1e40af" },
  subtitle: { textAlign: "center", color: "#334155", marginBottom: 25, fontWeight: 500 },
  field: { marginBottom: 22 },
  value: { textAlign: "right", fontWeight: 600, fontSize: 16, color: "#0f172a", display: "flex", justifyContent: "flex-end", gap: 6, alignItems: "center" },
  hint: { color: "#64748b", fontSize: "0.85rem" },
  slider: { width: "100%", cursor: "pointer", accentColor: "#2563eb" },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16, marginTop: 28 },
  resultBox: { padding: 16, borderRadius: 16, textAlign: "center", fontWeight: 600, transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  icon: { fontSize: 22, marginBottom: 6, color: "#2563eb" },
  mainValue: { fontSize: 18, display: "block", marginBottom: 4 },
  info: { textAlign: "center", color: "#2563eb", fontWeight: 600 },
};
