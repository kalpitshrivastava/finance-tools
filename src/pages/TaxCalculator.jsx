import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "Income Tax Calculator Online | 2025";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Calculate your income tax for FY 2025 instantly. Get tax liability and deductions using our free income tax calculator."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/tax/calculate",
        { income }
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
            borderRadius: "4px",
          }}
        >
          &larr; Back to Home
        </Link>
      </div>

      <h1>Income Tax Calculator</h1>
      <p>
        Use our <strong>Income Tax Calculator</strong> to estimate your tax liability for FY 2025.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Annual Income (₹):</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Calculate Tax
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>Tax Payable: ₹{result.tax}</p>
          <p>Net Income After Tax: ₹{result.netIncome}</p>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginBottom: "10px" }}>
          <h3>What is income tax?</h3>
          <p>Income tax is the tax levied by government on individual or corporate income.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>How is tax calculated?</h3>
          <p>Tax is calculated based on income slabs, deductions, and exemptions.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>Can I claim deductions?</h3>
          <p>Yes, deductions reduce taxable income and tax payable.</p>
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
            <Link to="/salary-calculator">Salary Calculator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
