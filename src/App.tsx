
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { STORAGE_KEYS, loadData, saveData } from "@/utils/storageService";
import "./App.css";

// App settings type
type AppSettings = {
  darkMode: boolean;
  defaultCurrency: string;
  lastOpenedPage: string;
};

// Default app settings
const defaultSettings: AppSettings = {
  darkMode: false,
  defaultCurrency: "USD",
  lastOpenedPage: "/"
};

function App() {
  // Load app settings on mount
  useEffect(() => {
    // Load app settings from storage
    const settings = loadData(STORAGE_KEYS.SETTINGS, defaultSettings);
    console.log("App settings loaded", settings);
    
    // Save current page on navigation
    const saveCurrentPage = () => {
      const settings = loadData(STORAGE_KEYS.SETTINGS, defaultSettings);
      const currentPath = window.location.pathname;
      saveData(STORAGE_KEYS.SETTINGS, {
        ...settings,
        lastOpenedPage: currentPath
      });
    };
    
    // Add navigation event listeners
    window.addEventListener("beforeunload", saveCurrentPage);
    
    return () => {
      window.removeEventListener("beforeunload", saveCurrentPage);
    };
  }, []);

  return (
    <Router>
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
        <Toaster />
      </CurrencyProvider>
    </Router>
  );
}

export default App;
