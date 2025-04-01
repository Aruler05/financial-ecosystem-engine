
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, Pencil, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

const initialLoans = [
  {
    id: 1,
    name: "Mortgage Loan",
    lender: "Home First Bank",
    type: "Fixed Rate",
    interestRate: 3.75,
    originalAmount: 320000.00,
    currentBalance: 215600.00,
    monthlyPayment: 985.00,
    nextPayment: "2023-07-01",
    progressPercent: 32.6,
    remainingTerm: "21 years 4 months",
    startDate: "May 2018"
  },
  {
    id: 2,
    name: "Auto Loan",
    lender: "Reliable Auto Finance",
    type: "Fixed Rate",
    interestRate: 4.5,
    originalAmount: 20000.00,
    currentBalance: 12400.00,
    monthlyPayment: 341.00,
    nextPayment: "2023-07-15",
    progressPercent: 38,
    remainingTerm: "32 months",
    startDate: "Oct 2021"
  },
  {
    id: 3,
    name: "Personal Loan",
    lender: "Community Credit Union",
    type: "Fixed Rate",
    interestRate: 8.25,
    originalAmount: 10000.00,
    currentBalance: 7800.00,
    monthlyPayment: 230.00,
    nextPayment: "2023-07-05",
    progressPercent: 22,
    remainingTerm: "36 months",
    startDate: "Jan 2023"
  }
];

const loanTypes = [
  "Fixed Rate",
  "Variable Rate",
  "Interest Only",
  "Balloon",
  "Bridge Loan",
  "Line of Credit"
];

const LoanTracker = () => {
  const [loans, setLoans] = useState(initialLoans);
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [showEditLoan, setShowEditLoan] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [newLoan, setNewLoan] = useState({
    name: "",
    lender: "",
    type: "",
    interestRate: "",
    originalAmount: "",
    currentBalance: "",
    monthlyPayment: "",
    nextPayment: new Date().toISOString().split('T')[0],
    progressPercent: "",
    remainingTerm: "",
    startDate: ""
  });
  const { toast } = useToast();

  // Calculate summary data
  const activeLoansCount = loans.length;
  const totalLoanBalance = loans.reduce((sum, loan) => sum + loan.currentBalance, 0);
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  
  // Get nearest payment date
  const nextPaymentDate = loans.reduce((nearest, loan) => {
    const paymentDate = new Date(loan.nextPayment);
    return !nearest || paymentDate < nearest ? paymentDate : nearest;
  }, null);
  
  const daysUntilNextPayment = nextPaymentDate ? 
    Math.max(0, Math.ceil((nextPaymentDate - new Date()) / (1000 * 60 * 60 * 24))) : 0;

  const handleAddLoan = () => {
    if (!newLoan.name || !newLoan.lender || !newLoan.type || !newLoan.originalAmount) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const loanToAdd = {
      ...newLoan,
      id: loans.length + 1,
      interestRate: parseFloat(newLoan.interestRate) || 0,
      originalAmount: parseFloat(newLoan.originalAmount) || 0,
      currentBalance: parseFloat(newLoan.currentBalance) || 0,
      monthlyPayment: parseFloat(newLoan.monthlyPayment) || 0,
      progressPercent: parseFloat(newLoan.progressPercent) || 0
    };

    setLoans([...loans, loanToAdd]);
    setShowAddLoan(false);
    setNewLoan({
      name: "",
      lender: "",
      type: "",
      interestRate: "",
      originalAmount: "",
      currentBalance: "",
      monthlyPayment: "",
      nextPayment: new Date().toISOString().split('T')[0],
      progressPercent: "",
      remainingTerm: "",
      startDate: ""
    });

    toast({
      title: "Loan added",
      description: "Your new loan has been added."
    });
  };

  const handleEditLoan = (loan) => {
    setCurrentLoan(loan);
    setNewLoan({
      name: loan.name,
      lender: loan.lender,
      type: loan.type,
      interestRate: loan.interestRate.toString(),
      originalAmount: loan.originalAmount.toString(),
      currentBalance: loan.currentBalance.toString(),
      monthlyPayment: loan.monthlyPayment.toString(),
      nextPayment: loan.nextPayment,
      progressPercent: loan.progressPercent.toString(),
      remainingTerm: loan.remainingTerm,
      startDate: loan.startDate
    });
    setShowEditLoan(true);
  };

  const handleUpdateLoan = () => {
    if (!newLoan.name || !newLoan.lender || !newLoan.type || !newLoan.originalAmount) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedLoan = {
      ...currentLoan,
      name: newLoan.name,
      lender: newLoan.lender,
      type: newLoan.type,
      interestRate: parseFloat(newLoan.interestRate) || 0,
      originalAmount: parseFloat(newLoan.originalAmount) || 0,
      currentBalance: parseFloat(newLoan.currentBalance) || 0,
      monthlyPayment: parseFloat(newLoan.monthlyPayment) || 0,
      nextPayment: newLoan.nextPayment,
      progressPercent: parseFloat(newLoan.progressPercent) || 0,
      remainingTerm: newLoan.remainingTerm,
      startDate: newLoan.startDate
    };

    const updatedLoans = loans.map(loan => 
      loan.id === currentLoan.id ? updatedLoan : loan
    );

    setLoans(updatedLoans);
    setShowEditLoan(false);
    setCurrentLoan(null);
    setNewLoan({
      name: "",
      lender: "",
      type: "",
      interestRate: "",
      originalAmount: "",
      currentBalance: "",
      monthlyPayment: "",
      nextPayment: new Date().toISOString().split('T')[0],
      progressPercent: "",
      remainingTerm: "",
      startDate: ""
    });

    toast({
      title: "Loan updated",
      description: "Your loan has been successfully updated."
    });
  };

  const handleDeleteLoan = (id) => {
    const updatedLoans = loans.filter(loan => loan.id !== id);
    setLoans(updatedLoans);
    
    toast({
      title: "Loan deleted",
      description: "Your loan has been removed."
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewLoan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Tracker</h1>
          <p className="text-muted-foreground">Manage and track your loans in one place.</p>
        </div>
        <Dialog open={showAddLoan} onOpenChange={setShowAddLoan}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Loan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Loan</DialogTitle>
              <DialogDescription>
                Enter the details of your loan below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Loan Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Mortgage"
                    value={newLoan.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lender">Lender</Label>
                  <Input
                    id="lender"
                    name="lender"
                    placeholder="e.g., Bank Name"
                    value={newLoan.lender}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Loan Type</Label>
                  <Select 
                    value={newLoan.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newLoan.interestRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originalAmount">Original Amount</Label>
                  <Input
                    id="originalAmount"
                    name="originalAmount"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.originalAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentBalance">Current Balance</Label>
                  <Input
                    id="currentBalance"
                    name="currentBalance"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.currentBalance}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                  <Input
                    id="monthlyPayment"
                    name="monthlyPayment"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.monthlyPayment}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextPayment">Next Payment Date</Label>
                  <Input
                    id="nextPayment"
                    name="nextPayment"
                    type="date"
                    value={newLoan.nextPayment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="progressPercent">Progress (%)</Label>
                  <Input
                    id="progressPercent"
                    name="progressPercent"
                    type="number"
                    max="100"
                    placeholder="0.0"
                    value={newLoan.progressPercent}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remainingTerm">Remaining Term</Label>
                  <Input
                    id="remainingTerm"
                    name="remainingTerm"
                    placeholder="e.g., 21 years 4 months"
                    value={newLoan.remainingTerm}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  placeholder="e.g., May 2018"
                  value={newLoan.startDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddLoan(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLoan}>Save Loan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Loan Dialog */}
        <Dialog open={showEditLoan} onOpenChange={setShowEditLoan}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Loan</DialogTitle>
              <DialogDescription>
                Update the details of your loan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Loan Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    placeholder="e.g., Mortgage"
                    value={newLoan.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lender">Lender</Label>
                  <Input
                    id="edit-lender"
                    name="lender"
                    placeholder="e.g., Bank Name"
                    value={newLoan.lender}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Loan Type</Label>
                  <Select 
                    value={newLoan.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-interestRate">Interest Rate (%)</Label>
                  <Input
                    id="edit-interestRate"
                    name="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newLoan.interestRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-originalAmount">Original Amount</Label>
                  <Input
                    id="edit-originalAmount"
                    name="originalAmount"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.originalAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-currentBalance">Current Balance</Label>
                  <Input
                    id="edit-currentBalance"
                    name="currentBalance"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.currentBalance}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-monthlyPayment">Monthly Payment</Label>
                  <Input
                    id="edit-monthlyPayment"
                    name="monthlyPayment"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.monthlyPayment}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nextPayment">Next Payment Date</Label>
                  <Input
                    id="edit-nextPayment"
                    name="nextPayment"
                    type="date"
                    value={newLoan.nextPayment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-progressPercent">Progress (%)</Label>
                  <Input
                    id="edit-progressPercent"
                    name="progressPercent"
                    type="number"
                    max="100"
                    placeholder="0.0"
                    value={newLoan.progressPercent}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-remainingTerm">Remaining Term</Label>
                  <Input
                    id="edit-remainingTerm"
                    name="remainingTerm"
                    placeholder="e.g., 21 years 4 months"
                    value={newLoan.remainingTerm}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  name="startDate"
                  placeholder="e.g., May 2018"
                  value={newLoan.startDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditLoan(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateLoan}>Update Loan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{activeLoansCount}</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-gray/10">
                <Wallet className="h-5 w-5 text-finance-gray" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {loans.filter(loan => loan.type === "Fixed Rate").length} personal, 
              {loans.filter(loan => loan.name.includes("Mortgage")).length} mortgage
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
                <CurrencyDisplay amount={totalLoanBalance} />
              </div>
              <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
                {activeLoansCount} loans
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Outstanding principal</p>
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
            <p className="text-xs text-muted-foreground">Total monthly outflow</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {nextPaymentDate ? nextPaymentDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                }) : 'N/A'}
              </div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                {daysUntilNextPayment} days
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {loans.find(loan => loan.nextPayment === (nextPaymentDate?.toISOString().split('T')[0]))?.name || 'No payment'} due
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Overview of your active loans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loans.map((loan) => (
                <div key={loan.id} className="rounded-lg border p-4 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEditLoan(loan)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteLoan(loan.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-2 pr-16">
                    <div>
                      <h3 className="font-medium">{loan.name}</h3>
                      <p className="text-sm text-muted-foreground">{loan.lender}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                        {loan.type}
                      </div>
                      <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                        {loan.interestRate}% APR
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Amount</p>
                      <p className="font-medium">
                        <CurrencyDisplay amount={loan.originalAmount} />
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="font-medium">
                        <CurrencyDisplay amount={loan.currentBalance} />
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="font-medium">
                        <CurrencyDisplay amount={loan.monthlyPayment} />
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payment</p>
                      <p className="font-medium">
                        {new Date(loan.nextPayment).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Loan Progress</span>
                      <span>{loan.progressPercent}% paid off</span>
                    </div>
                    <Progress 
                      value={loan.progressPercent} 
                      className="h-2 bg-muted" 
                      indicatorClassName={`bg-finance-${loan.id === 1 ? 'blue' : loan.id === 2 ? 'green' : 'purple'}`} 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{loan.remainingTerm} remaining</span>
                      <span>Started: {loan.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Loan Insights</CardTitle>
            <CardDescription>Analysis of your loan portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-finance-blue/20 bg-finance-blue/5 p-4">
              <h3 className="mb-2 font-medium">Interest Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Total interest paid and remaining
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Paid to date:</span>
                  <span className="font-medium">
                    <CurrencyDisplay amount={32450.00} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-medium">
                    <CurrencyDisplay amount={115200.00} />
                  </span>
                </div>
                <div className="flex justify-between border-t pt-1 mt-1">
                  <span>Total interest:</span>
                  <span className="font-medium">
                    <CurrencyDisplay amount={147650.00} />
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-finance-green/20 bg-finance-green/5 p-4">
              <h3 className="mb-2 font-medium">Refinance Opportunity</h3>
              <p className="text-sm text-muted-foreground">
                Refinancing your mortgage at current rates could save you up to <CurrencyDisplay amount={340} />/month.
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Explore Options
              </Button>
            </div>

            <div className="rounded-lg border border-finance-purple/20 bg-finance-purple/5 p-4">
              <h3 className="mb-2 font-medium">Extra Payment Impact</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Adding <CurrencyDisplay amount={200} />/month to your mortgage payment:
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Time saved:</span>
                  <span className="font-medium">4 years 8 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest saved:</span>
                  <span className="font-medium">
                    <CurrencyDisplay amount={43200.00} />
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Apply Extra Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanTracker;
