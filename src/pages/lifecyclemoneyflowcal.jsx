import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0ea5e9", "#ef4444", "#16a34a", "#facc15", "#a855f7"];

const formatIndianAmount = (amount) => {
  if (!amount) return "";
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`;
  return amount.toLocaleString("en-IN");
};

export default function LifeCycleMoneyFlow() {
  const [ageStart, setAgeStart] = useState(25);
  const [ageEnd, setAgeEnd] = useState(65);
  const [annualIncome, setAnnualIncome] = useState(500000);
  const [annualExpenses, setAnnualExpenses] = useState(300000);
  const [investmentReturn, setInvestmentReturn] = useState(5);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "Life Cycle Money Flow Calculator | 2025";
    calculateFlow();
    // eslint-disable-next-line
  }, [ageStart, ageEnd, annualIncome, annualExpenses, investmentReturn]);

  const calculateFlow = async () => {
    setLoading(true);
    try {
      const nYears = ageEnd - ageStart + 1;
      const incomeList = Array(nYears).fill(Number(annualIncome));
      const expensesList = Array(nYears).fill(Number(annualExpenses));
      const res = await axios.post(`${API_URL}/api/lcmf/calculate`, {
        ageStart,
        ageEnd,
        annualIncome: incomeList,
        annualExpenses: expensesList,
        annualInvestmentReturn: investmentReturn
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
        <h1 style={styles.title}>Life Cycle Money Flow Calculator</h1>
        <p style={styles.subtitle}>
          Plan your finances across life stages with <strong>interactive sliders</strong> & visualizations.
        </p>

        {/* Sliders */}
        <div style={styles.field}>
          <label>Starting Age: {ageStart}</label>
          <input
            type="range"
            min="18"
            max="65"
            step="1"
            value={ageStart}
            onChange={(e) => setAgeStart(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.field}>
          <label>Ending Age: {ageEnd}</label>
          <input
            type="range"
            min={ageStart + 1}
            max="100"
            step="1"
            value={ageEnd}
            onChange={(e) => setAgeEnd(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.field}>
          <label>Annual Income: ₹{formatIndianAmount(annualIncome)}</label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="10000"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.field}>
          <label>Annual Expenses: ₹{formatIndianAmount(annualExpenses)}</label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="10000"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.field}>
          <label>Annual Investment Return: {investmentReturn}%</label>
          <input
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={investmentReturn}
            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {loading && <p style={styles.info}>Calculating…</p>}

        {/* Results */}
        {result && (
          <>
            <h3 style={{ marginTop: 30 }}>Net Cashflow & Cumulative Savings</h3>
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.yearlyNetCashflow}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatIndianAmount} />
                  <Tooltip formatter={(val) => `₹${formatIndianAmount(val)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="netCashflow" stroke="#ef4444" name="Net Cashflow" />
                  <Line type="monotone" dataKey="savings" stroke="#0ea5e9" name="Cumulative Savings" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h3 style={{ marginTop: 30 }}>Overall Breakdown</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Total Income", value: result.yearlyNetCashflow.reduce((a, b) => a + b.income, 0) },
                      { name: "Total Expenses", value: result.yearlyNetCashflow.reduce((a, b) => a + b.expenses, 0) },
                      { name: "Total Savings", value: result.totalSavings }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {COLORS.map((color, idx) => <Cell key={idx} fill={color} />)}
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
  info: { textAlign: "center", color: "#2563eb", fontWeight: 600 },
};
