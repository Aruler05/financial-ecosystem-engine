import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Search, Calendar, ListFilter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton, DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

// Income frequency options
const frequencies = [
  "One-time",
  "Daily",
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Quarterly",
  "Annually"
];

// Income source types
const incomeTypes = [
  "Salary",
  "Freelance",
  "Business",
  "Investments",
  "Rental",
  "Pension",
  "Gifts",
  "Other"
];

// Initial mock income data
const mockIncomes = [
  {
    id: 1,
    source: "Monthly Salary",
    description: "Company XYZ",
    amount: 3500.00,
    type: "Salary",
    frequency: "Monthly",
    nextPayment: "2023-07-01",
    taxRate: "22%"
  },
  {
    id: 2,
    source: "Freelance Project",
    description: "Website Development",
    amount: 500.00,
    type: "Freelance",
    frequency: "One-time",
    nextPayment: "2023-06-15",
    taxRate: "Self-employment"
  },
  {
    id: 3,
    source: "Dividend Income",
    description: "Stock Investments",
    amount: 250.00,
    type: "Investments",
    frequency: "Quarterly",
    nextPayment: "2023-09-10",
    taxRate: "15%"
  }
];

const IncomeTracker = () => {
  const { currencySymbol } = useCurrency();
  const [incomes, setIncomes] = useState(mockIncomes);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newIncome, setNewIncome] = useState({
    source: "",
    description: "",
    amount: "",
    type: "",
    frequency: "",
    nextPayment: new Date().toISOString().split('T')[0],
    taxRate: ""
  });
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState<number | null>(null);

  const handleAddIncome = () => {
    if (!newIncome.source || !newIncome.amount || !newIncome.type || !newIncome.frequency) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const incomeToAdd = {
      ...newIncome,
      id: incomes.length + 1,
      amount: parseFloat(newIncome.amount)
    };

    setIncomes([incomeToAdd, ...incomes]);
    setShowAddIncome(false);
    setNewIncome({
      source: "",
      description: "",
      amount: "",
      type: "",
      frequency: "",
      nextPayment: new Date().toISOString().split('T')[0],
      taxRate: ""
    });

    toast({
      title: "Income added",
      description: "Your income has been successfully added."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewIncome(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewIncome(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteClick = (id: number) => {
    setSelectedIncomeId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedIncomeId === null) return;
    
    setIncomes(incomes.filter(income => income.id !== selectedIncomeId));
    setSelectedIncomeId(null);
    
    toast({
      title: "Income deleted",
      description: "The income source has been removed."
    });
  };

  // Calculate total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const primaryIncome = incomes.find(income => income.type === "Salary")?.amount || 0;
  const otherIncome = totalIncome - primaryIncome;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Income Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your income sources.</p>
        </div>
        <Dialog open={showAddIncome} onOpenChange={setShowAddIncome}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Income
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Income</DialogTitle>
              <DialogDescription>
                Enter the details of your income below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Income Source</Label>
                  <Input
                    id="source"
                    name="source"
                    placeholder="Enter income source"
                    value={newIncome.source}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={newIncome.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Add description"
                  value={newIncome.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Income Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("frequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencies.map(freq => (
                        <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nextPayment">Next Payment Date</Label>
                  <Input
                    id="nextPayment"
                    name="nextPayment"
                    type="date"
                    value={newIncome.nextPayment}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate</Label>
                  <Input
                    id="taxRate"
                    name="taxRate"
                    placeholder="e.g., 20% or Self-employed"
                    value={newIncome.taxRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddIncome(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddIncome}>Save Income</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={totalIncome} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-green/10">
                <DollarSign className="h-5 w-5 text-finance-green" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">This month's income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Primary Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={primaryIncome} />
              </div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                Salary
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Regular monthly income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Other Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={otherIncome} />
              </div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                Various
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Additional income sources</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Income Sources</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search income..."
                  className="w-full min-w-[200px] pl-8"
                />
              </div>
              <Button variant="ghost" size="icon">
                <ListFilter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Frequency</TableHead>
                  <TableHead className="hidden md:table-cell">Next Payment</TableHead>
                  <TableHead className="hidden md:table-cell">Tax Rate</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomes.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell className="font-medium">{income.source}</TableCell>
                    <TableCell>{income.description}</TableCell>
                    <TableCell>
                      <div className="font-medium text-finance-green">
                        <CurrencyDisplay amount={income.amount} />
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{income.type}</TableCell>
                    <TableCell className="hidden sm:table-cell">{income.frequency}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(income.nextPayment).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{income.taxRate}</TableCell>
                    <TableCell>
                      <DeleteButton onClick={() => handleDeleteClick(income.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Income Source"
        description="Are you sure you want to delete this income source? This action cannot be undone."
      />
    </div>
  );
};

export default IncomeTracker;
