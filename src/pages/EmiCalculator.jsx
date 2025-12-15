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

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureMonths, setTenureMonths] = useState(240);
  const [loanType, setLoanType] = useState("reducing");
  const [prepaymentMonth, setPrepaymentMonth] = useState(0);
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "EMI Calculator Online | Home Loan EMI 2025";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Calculate EMI for home, car, and personal loans instantly with Indian Lakh & Crore format."
      );
    }
  }, []);

  useEffect(() => {
    calculateEmi();
    // eslint-disable-next-line
  }, [loanAmount, interestRate, tenureMonths, loanType, prepaymentMonth, prepaymentAmount]);

  const calculateEmi = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/emi/calculate`, {
        loanAmount,
        interestRate,
        tenureMonths,
        loanType,
        prepayment: prepaymentAmount > 0 ? { month: prepaymentMonth, amount: prepaymentAmount } : null,
      });
      setResult(res.data);
    } catch {
      setError("Unable to calculate EMI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.backBtn}>← Back</Link>
        <h1 style={styles.title}>EMI Calculator</h1>
        <p style={styles.subtitle}>Smart EMI calculator with <strong>Indian Lakh & Crore format</strong></p>

        {/* Inputs */}
        <div style={styles.field}>
          <label>Loan Amount (₹)</label>
          <input type="range" min="50000" max="5000000" step="10000"
            value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} style={styles.slider} />
          <div style={styles.value}><FaRupeeSign /> {loanAmount.toLocaleString("en-IN")} <span style={styles.hint}>({formatIndianAmount(loanAmount)})</span></div>
        </div>

        <div style={styles.field}>
          <label>Interest Rate (% p.a.)</label>
          <input type="range" min="5" max="18" step="0.1"
            value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={styles.slider} />
          <div style={styles.value}>{interestRate}%</div>
        </div>

        <div style={styles.field}>
          <label>Tenure (Months)</label>
          <input type="range" min="12" max="360" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} style={styles.slider} />
          <div style={styles.value}>{tenureMonths} months</div>
        </div>

        <div style={styles.field}>
          <label>Loan Type</label>
          <select value={loanType} onChange={(e) => setLoanType(e.target.value)} style={styles.select}>
            <option value="reducing">Reducing EMI</option>
            <option value="flat">Flat EMI</option>
          </select>
        </div>

        <div style={styles.field}>
          <label>Prepayment</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input type="number" min="0" placeholder="Month" value={prepaymentMonth} onChange={(e) => setPrepaymentMonth(Number(e.target.value))} style={styles.input} />
            <input type="number" min="0" placeholder="Amount" value={prepaymentAmount} onChange={(e) => setPrepaymentAmount(Number(e.target.value))} style={styles.input} />
          </div>
        </div>

        {loading && <p style={styles.info}>Calculating…</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* Results */}
        {result && !loading && (
          <>
            <div style={styles.resultGrid}>
              <div style={{ ...styles.resultBox, background: "#e0f2fe" }}>
                <FaMoneyBillWave style={styles.icon} />
                <span>Monthly EMI</span>
                <strong style={styles.mainValue}>₹{result.emiFormatted || result.emi.toLocaleString("en-IN")}</strong>
              </div>
              <div style={{ ...styles.resultBox, background: "#fee2e2" }}>
                <FaCoins style={styles.icon} />
                <span>Total Interest</span>
                <strong style={styles.mainValue}>₹{result.totalInterestFormatted || result.totalInterest.toLocaleString("en-IN")}</strong>
              </div>
              <div style={{ ...styles.resultBox, background: "#dcfce7" }}>
                <FaRupeeSign style={styles.icon} />
                <span>Total Payment</span>
                <strong style={styles.mainValue}>₹{result.totalAmountFormatted || result.totalAmount.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            {/* Charts */}
            <div style={{ marginTop: 30 }}>
              <h3>Principal vs Interest (Monthly)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={result.schedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(val) => formatIndianAmount(val)} />
                  <Legend />
                  <Area type="monotone" dataKey="principalPaid" stackId="a" stroke="#0ea5e9" fill="#bae6fd" name="Principal Paid" />
                  <Area type="monotone" dataKey="interestPaid" stackId="a" stroke="#ef4444" fill="#fecaca" name="Interest Paid" />
                </AreaChart>
              </ResponsiveContainer>

              <h3 style={{ marginTop: 40 }}>Remaining Balance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={result.schedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(val) => formatIndianAmount(val)} />
                  <Line type="monotone" dataKey="remainingBalance" stroke="#16a34a" strokeWidth={2} name="Remaining Balance" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= Styles ================= */
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
  select: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc", marginTop: 6 },
  input: { flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc", marginTop: 6 },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16, marginTop: 28 },
  resultBox: { padding: 16, borderRadius: 16, textAlign: "center", fontWeight: 600, transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  icon: { fontSize: 22, marginBottom: 6, color: "#2563eb" },
  mainValue: { fontSize: 18, display: "block", marginBottom: 4 },
  info: { textAlign: "center", color: "#2563eb", fontWeight: 600 },
  error: { textAlign: "center", color: "#dc2626", fontWeight: 600 },
};
