import { Link } from "react-router-dom";
import { FaCalculator, FaMoneyBillWave, FaPiggyBank, FaFileInvoiceDollar, FaWallet, FaGamepad } from "react-icons/fa";
import { useEffect } from "react";

export default function Home() {
  const calculators = [
    {
      name: "EMI Calculator",
      description: "Calculate monthly payments for home, car, or personal loans.",
      link: "/emi-calculator",
      icon: <FaCalculator size={40} color="#007bff" />,
    },
    {
      name: "SIP Calculator",
      description: "Plan your SIP investments and estimate returns over time.",
      link: "/sip-calculator",
      icon: <FaMoneyBillWave size={40} color="#28a745" />,
    },
    {
      name: "FD Calculator",
      description: "Calculate your fixed deposit maturity amount and interest.",
      link: "/fd-calculator",
      icon: <FaPiggyBank size={40} color="#ffc107" />,
    },
    {
      name: "Income Tax Calculator",
      description: "Estimate your income tax and net income after tax.",
      link: "/income-tax-calculator",
      icon: <FaFileInvoiceDollar size={40} color="#dc3545" />,
    },
    {
      name: "Salary Calculator",
      description: "Calculate your net salary including allowances and deductions.",
      link: "/salary-calculator",
      icon: <FaWallet size={40} color="#17a2b8" />,
    },
    
        {
      name: "Mini Game",
      description: "Play a fun little number guessing game!",
      link: "/mini-game",
      icon: <FaGamepad size={40} color="#9b59b6" />,
    },
  ];


  useEffect(() => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Finance Tools Online",
    "description": "Free online calculators for EMI, SIP, FD, Income Tax, and Salary. Plan your finances efficiently.",
    "mainEntity": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What calculators are available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "EMI Calculator, SIP Calculator, FD Calculator, Income Tax Calculator, and Salary Calculator."
            }
          },
          {
            "@type": "Question",
            "name": "Are these calculators free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all calculators are completely free and provide instant results."
            }
          }
        ]
      }
    ]
  });
  document.head.appendChild(script);
}, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(90deg, #007bff, #00c6ff)",
          color: "#fff",
          padding: "20px 20px",
          textAlign: "center",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "5px" }}>Finance Calculators Online</h1>
        <p style={{ fontSize: "1.2rem" }}>
          Calculate EMI, SIP, FD, Income Tax, and Salary instantly with our free, easy-to-use tools.
        </p>
      </div>

      {/* Calculators Grid */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {calculators.map((calc, index) => (
          <Link
            key={index}
            to={calc.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                padding: "25px",
                backgroundColor: "#f8f9fa",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              {calc.icon}
              <h2 style={{ margin: "15px 0 10px 0" }}>{calc.name}</h2>
              <p style={{ color: "#555" }}>{calc.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer / CTA */}
      <div style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
        <p>
          All calculators are free to use and help you plan your finances better.
        </p>
        <p>&copy; 2025 Finance Tools</p>
      </div>
    </div>
  );
}
