
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PiggyBank, Plus, Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { DeleteButton, DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  completionDate: string;
  color: string;
}

interface SavingsAccount {
  id: number;
  name: string;
  type: string;
  balance: number;
  apy: number;
}

const SavingsTracker = () => {
  const [totalSavings, setTotalSavings] = useState(23540.00);
  const [monthlyContribution, setMonthlyContribution] = useState(1200.00);
  
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: 1,
      name: "New Car",
      target: 20000,
      current: 5200,
      monthlyContribution: 200,
      completionDate: "Mar 2025",
      color: "bg-finance-blue"
    },
    {
      id: 2,
      name: "Vacation Fund",
      target: 3500,
      current: 2800,
      monthlyContribution: 350,
      completionDate: "Aug 2023",
      color: "bg-finance-teal"
    },
    {
      id: 3,
      name: "Home Down Payment",
      target: 50000,
      current: 15000,
      monthlyContribution: 500,
      completionDate: "Jun 2025",
      color: "bg-finance-purple"
    }
  ]);

  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([
    {
      id: 1,
      name: "Emergency Fund",
      type: "High-Yield Savings",
      balance: 15000.00,
      apy: 3.5
    },
    {
      id: 2,
      name: "Vacation Fund",
      type: "Regular Savings",
      balance: 2800.00,
      apy: 1.8
    },
    {
      id: 3,
      name: "New Car Fund",
      type: "Regular Savings",
      balance: 5200.00,
      apy: 1.8
    },
    {
      id: 4,
      name: "Home Down Payment",
      type: "CD Account (3-year)",
      balance: 15000.00,
      apy: 4.2
    }
  ]);

  // Dialog states
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<number | null>(null);
  
  // Form state
  const [goalForm, setGoalForm] = useState({
    name: "",
    target: "",
    current: "",
    monthlyContribution: ""
  });
  
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!goalForm.name || !goalForm.target || !goalForm.current || !goalForm.monthlyContribution) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    const target = parseFloat(goalForm.target);
    const current = parseFloat(goalForm.current);
    const monthlyContribution = parseFloat(goalForm.monthlyContribution);
    
    if (current > target) {
      toast({
        title: "Invalid values",
        description: "Current savings cannot exceed the target amount.",
        variant: "destructive"
      });
      return;
    }
    
    const percentage = (current / target) * 100;
    const months = Math.ceil((target - current) / monthlyContribution);
    
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    const completionDate = today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    const colors = ["bg-finance-blue", "bg-finance-teal", "bg-finance-purple", "bg-finance-green", "bg-finance-red"];
    
    const newGoal: SavingsGoal = {
      id: savingsGoals.length > 0 ? Math.max(...savingsGoals.map(g => g.id)) + 1 : 1,
      name: goalForm.name,
      target,
      current,
      monthlyContribution,
      completionDate,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    setSavingsGoals([...savingsGoals, newGoal]);
    setTotalSavings(prev => prev + current);
    setMonthlyContribution(prev => prev + monthlyContribution);
    
    setGoalForm({
      name: "",
      target: "",
      current: "",
      monthlyContribution: ""
    });
    
    setShowAddGoal(false);
    
    toast({
      title: "Goal added",
      description: "Your savings goal has been added successfully."
    });
  };

  const handleEditGoal = () => {
    if (!selectedGoal || !goalForm.name || !goalForm.target || !goalForm.current || !goalForm.monthlyContribution) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    const target = parseFloat(goalForm.target);
    const current = parseFloat(goalForm.current);
    const monthlyContribution = parseFloat(goalForm.monthlyContribution);
    
    if (current > target) {
      toast({
        title: "Invalid values",
        description: "Current savings cannot exceed the target amount.",
        variant: "destructive"
      });
      return;
    }
    
    const months = Math.ceil((target - current) / monthlyContribution);
    
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    const completionDate = today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    const updatedGoal: SavingsGoal = {
      ...selectedGoal,
      name: goalForm.name,
      target,
      current,
      monthlyContribution,
      completionDate
    };
    
    // Update total savings by calculating the difference
    const originalAmount = selectedGoal.current;
    setTotalSavings(prev => prev - originalAmount + current);
    
    // Update monthly contribution by calculating the difference
    const originalContribution = selectedGoal.monthlyContribution;
    setMonthlyContribution(prev => prev - originalContribution + monthlyContribution);
    
    // Update the goals array
    setSavingsGoals(savingsGoals.map(g => g.id === selectedGoal.id ? updatedGoal : g));
    
    // Reset form
    setGoalForm({
      name: "",
      target: "",
      current: "",
      monthlyContribution: ""
    });
    
    setShowEditGoal(false);
    setSelectedGoal(null);
    
    toast({
      title: "Goal updated",
      description: "Your savings goal has been updated successfully."
    });
  };

  const handleEditClick = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setGoalForm({
      name: goal.name,
      target: goal.target.toString(),
      current: goal.current.toString(),
      monthlyContribution: goal.monthlyContribution.toString()
    });
    setShowEditGoal(true);
  };

  const handleDeleteClick = (id: number) => {
    setGoalToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (goalToDelete === null) return;
    
    const goalToRemove = savingsGoals.find(g => g.id === goalToDelete);
    if (!goalToRemove) return;
    
    // Update total savings
    setTotalSavings(prev => prev - goalToRemove.current);
    
    // Update monthly contribution
    setMonthlyContribution(prev => prev - goalToRemove.monthlyContribution);
    
    // Remove the goal
    setSavingsGoals(savingsGoals.filter(g => g.id !== goalToDelete));
    
    setGoalToDelete(null);
    setDeleteDialogOpen(false);
    
    toast({
      title: "Goal deleted",
      description: "The savings goal has been removed."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoalForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePercentage = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">Track and achieve your savings targets.</p>
        </div>
        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Savings Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Savings Goal</DialogTitle>
              <DialogDescription>
                Enter the details of your savings goal below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter goal name"
                  value={goalForm.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Amount</Label>
                  <Input
                    id="target"
                    name="target"
                    type="number"
                    placeholder="0.00"
                    value={goalForm.target}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current">Current Savings</Label>
                  <Input
                    id="current"
                    name="current"
                    type="number"
                    placeholder="0.00"
                    value={goalForm.current}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  name="monthlyContribution"
                  type="number"
                  placeholder="0.00"
                  value={goalForm.monthlyContribution}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Save Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={totalSavings} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-teal/10">
                <PiggyBank className="h-5 w-5 text-finance-teal" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Across all savings accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Monthly Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={monthlyContribution} />
              </div>
              <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                28% of income
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Automatic transfers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Emergency Fund</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={15000.00} />
              </div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                100% funded
              </div>
            </div>
            <p className="text-xs text-muted-foreground">6 months of expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{savingsGoals.length} Active</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                2 Completed
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Savings goals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Savings Goals</CardTitle>
            <CardDescription>Track your progress towards your goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {savingsGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{goal.name}</h3>
                    <p className="text-sm text-muted-foreground">Target: <CurrencyDisplay amount={goal.target} /></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-right">
                      <p className="font-medium"><CurrencyDisplay amount={goal.current} /> saved</p>
                      <p className="text-sm text-muted-foreground">{calculatePercentage(goal.current, goal.target)}% complete</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(goal)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <DeleteButton onClick={() => handleDeleteClick(goal.id)} />
                  </div>
                </div>
                <Progress value={calculatePercentage(goal.current, goal.target)} className="h-2 bg-muted" indicatorClassName={goal.color} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span><CurrencyDisplay amount={goal.monthlyContribution} />/month</span>
                  <span>Est. completion: {goal.completionDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Accounts</CardTitle>
            <CardDescription>Your linked savings accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savingsAccounts.map((account) => (
              <div key={account.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold"><CurrencyDisplay amount={account.balance} /></p>
                    <p className="text-sm text-finance-green">{account.apy}% APY</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Edit Goal Dialog */}
      <Dialog open={showEditGoal} onOpenChange={setShowEditGoal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Savings Goal</DialogTitle>
            <DialogDescription>
              Update the details of your savings goal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Goal Name</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="Enter goal name"
                value={goalForm.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-target">Target Amount</Label>
                <Input
                  id="edit-target"
                  name="target"
                  type="number"
                  placeholder="0.00"
                  value={goalForm.target}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-current">Current Savings</Label>
                <Input
                  id="edit-current"
                  name="current"
                  type="number"
                  placeholder="0.00"
                  value={goalForm.current}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-monthlyContribution">Monthly Contribution</Label>
              <Input
                id="edit-monthlyContribution"
                name="monthlyContribution"
                type="number"
                placeholder="0.00"
                value={goalForm.monthlyContribution}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEditGoal(false);
              setSelectedGoal(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditGoal}>Update Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Savings Goal"
        description="Are you sure you want to delete this savings goal? This action cannot be undone."
      />
    </div>
  );
};

export default SavingsTracker;
