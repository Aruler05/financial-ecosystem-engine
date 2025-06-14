
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
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Payment Schedule - {loan.name}</DialogTitle>
          <DialogDescription>
            Detailed amortization schedule showing all payments, principal, and interest breakdown
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Loan Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Loan Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lender:</span>
                    <span className="font-medium">{loan.lender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span className="font-medium">{loan.interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <Badge variant="outline" className="text-xs">{loan.loanType}</Badge>
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
                <div className="text-2xl font-bold text-finance-red">
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
              <CardTitle>Amortization Schedule</CardTitle>
              <CardDescription>
                Monthly payment breakdown showing principal and interest allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Payment #</TableHead>
                      <TableHead className="w-[100px]">Date</TableHead>
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
                        <TableCell className="text-right text-finance-green">
                          <CurrencyDisplay amount={payment.principalPayment} />
                        </TableCell>
                        <TableCell className="text-right text-finance-red">
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
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanPaymentSpreadsheet;
