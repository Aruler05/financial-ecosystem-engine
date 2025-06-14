
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Wallet } from "lucide-react";

interface Loan {
  id: number;
  name: string;
  currentBalance: number;
  monthlyPayment: number;
  nextPaymentDate: string;
}

interface LoanSummaryCardsProps {
  loans: Loan[];
}

export const LoanSummaryCards = ({ loans }: LoanSummaryCardsProps) => {
  const totalBalance = loans.reduce((sum, loan) => sum + loan.currentBalance, 0);
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const activeLoanCount = loans.length;
  const nextPaymentDate = loans.reduce((earliest, loan) => {
    return !earliest ? loan.nextPaymentDate : earliest < loan.nextPaymentDate ? earliest : loan.nextPaymentDate;
  }, "");
  const nextPaymentLoan = loans.find(loan => loan.nextPaymentDate === nextPaymentDate);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Active Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{activeLoanCount}</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-gray/10">
              <Wallet className="h-5 w-5 text-finance-gray" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {loans.length > 0 ? `${loans.map(loan => loan.name).join(", ")}` : "No active loans"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={totalBalance} />
            </div>
            <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
              {activeLoanCount} loans
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Outstanding principal</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Monthly Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={totalMonthlyPayment} />
            </div>
            <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
              Combined
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Total monthly outflow</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Next Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{nextPaymentDate}</div>
            <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
              Upcoming
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {nextPaymentLoan ? nextPaymentLoan.name : "No payments scheduled"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
