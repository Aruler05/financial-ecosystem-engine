
import React from "react";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
  showSymbol?: boolean;
}

export function CurrencyDisplay({ amount, className, showSymbol = true }: CurrencyDisplayProps) {
  const { currencySymbol } = useCurrency();
  
  // Format the number with commas and 2 decimal places
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return (
    <span className={className}>
      {showSymbol && <span className="currency-symbol mr-0.5">{currencySymbol}</span>}{formattedAmount}
    </span>
  );
}
