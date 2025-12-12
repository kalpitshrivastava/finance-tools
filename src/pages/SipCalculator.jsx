import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [result, setResult] = useState(null);
 const API_URL = process.env.REACT_APP_API_URL ;
 
  useEffect(() => {
    document.title = "SIP Calculator Online | Plan Your Investments";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Plan your SIP investments easily. Calculate expected corpus, returns, and investment using our SIP calculator."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API_URL}/api/sip/calculate`, {
      monthlyInvestment: parseFloat(monthlyInvestment),
      annualInterestRate: parseFloat(rateOfReturn),
      years: parseInt(tenureYears),
    });
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
      
      <h1>SIP Calculator</h1>
      <p>
        Use our <strong>SIP Calculator</strong> to estimate your investment
        growth over time. Enter monthly investment, expected return, and tenure.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Monthly Investment (₹):</label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expected Rate of Return (% per annum):</label>
          <input
            type="number"
            value={rateOfReturn}
            onChange={(e) => setRateOfReturn(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tenure (Years):</label>
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Calculate SIP
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>Expected Corpus: ₹{result.corpus}</p>
          <p>Total Investment: ₹{result.investment}</p>
          <p>Estimated Returns: ₹{result.returns}</p>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginBottom: "10px" }}>
          <h3>What is SIP?</h3>
          <p>SIP is a method of investing a fixed sum regularly in mutual funds.</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>How is SIP corpus calculated?</h3>
          <p>
            Using future value formula considering monthly investment, tenure, and
            expected returns.
          </p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3>Can I change SIP amount?</h3>
          <p>Yes, you can increase or decrease SIP anytime.</p>
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
            <Link to="/fd-calculator">FD Calculator</Link>
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
