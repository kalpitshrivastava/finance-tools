import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaMoneyBillWave, FaCoins } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0ea5e9", "#ef4444", "#16a34a", "#facc15", "#a855f7"];

const formatIndianAmount = (amount) => {
  if (!amount) return "";
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`;
  return amount.toLocaleString("en-IN");
};

export default function SalaryCalculator() {
  const [basicSalary, setBasicSalary] = useState(500000);
  const [hra, setHra] = useState(200000);
  const [otherAllowances, setOtherAllowances] = useState(100000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "Salary Calculator Online | 2025";
  }, []);

  useEffect(() => {
    calculateSalary();
    // eslint-disable-next-line
  }, [basicSalary, hra, otherAllowances]);

  const calculateSalary = async () => {
    try {
      const ctc = parseFloat(basicSalary) + parseFloat(hra) + parseFloat(otherAllowances);
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/salary/calculate`, {
        ctc,
        basicSalary: parseFloat(basicSalary),
        hra: parseFloat(hra),
        otherAllowances: parseFloat(otherAllowances),
      });
      setResult(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler for updating Calculation Details fields
  const handleFieldChange = (field, value) => {
    const val = Number(value) || 0;
    if (field === "basic") setBasicSalary(val);
    if (field === "hra") setHra(val);
    if (field === "allowances") setOtherAllowances(val);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.backBtn}>← Back</Link>
        <h1 style={styles.title}>Salary Calculator</h1>
        <p style={styles.subtitle}>
          Calculate your net take-home salary with <strong>interactive sliders</strong> & editable details.
        </p>

        {/* Sliders */}
        <div style={styles.field}>
          <label>Basic Salary (₹)</label>
          <input
            type="range"
            min="50000"
            max="5000000"
            step="1000"
            value={basicSalary}
            onChange={(e) => setBasicSalary(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.value}>
            <FaRupeeSign /> {basicSalary.toLocaleString("en-IN")} (<span style={styles.hint}>{formatIndianAmount(basicSalary)}</span>)
          </div>
        </div>

        <div style={styles.field}>
          <label>HRA (₹)</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={hra}
            onChange={(e) => setHra(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.value}>
            <FaRupeeSign /> {hra.toLocaleString("en-IN")} (<span style={styles.hint}>{formatIndianAmount(hra)}</span>)
          </div>
        </div>

        <div style={styles.field}>
          <label>Other Allowances (₹)</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={otherAllowances}
            onChange={(e) => setOtherAllowances(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.value}>
            <FaRupeeSign /> {otherAllowances.toLocaleString("en-IN")} (<span style={styles.hint}>{formatIndianAmount(otherAllowances)}</span>)
          </div>
        </div>

        {loading && <p style={styles.info}>Calculating…</p>}

        {/* Results */}
        {result && !loading && (
          <>
            <div style={styles.resultGrid}>
              <div style={{ ...styles.resultBox, background: "#e0f2fe" }}>
                <FaMoneyBillWave style={styles.icon} />
                <span>Net Salary</span>
                <strong style={styles.mainValue}>₹{formatIndianAmount(result.netSalary)}</strong>
              </div>
              <div style={{ ...styles.resultBox, background: "#fee2e2" }}>
                <FaCoins style={styles.icon} />
                <span>Total Deductions</span>
                <strong style={styles.mainValue}>₹{formatIndianAmount(result.deductions)}</strong>
              </div>
              <div style={{ ...styles.resultBox, background: "#dcfce7" }}>
                <FaRupeeSign style={styles.icon} />
                <span>CTC</span>
                <strong style={styles.mainValue}>₹{formatIndianAmount(result.ctc)}</strong>
              </div>
            </div>

            {/* Editable Calculation Details */}
            <div style={styles.logicBox}>
              <h3>Calculation Details (Editable)</h3>
              <ul>
                <li><strong>Basic:</strong> ₹{formatIndianAmount(result.basic)}</li>
                <li><strong>HRA:</strong> ₹{formatIndianAmount(result.hra)}</li> 
                <li><strong>Other Allowances:</strong> ₹{formatIndianAmount(result.otherAllowances)}</li>
                <li><strong>PF (12% of Basic):</strong> ₹{formatIndianAmount(result.pf)}</li>
                <li><strong>Professional Tax:</strong> ₹{formatIndianAmount(result.professionalTax)}</li>
                <li><strong>Taxable Income:</strong> ₹{formatIndianAmount(result.taxableIncome)}</li>
                <li><strong>Income Tax:</strong> ₹{formatIndianAmount(result.tax)}</li>
                <li><strong>Net Salary:</strong> ₹{formatIndianAmount(result.netSalary)}</li>
              </ul>
            </div>

            {/* Pie Chart */}
            <h3 style={{ marginTop: 30 }}>Salary Component Breakdown</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={result.breakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {result.breakdown.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `₹${formatIndianAmount(val)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
  slider: { width: "100%", cursor: "pointer", accentColor: "#2563eb" },
  value: { textAlign: "right", fontWeight: 600, fontSize: 16, color: "#0f172a", display: "flex", justifyContent: "flex-end", gap: 6, alignItems: "center" },
  hint: { color: "#64748b", fontSize: "0.85rem" },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16, marginTop: 28 },
  resultBox: { padding: 16, borderRadius: 16, textAlign: "center", fontWeight: 600, transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  icon: { fontSize: 22, marginBottom: 6, color: "#2563eb" },
  mainValue: { fontSize: 18, display: "block", marginBottom: 4 },
  info: { textAlign: "center", color: "#2563eb", fontWeight: 600 },
  logicBox: { marginTop: 30, padding: 15, backgroundColor: "#f0f9ff", borderRadius: 12, color: "#0c4a6e", lineHeight: 1.6, fontSize: 14 },
  editInput: { marginLeft: 10, padding: 4, width: 120, borderRadius: 5, border: "1px solid #ccc" },
};
