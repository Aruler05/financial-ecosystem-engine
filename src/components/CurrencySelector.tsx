
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/contexts/CurrencyContext";

const currencies = [
  { symbol: "$", name: "US Dollar" },
  { symbol: "€", name: "Euro" },
  { symbol: "£", name: "British Pound" },
  { symbol: "¥", name: "Japanese Yen" },
  { symbol: "₹", name: "Indian Rupee" },
  { symbol: "₽", name: "Russian Ruble" },
  { symbol: "₣", name: "Swiss Franc" },
  { symbol: "₩", name: "Korean Won" },
  { symbol: "₺", name: "Turkish Lira" },
  { symbol: "₴", name: "Ukrainian Hryvnia" },
  { symbol: "₦", name: "Nigerian Naira" },
  { symbol: "₱", name: "Philippine Peso" },
  { symbol: "฿", name: "Thai Baht" },
  { symbol: "₫", name: "Vietnamese Dong" },
];

export function CurrencySelector() {
  const { currencySymbol, setCurrencySymbol } = useCurrency();

  return (
    <Select
      value={currencySymbol}
      onValueChange={(value) => setCurrencySymbol(value as any)}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.symbol} value={currency.symbol}>
            {currency.symbol} - {currency.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
