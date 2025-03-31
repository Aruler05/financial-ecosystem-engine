
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppSidebar";
import Dashboard from "@/pages/Dashboard";
import ExpenseTracker from "@/pages/ExpenseTracker";
import IncomeTracker from "@/pages/IncomeTracker";
import BudgetTracker from "@/pages/BudgetTracker";
import BillTracker from "@/pages/BillTracker";
import SavingsTracker from "@/pages/SavingsTracker";
import InvestmentTracker from "@/pages/InvestmentTracker";
import DebtTracker from "@/pages/DebtTracker";
import LoanTracker from "@/pages/LoanTracker";
import ReportsAnalytics from "@/pages/ReportsAnalytics";
import NotFound from "@/pages/NotFound";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import "./App.css";

function App() {
  return (
    <CurrencyProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseTracker />} />
          <Route path="/income" element={<IncomeTracker />} />
          <Route path="/budget" element={<BudgetTracker />} />
          <Route path="/bills" element={<BillTracker />} />
          <Route path="/savings" element={<SavingsTracker />} />
          <Route path="/investments" element={<InvestmentTracker />} />
          <Route path="/debt" element={<DebtTracker />} />
          <Route path="/loans" element={<LoanTracker />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </CurrencyProvider>
  );
}

export default App;
