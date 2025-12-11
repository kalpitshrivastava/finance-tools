import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SalaryCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [hra, setHra] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "Salary Calculator Online | 2025";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Calculate your net salary after deductions. Use our Salary Calculator to know take-home pay, allowances, and taxes."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/salary/calculate",
        { basicSalary, hra, otherAllowances }
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            {/* Back Button */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#007bff",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          &larr; Back to Home
        </Link>
      </div>
      
      <h1>Salary Calculator</h1>
      <p>
        Use our <strong>Salary Calculator</strong> to calculate your net take-home salary.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Basic Salary (₹):</label>
          <input
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            required
          />
        </div>
        <div>
          <label>HRA (₹):</label>
          <input
            type="number"
            value={hra}
            onChange={(e) => setHra(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Other Allowances (₹):</label>
          <input
            type="number"
            value={otherAllowances}
            onChange={(e) => setOtherAllowances(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Calculate Salary
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>Net Salary: ₹{result.netSalary}</p>
          <p>Total Deductions: ₹{result.deductions}</p>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginBottom: "10px" }}>
          <h3>What is net salary?</h3>
          <p>Net salary is the take-home pay after all deductions including taxes.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>What are common deductions?</h3>
          <p>Tax, provident fund, insurance, and other company deductions.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>Can I include allowances?</h3>
          <p>Yes, HRA and other allowances can be added for net salary calculation.</p>
        </div>
      </div>

      {/* Internal Linking */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
        }}
      >
        <h3>Try Other Finance Calculators</h3>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          <li>
            <Link to="/emi-calculator">EMI Calculator</Link>
          </li>
          <li>
            <Link to="/sip-calculator">SIP Calculator</Link>
          </li>
          <li>
            <Link to="/fd-calculator">FD Calculator</Link>
          </li>
          <li>
            <Link to="/income-tax-calculator">Income Tax Calculator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
