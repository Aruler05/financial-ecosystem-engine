
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/contexts/CurrencyContext";
import { DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleCurrencyChange = (value: string) => {
    setCurrencySymbol(value as any);
    
    // Show toast to confirm currency change
    toast({
      title: "Currency updated",
      description: `Currency changed to ${value}`,
    });
  };

  return (
    <div className="flex items-center gap-2 rounded-lg p-2 bg-slate-100 dark:bg-slate-800">
      <DollarSign className="h-4 w-4 text-primary" />
      <Select
        value={currencySymbol}
        onValueChange={handleCurrencyChange}
      >
        <SelectTrigger className="w-[150px] border-none bg-transparent text-primary font-medium">
          <SelectValue placeholder="Select Currency" className="text-primary" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          {currencies.map((currency) => (
            <SelectItem key={currency.symbol} value={currency.symbol}>
              <span className="font-medium">{currency.symbol}</span> - {currency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
