
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Badge } from "@/components/ui/badge";

interface PaymentScheduleEntry {
  paymentNumber: number;
  paymentDate: string;
  beginningBalance: number;
  paymentAmount: number;
  principalPayment: number;
  interestPayment: number;
  endingBalance: number;
  cumulativeInterest: number;
}

interface Loan {
  id: number;
  name: string;
  lender: string;
  originalAmount: number;
  currentBalance: number;
  monthlyPayment: number;
  interestRate: number;
  loanType: string;
  startDate: string;
}

interface LoanPaymentSpreadsheetProps {
  loan: Loan | null;
  isOpen: boolean;
  onClose: () => void;
}

const LoanPaymentSpreadsheet = ({ loan, isOpen, onClose }: LoanPaymentSpreadsheetProps) => {
  if (!loan) return null;

  // Calculate amortization schedule
  const calculateAmortizationSchedule = (): PaymentScheduleEntry[] => {
    const monthlyRate = loan.interestRate / 100 / 12;
    const balance = loan.currentBalance;
    const payment = loan.monthlyPayment;
    const schedule: PaymentScheduleEntry[] = [];
    
    let currentBalance = balance;
    let cumulativeInterest = 0;
    let paymentNumber = 1;
    
    // Start from current date
    const startDate = new Date();
    
    while (currentBalance > 0.01 && paymentNumber <= 360) { // Max 30 years
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = Math.min(payment - interestPayment, currentBalance);
      const endingBalance = Math.max(0, currentBalance - principalPayment);
      
      cumulativeInterest += interestPayment;
      
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + paymentNumber - 1);
      
      schedule.push({
        paymentNumber,
        paymentDate: paymentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        }),
        beginningBalance: currentBalance,
        paymentAmount: principalPayment + interestPayment,
        principalPayment,
        interestPayment,
        endingBalance,
        cumulativeInterest
      });
      
      currentBalance = endingBalance;
      paymentNumber++;
    }
    
    return schedule;
  };

  const paymentSchedule = calculateAmortizationSchedule();
  const totalInterest = paymentSchedule[paymentSchedule.length - 1]?.cumulativeInterest || 0;
  const totalPayments = paymentSchedule.reduce((sum, payment) => sum + payment.paymentAmount, 0);
  const totalPrincipal = paymentSchedule.reduce((sum, payment) => sum + payment.principalPayment, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] max-h-[95vh] p-4 sm:p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-lg sm:text-xl font-semibold line-clamp-2">
            Payment Schedule - {loan.name}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Detailed amortization schedule showing all payments, principal, and interest breakdown
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 overflow-hidden">
          {/* Loan Summary */}
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lender:</span>
                    <span className="font-medium text-right truncate ml-1 max-w-[60%]">{loan.lender}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-medium">{loan.interestRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline" className="text-[10px] sm:text-xs h-4 sm:h-5">{loan.loanType}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  <CurrencyDisplay amount={loan.currentBalance} />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Remaining principal</p>
              </CardContent>
            </Card>

            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-finance-red">
                  <CurrencyDisplay amount={totalInterest} />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Over life of loan</p>
              </CardContent>
            </Card>

            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  <CurrencyDisplay amount={totalPayments} />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{paymentSchedule.length} payments</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Schedule Table */}
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">Amortization Schedule</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Monthly payment breakdown showing principal and interest allocation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px] sm:h-[400px] w-full">
                <div className="overflow-x-auto">
                  <Table className="min-w-[800px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px] sm:w-[80px] text-xs sm:text-sm">Payment #</TableHead>
                        <TableHead className="w-[80px] sm:w-[100px] text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Beginning Balance</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Payment Amount</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Principal</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Interest</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Ending Balance</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Cumulative Interest</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentSchedule.map((payment) => (
                        <TableRow key={payment.paymentNumber}>
                          <TableCell className="font-medium text-xs sm:text-sm">
                            {payment.paymentNumber}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">{payment.paymentDate}</TableCell>
                          <TableCell className="text-right text-xs sm:text-sm">
                            <CurrencyDisplay amount={payment.beginningBalance} />
                          </TableCell>
                          <TableCell className="text-right font-medium text-xs sm:text-sm">
                            <CurrencyDisplay amount={payment.paymentAmount} />
                          </TableCell>
                          <TableCell className="text-right text-finance-green text-xs sm:text-sm">
                            <CurrencyDisplay amount={payment.principalPayment} />
                          </TableCell>
                          <TableCell className="text-right text-finance-red text-xs sm:text-sm">
                            <CurrencyDisplay amount={payment.interestPayment} />
                          </TableCell>
                          <TableCell className="text-right text-xs sm:text-sm">
                            <CurrencyDisplay amount={payment.endingBalance} />
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground text-xs sm:text-sm">
                            <CurrencyDisplay amount={payment.cumulativeInterest} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanPaymentSpreadsheet;
