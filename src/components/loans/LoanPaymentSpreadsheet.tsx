
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-4xl p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-lg font-semibold text-left">
              Payment Schedule - {loan.name}
            </SheetTitle>
            <SheetDescription className="text-sm text-left">
              Detailed amortization schedule showing all payments, principal, and interest breakdown
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* Loan Summary */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Loan Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Lender:</span>
                          <span className="font-medium text-right truncate ml-2 max-w-[60%]">{loan.lender}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Rate:</span>
                          <span className="font-medium">{loan.interestRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Type:</span>
                          <Badge variant="outline" className="text-xs h-5">{loan.loanType}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <CurrencyDisplay amount={loan.currentBalance} />
                      </div>
                      <p className="text-xs text-muted-foreground">Remaining principal</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Interest</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        <CurrencyDisplay amount={totalInterest} />
                      </div>
                      <p className="text-xs text-muted-foreground">Over life of loan</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <CurrencyDisplay amount={totalPayments} />
                      </div>
                      <p className="text-xs text-muted-foreground">{paymentSchedule.length} payments</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Schedule Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Amortization Schedule</CardTitle>
                    <CardDescription className="text-sm">
                      Monthly payment breakdown showing principal and interest allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-left">Payment #</TableHead>
                            <TableHead className="text-left">Date</TableHead>
                            <TableHead className="text-right">Beginning Balance</TableHead>
                            <TableHead className="text-right">Payment Amount</TableHead>
                            <TableHead className="text-right">Principal</TableHead>
                            <TableHead className="text-right">Interest</TableHead>
                            <TableHead className="text-right">Ending Balance</TableHead>
                            <TableHead className="text-right">Cumulative Interest</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paymentSchedule.map((payment) => (
                            <TableRow key={payment.paymentNumber}>
                              <TableCell className="font-medium">
                                {payment.paymentNumber}
                              </TableCell>
                              <TableCell>{payment.paymentDate}</TableCell>
                              <TableCell className="text-right">
                                <CurrencyDisplay amount={payment.beginningBalance} />
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                <CurrencyDisplay amount={payment.paymentAmount} />
                              </TableCell>
                              <TableCell className="text-right text-green-600">
                                <CurrencyDisplay amount={payment.principalPayment} />
                              </TableCell>
                              <TableCell className="text-right text-red-600">
                                <CurrencyDisplay amount={payment.interestPayment} />
                              </TableCell>
                              <TableCell className="text-right">
                                <CurrencyDisplay amount={payment.endingBalance} />
                              </TableCell>
                              <TableCell className="text-right text-muted-foreground">
                                <CurrencyDisplay amount={payment.cumulativeInterest} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LoanPaymentSpreadsheet;
