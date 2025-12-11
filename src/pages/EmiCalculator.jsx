import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureMonths, setTenureMonths] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "EMI Calculator Online | Home Loan EMI 2025";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Calculate EMI for home, car, personal loans instantly. Get monthly installment, total interest, and total payment using our free EMI calculator."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/emi/calculate",
        { loanAmount, interestRate, tenureMonths }
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
      
      <h1>EMI Calculator</h1>
      <p>
        Use our <strong>EMI Calculator</strong> to quickly calculate monthly
        payments for <strong>home loans</strong>, <strong>car loans</strong>, and{" "}
        <strong>personal loans</strong>.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Loan Amount:</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Interest Rate (% per annum):</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
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
          Calculate EMI
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>EMI: ₹{result.emi}</p>
          <p>Total Interest: ₹{result.totalInterest}</p>
          <p>Total Amount Payable: ₹{result.totalAmount}</p>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Frequently Asked Questions</h2>

        <div style={{ marginBottom: "10px" }}>
          <h3>What is EMI?</h3>
          <p>
            EMI (Equated Monthly Installment) is the fixed monthly payment you
            make to repay a loan.
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>How is EMI calculated?</h3>
          <p>
            EMI = P × r × (1+r)^N / ((1+r)^N - 1), where P = loan amount, r =
            monthly interest rate, N = number of months.
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Can I prepay my loan?</h3>
          <p>Yes, prepayment reduces your principal and interest.</p>
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
            <Link to="/sip-calculator">SIP Calculator</Link>
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
