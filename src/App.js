import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import EmiCalculator from "./pages/EmiCalculator";
import SipCalculator from "./pages/SipCalculator";
import FdCalculator from "./pages/FdCalculator";
import TaxCalculator from "./pages/TaxCalculator";
import SalaryCalculator from "./pages/SalaryCalculator";
import LifeCycleMoneyFlow from "./pages/lifecyclemoneyflowcal";
import MiniGame from "./pages/MiniGame";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* 🔹 HEADER (VISIBLE ON ALL PAGES) */}
      <Header />

      {/* 🔹 PAGE CONTENT */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/emi-calculator" element={<EmiCalculator />} />
        <Route path="/sip-calculator" element={<SipCalculator />} />
        <Route path="/fd-calculator" element={<FdCalculator />} />
        <Route path="/income-tax-calculator" element={<TaxCalculator />} />
        <Route path="/salary-calculator" element={<SalaryCalculator />} />
        <Route path="/money-flow-calculator" element={<LifeCycleMoneyFlow />} />
        <Route path="/mini-game" element={<MiniGame />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: 40, textAlign: "center" }}>
              <h2>404 – Page Not Found</h2>
            </div>
          }
        />
      </Routes>

      {/* 🔹 FOOTER (VISIBLE ON ALL PAGES) */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
