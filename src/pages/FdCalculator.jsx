import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FdCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenureMonths, setTenureMonths] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "FD Calculator Online | Fixed Deposit Returns 2025";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Calculate your Fixed Deposit returns instantly. Get maturity amount and interest using our free FD calculator."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/fd/calculate",
        { principal, rate, tenureMonths }
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
      
      <h1>FD Calculator</h1>
      <p>
        Use our <strong>FD Calculator</strong> to calculate returns on your fixed deposit.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Principal (₹):</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rate of Interest (% per annum):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tenure (Months):</label>
          <input
            type="number"
            value={tenureMonths}
            onChange={(e) => setTenureMonths(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Calculate FD
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>Maturity Amount: ₹{result.maturityAmount}</p>
          <p>Total Interest: ₹{result.totalInterest}</p>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginBottom: "10px" }}>
          <h3>What is FD?</h3>
          <p>Fixed Deposit (FD) is a financial instrument providing fixed interest over a tenure.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>How is FD calculated?</h3>
          <p>Maturity amount is calculated using principal, interest rate, and tenure with compounding.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>Can I withdraw FD early?</h3>
          <p>Early withdrawal may incur penalties and lower interest.</p>
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
            <Link to="/income-tax-calculator">Income Tax Calculator</Link>
          </li>
          <li>
            <Link to="/salary-calculator">Salary Calculator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
