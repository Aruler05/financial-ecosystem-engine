
import React from "react";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
}

export function CurrencyDisplay({ amount, className }: CurrencyDisplayProps) {
  const { currencySymbol } = useCurrency();
  
  // Format the number with commas and 2 decimal places
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return (
    <span className={className}>
      <span className="currency-symbol">{currencySymbol}</span>{formattedAmount}
    </span>
  );
}
