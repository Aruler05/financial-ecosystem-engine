
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Initial mock data
const initialDebtSummary = {
  totalDebt: 32450.00,
  monthlyPayment: 876.00,
  incomePercentage: 21,
  avgInterestRate: 14.2,
  debtToIncome: 35
};

const initialDebts = [
  {
    name: "Credit Card - Chase",
    interestRate: 18.99,
    balance: 4250.00,
    minPayment: 85.00,
    percentUsed: 85,
    limit: 5000.00,
    color: "bg-finance-red"
  },
  {
    name: "Car Loan",
    interestRate: 4.5,
    balance: 12400.00,
    minPayment: 341.00,
    percentPaid: 38,
    monthsRemaining: 32,
    color: "bg-finance-blue"
  },
  {
    name: "Student Loan",
    interestRate: 5.8,
    balance: 15800.00,
    minPayment: 230.00,
    percentPaid: 47,
    yearsRemaining: 6.5,
    color: "bg-finance-green"
  }
];

// Payment methods
const paymentMethods = [
  "Avalanche Method",
  "Snowball Method",
  "Balance Transfer",
  "Consolidation Loan",
  "Minimum Payments"
];

// Debt types
const debtTypes = [
  "Credit Card",
  "Personal Loan",
  "Auto Loan",
  "Student Loan",
  "Mortgage",
  "Medical Debt",
  "Other"
];

const DebtTracker = () => {
  const [debtSummary, setDebtSummary] = useState(initialDebtSummary);
  const [debts, setDebts] = useState(initialDebts);
  const [showAddDebt, setShowAddDebt] = useState(false);
  const [newDebt, setNewDebt] = useState({
    name: "",
    type: "",
    balance: "",
    interestRate: "",
    minPayment: "",
    limit: ""
  });
  const { toast } = useToast();

  const handleAddDebt = () => {
    if (!newDebt.name || !newDebt.balance || !newDebt.interestRate || !newDebt.minPayment) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Add new debt logic would go here
    setShowAddDebt(false);
    
    toast({
      title: "Debt added",
      description: "Your debt has been successfully added."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDebt(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewDebt(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Debt Management</h1>
          <p className="text-muted-foreground">Track and strategize your debt repayment.</p>
        </div>
        <Dialog open={showAddDebt} onOpenChange={setShowAddDebt}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Debt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Debt</DialogTitle>
              <DialogDescription>
                Enter the details of your debt below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Debt Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter debt name"
                    value={newDebt.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Debt Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {debtTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance</Label>
                  <Input
                    id="balance"
                    name="balance"
                    type="number"
                    placeholder="0.00"
                    value={newDebt.balance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    placeholder="0.0"
                    value={newDebt.interestRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPayment">Minimum Payment</Label>
                  <Input
                    id="minPayment"
                    name="minPayment"
                    type="number"
                    placeholder="0.00"
                    value={newDebt.minPayment}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Credit Limit (if applicable)</Label>
                  <Input
                    id="limit"
                    name="limit"
                    type="number"
                    placeholder="0.00"
                    value={newDebt.limit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDebt(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDebt}>Save Debt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={debtSummary.totalDebt} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-yellow/10">
                <BadgeDollarSign className="h-5 w-5 text-finance-yellow" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={debtSummary.monthlyPayment} />
              </div>
              <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
                {debtSummary.incomePercentage}% of income
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Minimum required payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Avg. Interest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{debtSummary.avgInterestRate}%</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                Weighted avg.
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Across all debts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Debt-to-Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{debtSummary.debtToIncome}%</div>
              <div className="rounded bg-finance-orange/10 px-2 py-1 text-xs font-medium text-finance-orange">
                Moderate
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total debt / annual income</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Debt Breakdown</CardTitle>
            <CardDescription>All your current debts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {debts.map((debt, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{debt.name}</h3>
                    <p className="text-sm text-muted-foreground">{debt.interestRate}% APR</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      <CurrencyDisplay amount={debt.balance} />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Min: <CurrencyDisplay amount={debt.minPayment} />/mo
                    </p>
                  </div>
                </div>
                <Progress 
                  value={debt.percentUsed || debt.percentPaid} 
                  className="h-2 bg-muted" 
                  indicatorClassName={debt.color} 
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {debt.limit ? (
                    <>
                      <span><CurrencyDisplay amount={debt.balance} /> balance</span>
                      <span><CurrencyDisplay amount={debt.limit} /> limit ({debt.percentUsed}% used)</span>
                    </>
                  ) : (
                    <>
                      <span>{debt.percentPaid}% paid off</span>
                      <span>
                        {debt.monthsRemaining ? `${debt.monthsRemaining} months remaining` : `${debt.yearsRemaining} years remaining`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debt Payoff Plan</CardTitle>
            <CardDescription>AI-recommended payoff strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-lg border border-finance-yellow/20 bg-finance-yellow/5 p-4">
              <h3 className="mb-2 font-medium">Avalanche Method Recommended</h3>
              <p className="text-sm text-muted-foreground">
                Pay minimum on all debts, and put extra money toward the highest-interest debt first. This will save you the most in interest payments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium">Step 1: Pay off Credit Card</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Current: <CurrencyDisplay amount={4250.00} /></span>
                  <span>18.99% APR</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Minimum: <CurrencyDisplay amount={85} />/mo</span>
                  <span className="text-sm font-medium text-finance-green">Recommended: <CurrencyDisplay amount={300} />/mo</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Payoff time: ~16 months (vs 72 months at minimum payment)
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium">Step 2: Pay off Student Loan</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Current: <CurrencyDisplay amount={15800.00} /></span>
                  <span>5.8% APR</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Minimum: <CurrencyDisplay amount={230} />/mo</span>
                  <span className="text-sm font-medium text-muted-foreground">Next priority</span>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium">Step 3: Pay off Car Loan</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Current: <CurrencyDisplay amount={12400.00} /></span>
                  <span>4.5% APR</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Minimum: <CurrencyDisplay amount={341} />/mo</span>
                  <span className="text-sm font-medium text-muted-foreground">Final priority</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button className="w-full">Apply Extra Payment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebtTracker;
