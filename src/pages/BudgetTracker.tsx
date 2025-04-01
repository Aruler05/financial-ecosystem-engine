
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calculator, Plus } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Initial mock data
const initialBudgets = {
  totalBudget: 3200.00,
  spent: 1840.00,
  remaining: 1360.00,
  daysLeft: 12
};

const initialCategories = [
  { name: "Housing", spent: 1200, budget: 1500, percent: 80, color: "bg-finance-red" },
  { name: "Food", spent: 420, budget: 600, percent: 70, color: "bg-finance-green" },
  { name: "Transportation", spent: 350, budget: 400, percent: 87.5, color: "bg-finance-blue" },
  { name: "Entertainment", spent: 180, budget: 250, percent: 72, color: "bg-finance-purple" },
  { name: "Utilities", spent: 250, budget: 300, percent: 83.3, color: "bg-finance-orange" }
];

const initialHistory = [
  { month: "June 2023", spent: 2880, budget: 3200, status: "Under Budget", difference: -320, percent: 88, color: "bg-finance-green" },
  { month: "May 2023", spent: 3350, budget: 3200, status: "Over Budget", difference: 150, percent: 105, color: "bg-finance-red" },
  { month: "April 2023", spent: 2990, budget: 3200, status: "Under Budget", difference: -210, percent: 93, color: "bg-finance-green" },
  { month: "March 2023", spent: 3150, budget: 3200, status: "Under Budget", difference: -50, percent: 98, color: "bg-finance-green" }
];

const BudgetTracker = () => {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [categories, setCategories] = useState(initialCategories);
  const [history, setHistory] = useState(initialHistory);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: "",
    amount: "",
    category: ""
  });
  const { toast } = useToast();

  const handleAddBudget = () => {
    if (!newBudget.name || !newBudget.amount || !newBudget.category) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Add new budget logic would go here
    setShowAddBudget(false);
    
    toast({
      title: "Budget added",
      description: "Your new budget has been successfully added."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBudget(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewBudget(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
          <p className="text-muted-foreground">Plan and track your monthly budget.</p>
        </div>
        <Dialog open={showAddBudget} onOpenChange={setShowAddBudget}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>
                Add a new budget category to track your spending.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Budget Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter budget name"
                  value={newBudget.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Budget Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  value={newBudget.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddBudget(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBudget}>Save Budget</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={budgets.totalBudget} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-purple/10">
                <Calculator className="h-5 w-5 text-finance-purple" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Monthly budget allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Spent So Far</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={budgets.spent} />
              </div>
              <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                {((budgets.spent / budgets.totalBudget) * 100).toFixed(1)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">of monthly budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={budgets.remaining} />
              </div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                {((budgets.remaining / budgets.totalBudget) * 100).toFixed(1)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">for this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Daily Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={budgets.remaining / budgets.daysLeft} />
              </div>
              <div className="rounded bg-finance-orange/10 px-2 py-1 text-xs font-medium text-finance-orange">
                {budgets.daysLeft} days left
              </div>
            </div>
            <p className="text-xs text-muted-foreground">remaining per day</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Budget allocation by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                    <span>{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      <CurrencyDisplay amount={category.spent} /> / <CurrencyDisplay amount={category.budget} />
                    </span>
                    <span className="text-xs text-muted-foreground">{category.percent}%</span>
                  </div>
                </div>
                <Progress value={category.percent} className="h-2 bg-muted" indicatorClassName={category.color} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Performance</CardTitle>
            <CardDescription>Monthly budget history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {history.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{month.month}</div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded ${month.status === "Under Budget" ? "bg-finance-green/10 text-finance-green" : "bg-finance-red/10 text-finance-red"} px-2 py-1 text-xs font-medium`}>
                      {month.status}
                    </div>
                    <span className="font-medium">
                      {month.status === "Under Budget" ? "-" : "+"}
                      <CurrencyDisplay amount={Math.abs(month.difference)} />
                    </span>
                  </div>
                </div>
                <Progress value={month.percent} className="h-2 bg-muted" indicatorClassName={month.color} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    <CurrencyDisplay amount={month.spent} /> spent
                  </span>
                  <span>
                    of <CurrencyDisplay amount={month.budget} /> budget
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetTracker;
