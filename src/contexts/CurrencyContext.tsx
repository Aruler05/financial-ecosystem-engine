
import React, { createContext, useContext, useState, useEffect } from "react";

type CurrencySymbol = "$" | "€" | "£" | "¥" | "₹" | "₽" | "₣" | "₩" | "₺" | "₴" | "₦" | "₱" | "฿" | "₫" | "₲" | "₡" | "₸";

interface CurrencyContextType {
  currencySymbol: CurrencySymbol;
  setCurrencySymbol: (symbol: CurrencySymbol) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Get the saved currency from localStorage or use "$" as default
  const [currencySymbol, setCurrencySymbol] = useState<CurrencySymbol>(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    return (savedCurrency as CurrencySymbol) || "$";
  });

  // Save to localStorage whenever currency changes
  useEffect(() => {
    localStorage.setItem('preferredCurrency', currencySymbol);
  }, [currencySymbol]);

  return (
    <CurrencyContext.Provider value={{ currencySymbol, setCurrencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
