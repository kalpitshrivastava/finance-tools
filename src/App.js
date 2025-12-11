import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmiCalculator from "./pages/EmiCalculator";
import SipCalculator from "./pages/SipCalculator";
import FdCalculator from "./pages/FdCalculator";
import TaxCalculator from "./pages/TaxCalculator";
import SalaryCalculator from "./pages/SalaryCalculator";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emi-calculator" element={<EmiCalculator />} />
        <Route path="/sip-calculator" element={<SipCalculator />} />
        <Route path="/fd-calculator" element={<FdCalculator />} />
        <Route path="/income-tax-calculator" element={<TaxCalculator />} />
        <Route path="/salary-calculator" element={<SalaryCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
