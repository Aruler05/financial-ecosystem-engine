
import React, { createContext, useContext, useState } from "react";

type CurrencySymbol = "$" | "€" | "£" | "¥" | "₹" | "₽" | "₣" | "₩" | "₺" | "₴" | "₦" | "₱" | "฿" | "₫" | "₲" | "₡" | "₸";

interface CurrencyContextType {
  currencySymbol: CurrencySymbol;
  setCurrencySymbol: (symbol: CurrencySymbol) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Get the saved currency from localStorage or use "₹" (Indian Rupee) as default
  const [currencySymbol, setCurrencySymbolState] = useState<CurrencySymbol>(() => {
    try {
      const savedCurrency = localStorage.getItem('preferredCurrency');
      return savedCurrency && isCurrencySymbol(savedCurrency) ? savedCurrency as CurrencySymbol : "₹";
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return "₹";
    }
  });

  const setCurrencySymbol = (symbol: CurrencySymbol) => {
    setCurrencySymbolState(symbol);
    try {
      localStorage.setItem('preferredCurrency', symbol);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currencySymbol, setCurrencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Type guard to ensure the value is a valid CurrencySymbol
function isCurrencySymbol(value: string): value is CurrencySymbol {
  const validSymbols: string[] = ["$", "€", "£", "¥", "₹", "₽", "₣", "₩", "₺", "₴", "₦", "₱", "฿", "₫", "₲", "₡", "₸"];
  return validSymbols.includes(value);
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
