import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import LoanPaymentSpreadsheet from "@/components/loans/LoanPaymentSpreadsheet";
import { LoanSummaryCards } from "@/components/loans/LoanSummaryCards";
import { LoanDetailsList } from "@/components/loans/LoanDetailsList";
import { LoanInsights } from "@/components/loans/LoanInsights";

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

const LoanTracker = () => {
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [showEditLoan, setShowEditLoan] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [showPaymentSpreadsheet, setShowPaymentSpreadsheet] = useState(false);
  const [selectedLoanForSpreadsheet, setSelectedLoanForSpreadsheet] = useState<Loan | null>(null);
  const { toast } = useToast();
  
  // States for the refinance dialog
  const [showRefinance, setShowRefinance] = useState(false);
  const [refinanceData, setRefinanceData] = useState({
    loanId: 1,
    newRate: "",
    newTerm: ""
  });

  // States for the extra payment dialog
  const [showExtraPayment, setShowExtraPayment] = useState(false);
  const [extraPayment, setExtraPayment] = useState({
    loanId: 1,
    amount: ""
  });
  
  const [newLoan, setNewLoan] = useState({
    name: "",
    lender: "",
    originalAmount: "",
    currentBalance: "",
    monthlyPayment: "",
    nextPaymentDate: "",
    interestRate: "",
    loanType: "fixed",
    tenureMonths: ""
  });

  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 1,
      name: "Mortgage Loan for Primary Residence",
      lender: "Home First Bank",
      originalAmount: 320000,
      currentBalance: 215600,
      monthlyPayment: 985,
      nextPaymentDate: "Jul 1, 2023",
      interestRate: 3.75,
      loanType: "Fixed Rate",
      startDate: "May 2018",
      percentPaid: 32.6,
      remainingTimeText: "21 years 4 months remaining until full payoff",
      indicatorClass: "bg-finance-blue",
      tenureMonths: 360
    },
    {
      id: 2,
      name: "Auto Loan - Toyota Camry",
      lender: "Reliable Auto Finance",
      originalAmount: 20000,
      currentBalance: 12400,
      monthlyPayment: 341,
      nextPaymentDate: "Jul 15, 2023",
      interestRate: 4.5,
      loanType: "Fixed Rate",
      startDate: "Oct 2021",
      percentPaid: 38,
      remainingTimeText: "32 months remaining",
      indicatorClass: "bg-finance-green",
      tenureMonths: 60
    },
    {
      id: 3,
      name: "Personal Loan for Home Improvement",
      lender: "Community Credit Union",
      originalAmount: 10000,
      currentBalance: 7800,
      monthlyPayment: 230,
      nextPaymentDate: "Jul 5, 2023",
      interestRate: 8.25,
      loanType: "Fixed Rate",
      startDate: "Jan 2023",
      percentPaid: 22,
      remainingTimeText: "36 months remaining, approximately 3 years",
      indicatorClass: "bg-finance-purple",
      tenureMonths: 48
    }
  ]);

  // Calculate the total values for summary cards
  const totalBalance = loans.reduce((sum, loan) => sum + loan.currentBalance, 0);
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const activeLoanCount = loans.length;
  const nextPaymentDate = loans.reduce((earliest, loan) => {
    return !earliest ? loan.nextPaymentDate : earliest < loan.nextPaymentDate ? earliest : loan.nextPaymentDate;
  }, "");
  const nextPaymentLoan = loans.find(loan => loan.nextPaymentDate === nextPaymentDate);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLoan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewLoan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRefinanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRefinanceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExtraPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExtraPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExtraPaymentSubmit = () => {
    const paymentAmount = parseFloat(extraPayment.amount);
    
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive"
      });
      return;
    }
    
    const loanIndex = loans.findIndex(loan => loan.id === extraPayment.loanId);
    
    if (loanIndex === -1) {
      toast({
        title: "Error",
        description: "Loan not found.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedLoans = [...loans];
    const loan = updatedLoans[loanIndex];
    
    const newBalance = Math.max(0, loan.currentBalance - paymentAmount);
    const newPercentPaid = (loan.originalAmount - newBalance) / loan.originalAmount * 100;
    
    updatedLoans[loanIndex] = {
      ...loan,
      currentBalance: newBalance,
      percentPaid: newPercentPaid
    };
    
    setLoans(updatedLoans);
    setShowExtraPayment(false);
    setExtraPayment({
      loanId: updatedLoans[0]?.id || 1,
      amount: ""
    });
    
    toast({
      title: "Payment applied",
      description: `Extra payment of ${paymentAmount.toFixed(2)} applied to ${loan.name}.`
    });
  };

  const handleRefinanceSubmit = () => {
    const newRate = parseFloat(refinanceData.newRate);
    const newTerm = parseInt(refinanceData.newTerm);
    
    if (!newRate || isNaN(newRate) || newRate <= 0 || !newTerm || isNaN(newTerm) || newTerm <= 0) {
      toast({
        title: "Invalid data",
        description: "Please enter valid interest rate and term.",
        variant: "destructive"
      });
      return;
    }
    
    const loanIndex = loans.findIndex(loan => loan.id === refinanceData.loanId);
    
    if (loanIndex === -1) {
      toast({
        title: "Error",
        description: "Loan not found.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedLoans = [...loans];
    const loan = updatedLoans[loanIndex];
    
    const r = newRate / 100 / 12;
    const n = newTerm * 12;
    const newMonthlyPayment = loan.currentBalance * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    updatedLoans[loanIndex] = {
      ...loan,
      interestRate: newRate,
      monthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
      remainingTimeText: `${newTerm} years remaining`
    };
    
    setLoans(updatedLoans);
    setShowRefinance(false);
    setRefinanceData({
      loanId: updatedLoans[0]?.id || 1,
      newRate: "",
      newTerm: ""
    });
    
    toast({
      title: "Refinance applied",
      description: `${loan.name} has been refinanced at ${newRate}% for ${newTerm} years.`
    });
  };

  const handleAddLoan = () => {
    if (!newLoan.name || !newLoan.lender || !newLoan.originalAmount || 
        !newLoan.currentBalance || !newLoan.monthlyPayment || 
        !newLoan.nextPaymentDate || !newLoan.interestRate) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const originalAmount = parseFloat(newLoan.originalAmount);
    const currentBalance = parseFloat(newLoan.currentBalance);
    const percentPaid = ((originalAmount - currentBalance) / originalAmount) * 100;
    const tenureMonths = newLoan.tenureMonths ? parseInt(newLoan.tenureMonths) : undefined;

    const loanToAdd: Loan = {
      id: Date.now(),
      name: newLoan.name,
      lender: newLoan.lender,
      originalAmount: originalAmount,
      currentBalance: currentBalance,
      monthlyPayment: parseFloat(newLoan.monthlyPayment),
      nextPaymentDate: newLoan.nextPaymentDate,
      interestRate: parseFloat(newLoan.interestRate),
      loanType: newLoan.loanType === "fixed" ? "Fixed Rate" : "Variable Rate",
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      percentPaid: percentPaid,
      remainingTimeText: tenureMonths ? `${Math.ceil(tenureMonths / 12)} years remaining` : "Term remaining to be calculated",
      indicatorClass: `bg-finance-${["blue", "green", "purple", "red"][Math.floor(Math.random() * 4)]}`,
      tenureMonths: tenureMonths
    };

    setLoans([...loans, loanToAdd]);
    setShowAddLoan(false);
    setNewLoan({
      name: "",
      lender: "",
      originalAmount: "",
      currentBalance: "",
      monthlyPayment: "",
      nextPaymentDate: "",
      interestRate: "",
      loanType: "fixed",
      tenureMonths: ""
    });
    
    toast({
      title: "Loan added",
      description: "Your loan has been successfully added."
    });
  };

  const handleEditLoan = () => {
    if (selectedLoanId === null) return;
    
    const loanIndex = loans.findIndex(loan => loan.id === selectedLoanId);
    if (loanIndex === -1) return;
    
    const originalAmount = parseFloat(newLoan.originalAmount);
    const currentBalance = parseFloat(newLoan.currentBalance);
    const percentPaid = ((originalAmount - currentBalance) / originalAmount) * 100;
    const tenureMonths = newLoan.tenureMonths ? parseInt(newLoan.tenureMonths) : undefined;
    
    const updatedLoan: Loan = {
      ...loans[loanIndex],
      name: newLoan.name,
      lender: newLoan.lender,
      originalAmount: originalAmount,
      currentBalance: currentBalance,
      monthlyPayment: parseFloat(newLoan.monthlyPayment),
      nextPaymentDate: newLoan.nextPaymentDate,
      interestRate: parseFloat(newLoan.interestRate),
      loanType: newLoan.loanType === "fixed" ? "Fixed Rate" : "Variable Rate",
      percentPaid: percentPaid,
      tenureMonths: tenureMonths,
      remainingTimeText: tenureMonths ? `${Math.ceil(tenureMonths / 12)} years remaining` : loans[loanIndex].remainingTimeText
    };
    
    const updatedLoans = [...loans];
    updatedLoans[loanIndex] = updatedLoan;
    setLoans(updatedLoans);
    
    setShowEditLoan(false);
    setSelectedLoanId(null);
    
    toast({
      title: "Loan updated",
      description: "Your loan has been successfully updated."
    });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedLoanId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedLoanId === null) return;
    
    const updatedLoans = loans.filter(loan => loan.id !== selectedLoanId);
    setLoans(updatedLoans);
    setSelectedLoanId(null);
    
    toast({
      title: "Loan deleted",
      description: "The loan has been removed from your tracker."
    });
  };

  const handleEditClick = (id: number) => {
    const loanToEdit = loans.find(loan => loan.id === id);
    if (!loanToEdit) return;
    
    setNewLoan({
      name: loanToEdit.name,
      lender: loanToEdit.lender,
      originalAmount: loanToEdit.originalAmount.toString(),
      currentBalance: loanToEdit.currentBalance.toString(),
      monthlyPayment: loanToEdit.monthlyPayment.toString(),
      nextPaymentDate: loanToEdit.nextPaymentDate,
      interestRate: loanToEdit.interestRate.toString(),
      loanType: loanToEdit.loanType === "Fixed Rate" ? "fixed" : "variable",
      tenureMonths: loanToEdit.tenureMonths ? loanToEdit.tenureMonths.toString() : ""
    });
    
    setSelectedLoanId(id);
    setShowEditLoan(true);
  };

  const handleRefinanceClick = (id: number) => {
    const loanToRefinance = loans.find(loan => loan.id === id);
    if (!loanToRefinance) return;
    
    setRefinanceData({
      loanId: id,
      newRate: "",
      newTerm: ""
    });
    
    setShowRefinance(true);
  };

  const handleExtraPaymentClick = (id: number) => {
    setExtraPayment({
      loanId: id,
      amount: ""
    });
    
    setShowExtraPayment(true);
  };

  const handleViewPaymentSchedule = (loan: Loan) => {
    setSelectedLoanForSpreadsheet(loan);
    setShowPaymentSpreadsheet(true);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Tracker</h1>
          <p className="text-muted-foreground mt-1">Manage and track your loans in one place.</p>
        </div>
        <Dialog open={showAddLoan} onOpenChange={setShowAddLoan}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Add Loan
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                    placeholder="Enter loan name"
                    value={newLoan.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lender">Lender</Label>
                  <Input
                    id="lender"
                    name="lender"
                    placeholder="Enter lender name"
                    value={newLoan.lender}
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
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    placeholder="0.0"
                    value={newLoan.interestRate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("loanType", value)}
                    defaultValue="fixed"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Rate</SelectItem>
                      <SelectItem value="variable">Variable Rate</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="nextPaymentDate">Next Payment Date</Label>
                  <Input
                    id="nextPaymentDate"
                    name="nextPaymentDate"
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={newLoan.nextPaymentDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenureMonths">Loan Tenure (Months) - Optional</Label>
                <Input
                  id="tenureMonths"
                  name="tenureMonths"
                  type="number"
                  placeholder="e.g., 360 for 30 years"
                  value={newLoan.tenureMonths}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the total loan term in months (e.g., 360 for 30 years, 240 for 20 years)
                </p>
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
      </div>

      {/* Summary Cards */}
      <LoanSummaryCards loans={loans} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Loan Details Section */}
        <div className="lg:col-span-2">
          <LoanDetailsList
            loans={loans}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onRefinanceClick={handleRefinanceClick}
            onExtraPaymentClick={handleExtraPaymentClick}
            onViewPaymentSchedule={handleViewPaymentSchedule}
            onAddLoan={() => setShowAddLoan(true)}
          />
        </div>

        {/* Insights Section */}
        <div className="lg:col-span-1">
          <LoanInsights
            onRefinanceClick={handleRefinanceClick}
            onExtraPaymentClick={handleExtraPaymentClick}
          />
        </div>
      </div>

      {/* Dialogs */}
      <LoanPaymentSpreadsheet
        loan={selectedLoanForSpreadsheet}
        isOpen={showPaymentSpreadsheet}
        onClose={() => setShowPaymentSpreadsheet(false)}
      />

      <Dialog open={showEditLoan} onOpenChange={setShowEditLoan}>
        <DialogContent>
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
                  placeholder="Enter loan name"
                  value={newLoan.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lender">Lender</Label>
                <Input
                  id="edit-lender"
                  name="lender"
                  placeholder="Enter lender name"
                  value={newLoan.lender}
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
                <Label htmlFor="edit-interestRate">Interest Rate (%)</Label>
                <Input
                  id="edit-interestRate"
                  name="interestRate"
                  type="number"
                  placeholder="0.0"
                  value={newLoan.interestRate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-loanType">Loan Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("loanType", value)}
                  value={newLoan.loanType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Rate</SelectItem>
                    <SelectItem value="variable">Variable Rate</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="edit-nextPaymentDate">Next Payment Date</Label>
                <Input
                  id="edit-nextPaymentDate"
                  name="nextPaymentDate"
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={newLoan.nextPaymentDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tenureMonths">Loan Tenure (Months) - Optional</Label>
              <Input
                id="edit-tenureMonths"
                name="tenureMonths"
                type="number"
                placeholder="e.g., 360 for 30 years"
                value={newLoan.tenureMonths}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                Enter the total loan term in months (e.g., 360 for 30 years, 240 for 20 years)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditLoan(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditLoan}>Update Loan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRefinance} onOpenChange={setShowRefinance}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refinance Loan</DialogTitle>
            <DialogDescription>
              Enter new loan terms below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newRate">New Interest Rate (%)</Label>
              <Input
                id="newRate"
                name="newRate"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={refinanceData.newRate}
                onChange={handleRefinanceInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newTerm">New Loan Term (Years)</Label>
              <Input
                id="newTerm"
                name="newTerm"
                type="number"
                placeholder="15"
                value={refinanceData.newTerm}
                onChange={handleRefinanceInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRefinance(false)}>
              Cancel
            </Button>
            <Button onClick={handleRefinanceSubmit}>Apply Refinance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showExtraPayment} onOpenChange={setShowExtraPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Extra Payment</DialogTitle>
            <DialogDescription>
              Apply an additional payment to your loan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={extraPayment.amount}
                onChange={handleExtraPaymentChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExtraPayment(false)}>
              Cancel
            </Button>
            <Button onClick={handleExtraPaymentSubmit}>Apply Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Loan"
        description="Are you sure you want to delete this loan? This action cannot be undone."
      />
    </div>
  );
};

export default LoanTracker;
