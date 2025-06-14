
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { DeleteButton } from "@/components/DeleteConfirmDialog";
import { Edit, Calculator, Plus } from "lucide-react";

interface Loan {
  id: number;
  name: string;
  lender: string;
  originalAmount: number;
  currentBalance: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  interestRate: number;
  loanType: string;
  startDate: string;
  percentPaid: number;
  remainingTimeText: string;
  indicatorClass: string;
  tenureMonths?: number;
}

interface LoanDetailsListProps {
  loans: Loan[];
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  onRefinanceClick: (id: number) => void;
  onExtraPaymentClick: (id: number) => void;
  onViewPaymentSchedule: (loan: Loan) => void;
  onAddLoan: () => void;
}

export const LoanDetailsList = ({
  loans,
  onEditClick,
  onDeleteClick,
  onRefinanceClick,
  onExtraPaymentClick,
  onViewPaymentSchedule,
  onAddLoan
}: LoanDetailsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
        <CardDescription>Overview of your active loans</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {loans.map((loan) => (
            <div key={loan.id} className="rounded-lg border p-6">
              {/* Loan Header */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg leading-tight mb-2">{loan.name}</h3>
                  <p className="text-sm text-muted-foreground">{loan.lender}</p>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  {/* Loan Tags */}
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full bg-finance-blue/10 px-3 py-1 text-xs font-medium text-finance-blue">
                      {loan.loanType}
                    </div>
                    <div className="rounded-full bg-finance-green/10 px-3 py-1 text-xs font-medium text-finance-green">
                      {loan.interestRate}% APR
                    </div>
                    {loan.tenureMonths && (
                      <div className="rounded-full bg-finance-purple/10 px-3 py-1 text-xs font-medium text-finance-purple">
                        {loan.tenureMonths} months
                      </div>
                    )}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => onViewPaymentSchedule(loan)}
                      title="View payment schedule"
                    >
                      <Calculator className="h-4 w-4" />
                      <span className="sr-only">View Payment Schedule</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => onEditClick(loan.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <DeleteButton onClick={() => onDeleteClick(loan.id)} />
                  </div>
                </div>
              </div>
              
              {/* Loan Financial Details */}
              <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Original Amount</p>
                  <p className="font-semibold text-base">
                    <CurrencyDisplay amount={loan.originalAmount} />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                  <p className="font-semibold text-base">
                    <CurrencyDisplay amount={loan.currentBalance} />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="font-semibold text-base">
                    <CurrencyDisplay amount={loan.monthlyPayment} />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Payment</p>
                  <p className="font-semibold text-base">{loan.nextPaymentDate}</p>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Loan Progress</span>
                  <span className="text-sm font-semibold text-primary">{loan.percentPaid.toFixed(1)}% paid off</span>
                </div>
                <Progress 
                  value={loan.percentPaid} 
                  className="h-3 bg-muted" 
                  indicatorClassName={loan.indicatorClass} 
                />
                <div className="flex justify-between items-start text-xs text-muted-foreground">
                  <span className="flex-1 leading-relaxed">{loan.remainingTimeText}</span>
                  <span className="flex-shrink-0 ml-4">Started: {loan.startDate}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2 sm:flex-row">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onRefinanceClick(loan.id)}
                  >
                    Refinance Loan
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onExtraPaymentClick(loan.id)}
                  >
                    Make Extra Payment
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {loans.length === 0 && (
            <div className="rounded-lg border p-12 text-center">
              <div className="max-w-sm mx-auto">
                <h3 className="font-semibold text-lg mb-2">No loans added yet</h3>
                <p className="text-muted-foreground mb-4">Get started by adding your first loan to track payments and progress.</p>
                <Button onClick={onAddLoan}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Loan
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
