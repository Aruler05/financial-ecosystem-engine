
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Receipt, Search, Upload, PieChart, ListFilter, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Food & Dining",
  "Shopping",
  "Housing",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Travel",
  "Education",
  "Personal Care",
  "Gifts & Donations",
  "Other"
];

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Bank Transfer",
  "Mobile Payment",
  "Check"
];

const mockExpenses = [
  {
    id: 1,
    date: "2023-06-15",
    merchant: "Grocery Store",
    amount: 78.35,
    category: "Food & Dining",
    paymentMethod: "Credit Card",
    notes: "Weekly groceries"
  },
  {
    id: 2,
    date: "2023-06-14",
    merchant: "Gas Station",
    amount: 45.20,
    category: "Transportation",
    paymentMethod: "Debit Card",
    notes: "Fuel for the week"
  },
  {
    id: 3,
    date: "2023-06-12",
    merchant: "Electricity Company",
    amount: 120.50,
    category: "Utilities",
    paymentMethod: "Bank Transfer",
    notes: "Monthly electricity bill"
  },
  {
    id: 4,
    date: "2023-06-10",
    merchant: "Movie Theater",
    amount: 32.00,
    category: "Entertainment",
    paymentMethod: "Credit Card",
    notes: "Movie night with friends"
  },
  {
    id: 5,
    date: "2023-06-08",
    merchant: "Pharmacy",
    amount: 24.99,
    category: "Healthcare",
    paymentMethod: "Cash",
    notes: "Prescription medications"
  }
];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    merchant: "",
    amount: "",
    category: "",
    paymentMethod: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleAddExpense = () => {
    if (!newExpense.merchant || !newExpense.amount || !newExpense.category || !newExpense.paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const expenseToAdd = {
      ...newExpense,
      id: expenses.length + 1,
      amount: parseFloat(newExpense.amount)
    };

    setExpenses([expenseToAdd, ...expenses]);
    setShowAddExpense(false);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      merchant: "",
      amount: "",
      category: "",
      paymentMethod: "",
      notes: ""
    });

    toast({
      title: "Expense added",
      description: "Your expense has been successfully added."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
          <p className="text-muted-foreground">Track and categorize your expenses with AI assistance.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newExpense.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="merchant">Merchant/Payee</Label>
                  <Input
                    id="merchant"
                    name="merchant"
                    placeholder="Enter merchant name"
                    value={newExpense.merchant}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map(method => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Add any additional details"
                    value={newExpense.notes}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Button variant="outline" className="w-full gap-2">
                    <Upload className="h-4 w-4" /> Upload Receipt
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="gap-2">
            <Receipt className="h-4 w-4" /> Scan Receipt
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="w-full md:w-3/4">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Recent Expenses</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search expenses..."
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
            <div className="rounded-md border">
              <div className="grid grid-cols-7 border-b bg-muted/50 px-4 py-2 text-sm font-medium">
                <div className="col-span-1">Date</div>
                <div className="col-span-2">Merchant</div>
                <div className="col-span-1">Amount</div>
                <div className="col-span-1">Category</div>
                <div className="col-span-1">Payment</div>
                <div className="col-span-1">Notes</div>
              </div>
              <div className="divide-y">
                {expenses.map(expense => (
                  <div key={expense.id} className="grid grid-cols-7 px-4 py-3 text-sm">
                    <div className="col-span-1">{new Date(expense.date).toLocaleDateString()}</div>
                    <div className="col-span-2 font-medium">{expense.merchant}</div>
                    <div className="col-span-1 font-medium">{formatCurrency(expense.amount)}</div>
                    <div className="col-span-1">{expense.category}</div>
                    <div className="col-span-1">{expense.paymentMethod}</div>
                    <div className="col-span-1 truncate">{expense.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/4">
          <CardHeader>
            <CardTitle>Expense Analytics</CardTitle>
            <CardDescription>This month's spending analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-2 text-xl font-bold">$2,540.00</h3>
              <p className="text-sm text-muted-foreground">Total expenses this month</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-red"></div>
                  <span className="text-sm">Food & Dining</span>
                </div>
                <span className="text-sm font-medium">$520.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-blue"></div>
                  <span className="text-sm">Housing</span>
                </div>
                <span className="text-sm font-medium">$1,200.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-green"></div>
                  <span className="text-sm">Transportation</span>
                </div>
                <span className="text-sm font-medium">$350.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-purple"></div>
                  <span className="text-sm">Entertainment</span>
                </div>
                <span className="text-sm font-medium">$180.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-yellow"></div>
                  <span className="text-sm">Other</span>
                </div>
                <span className="text-sm font-medium">$290.00</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">View All Analytics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;
