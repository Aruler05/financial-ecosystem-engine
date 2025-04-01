import React from "react";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CurrencyDisplayProps {
  amount: number;
  showSymbol?: boolean;
  className?: string;
}

export function CurrencyDisplay({ 
  amount, 
  showSymbol = true, 
  className 
}: CurrencyDisplayProps) {
  const { currencySymbol } = useCurrency();
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={className}>
      {showSymbol && currencySymbol}{formattedAmount}
    </span>
  );
}
