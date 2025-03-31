
import React, { createContext, useContext, useState } from "react";

type CurrencySymbol = "$" | "€" | "£" | "¥" | "₹" | "₽" | "₣" | "₩" | "₺" | "₴" | "₦" | "₱" | "฿" | "₫" | "₲" | "₡" | "₸";

interface CurrencyContextType {
  currencySymbol: CurrencySymbol;
  setCurrencySymbol: (symbol: CurrencySymbol) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencySymbol, setCurrencySymbol] = useState<CurrencySymbol>("$");

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
