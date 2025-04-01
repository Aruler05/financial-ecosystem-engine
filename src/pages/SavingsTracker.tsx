
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, Plus, Pencil, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

const initialSavingsGoals = [
  {
    id: 1,
    name: "New Car",
    target: 20000,
    current: 5200,
    monthlyContribution: 200,
    estimatedCompletion: "Mar 2025"
  },
  {
    id: 2,
    name: "Vacation Fund",
    target: 3500,
    current: 2800,
    monthlyContribution: 350,
    estimatedCompletion: "Aug 2023"
  },
  {
    id: 3,
    name: "Home Down Payment",
    target: 50000,
    current: 15000,
    monthlyContribution: 500,
    estimatedCompletion: "Jun 2025"
  }
];

const initialSavingsAccounts = [
  {
    id: 1,
    name: "Emergency Fund",
    type: "High-Yield Savings",
    balance: 15000,
    interestRate: 3.5
  },
  {
    id: 2,
    name: "Vacation Fund",
    type: "Regular Savings",
    balance: 2800,
    interestRate: 1.8
  },
  {
    id: 3,
    name: "New Car Fund",
    type: "Regular Savings",
    balance: 5200,
    interestRate: 1.8
  },
  {
    id: 4,
    name: "Home Down Payment",
    type: "CD Account (3-year)",
    balance: 15000,
    interestRate: 4.2
  }
];

const SavingsTracker = () => {
  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals);
  const [savingsAccounts, setSavingsAccounts] = useState(initialSavingsAccounts);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    monthlyContribution: "",
    estimatedCompletion: ""
  });
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "",
    balance: "",
    interestRate: ""
  });
  const { toast } = useToast();

  // Calculate total savings
  const totalSavings = savingsAccounts.reduce((sum, account) => sum + account.balance, 0);
  // Calculate total monthly contribution
  const totalMonthlyContribution = savingsGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  // Count active goals
  const activeGoalsCount = savingsGoals.length;
  // Count completed goals (assuming 100% funded is complete)
  const completedGoalsCount = savingsAccounts.filter(account => 
    account.name === "Emergency Fund" || 
    savingsGoals.some(goal => goal.name === account.name && goal.current >= goal.target)
  ).length;

  // Handle savings goal operations
  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const goalToAdd = {
      ...newGoal,
      id: savingsGoals.length + 1,
      target: parseFloat(newGoal.target) || 0,
      current: parseFloat(newGoal.current) || 0,
      monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0
    };

    setSavingsGoals([...savingsGoals, goalToAdd]);
    setShowAddGoal(false);
    setNewGoal({
      name: "",
      target: "",
      current: "",
      monthlyContribution: "",
      estimatedCompletion: ""
    });

    toast({
      title: "Savings goal added",
      description: "Your new savings goal has been added."
    });
  };

  const handleEditGoal = (goal) => {
    setCurrentGoal(goal);
    setNewGoal({
      name: goal.name,
      target: goal.target.toString(),
      current: goal.current.toString(),
      monthlyContribution: goal.monthlyContribution.toString(),
      estimatedCompletion: goal.estimatedCompletion
    });
    setShowEditGoal(true);
  };

  const handleUpdateGoal = () => {
    if (!newGoal.name || !newGoal.target) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedGoal = {
      ...currentGoal,
      name: newGoal.name,
      target: parseFloat(newGoal.target) || 0,
      current: parseFloat(newGoal.current) || 0,
      monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0,
      estimatedCompletion: newGoal.estimatedCompletion
    };

    const updatedGoals = savingsGoals.map(goal => 
      goal.id === currentGoal.id ? updatedGoal : goal
    );

    setSavingsGoals(updatedGoals);
    setShowEditGoal(false);
    setCurrentGoal(null);
    setNewGoal({
      name: "",
      target: "",
      current: "",
      monthlyContribution: "",
      estimatedCompletion: ""
    });

    toast({
      title: "Savings goal updated",
      description: "Your savings goal has been updated."
    });
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = savingsGoals.filter(goal => goal.id !== id);
    setSavingsGoals(updatedGoals);
    
    toast({
      title: "Savings goal deleted",
      description: "Your savings goal has been removed."
    });
  };

  // Handle savings account operations
  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.type || !newAccount.balance) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const accountToAdd = {
      ...newAccount,
      id: savingsAccounts.length + 1,
      balance: parseFloat(newAccount.balance) || 0,
      interestRate: parseFloat(newAccount.interestRate) || 0
    };

    setSavingsAccounts([...savingsAccounts, accountToAdd]);
    setShowAddAccount(false);
    setNewAccount({
      name: "",
      type: "",
      balance: "",
      interestRate: ""
    });

    toast({
      title: "Savings account added",
      description: "Your new savings account has been added."
    });
  };

  const handleEditAccount = (account) => {
    setCurrentAccount(account);
    setNewAccount({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      interestRate: account.interestRate.toString()
    });
    setShowEditAccount(true);
  };

  const handleUpdateAccount = () => {
    if (!newAccount.name || !newAccount.type || !newAccount.balance) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedAccount = {
      ...currentAccount,
      name: newAccount.name,
      type: newAccount.type,
      balance: parseFloat(newAccount.balance) || 0,
      interestRate: parseFloat(newAccount.interestRate) || 0
    };

    const updatedAccounts = savingsAccounts.map(account => 
      account.id === currentAccount.id ? updatedAccount : account
    );

    setSavingsAccounts(updatedAccounts);
    setShowEditAccount(false);
    setCurrentAccount(null);
    setNewAccount({
      name: "",
      type: "",
      balance: "",
      interestRate: ""
    });

    toast({
      title: "Savings account updated",
      description: "Your savings account has been updated."
    });
  };

  const handleDeleteAccount = (id) => {
    const updatedAccounts = savingsAccounts.filter(account => account.id !== id);
    setSavingsAccounts(updatedAccounts);
    
    toast({
      title: "Savings account deleted",
      description: "Your savings account has been removed."
    });
  };

  const handleInputChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">Track and achieve your savings targets.</p>
        </div>
        <div className="flex flex-wrap gap-2">
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
                    placeholder="e.g., New Car"
                    value={newGoal.name}
                    onChange={(e) => handleInputChange(e, setNewGoal)}
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
                      value={newGoal.target}
                      onChange={(e) => handleInputChange(e, setNewGoal)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Amount</Label>
                    <Input
                      id="current"
                      name="current"
                      type="number"
                      placeholder="0.00"
                      value={newGoal.current}
                      onChange={(e) => handleInputChange(e, setNewGoal)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                    <Input
                      id="monthlyContribution"
                      name="monthlyContribution"
                      type="number"
                      placeholder="0.00"
                      value={newGoal.monthlyContribution}
                      onChange={(e) => handleInputChange(e, setNewGoal)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCompletion">Est. Completion</Label>
                    <Input
                      id="estimatedCompletion"
                      name="estimatedCompletion"
                      placeholder="e.g., Jan 2024"
                      value={newGoal.estimatedCompletion}
                      onChange={(e) => handleInputChange(e, setNewGoal)}
                    />
                  </div>
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
          
          <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" /> Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Savings Account</DialogTitle>
                <DialogDescription>
                  Enter the details of your savings account below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input
                    id="account-name"
                    name="name"
                    placeholder="e.g., Emergency Fund"
                    value={newAccount.name}
                    onChange={(e) => handleInputChange(e, setNewAccount)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Input
                    id="account-type"
                    name="type"
                    placeholder="e.g., High-Yield Savings"
                    value={newAccount.type}
                    onChange={(e) => handleInputChange(e, setNewAccount)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-balance">Current Balance</Label>
                    <Input
                      id="account-balance"
                      name="balance"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.balance}
                      onChange={(e) => handleInputChange(e, setNewAccount)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-interest">Interest Rate (%)</Label>
                    <Input
                      id="account-interest"
                      name="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newAccount.interestRate}
                      onChange={(e) => handleInputChange(e, setNewAccount)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddAccount(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAccount}>Save Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
                placeholder="e.g., New Car"
                value={newGoal.name}
                onChange={(e) => handleInputChange(e, setNewGoal)}
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
                  value={newGoal.target}
                  onChange={(e) => handleInputChange(e, setNewGoal)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-current">Current Amount</Label>
                <Input
                  id="edit-current"
                  name="current"
                  type="number"
                  placeholder="0.00"
                  value={newGoal.current}
                  onChange={(e) => handleInputChange(e, setNewGoal)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="edit-monthlyContribution"
                  name="monthlyContribution"
                  type="number"
                  placeholder="0.00"
                  value={newGoal.monthlyContribution}
                  onChange={(e) => handleInputChange(e, setNewGoal)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-estimatedCompletion">Est. Completion</Label>
                <Input
                  id="edit-estimatedCompletion"
                  name="estimatedCompletion"
                  placeholder="e.g., Jan 2024"
                  value={newGoal.estimatedCompletion}
                  onChange={(e) => handleInputChange(e, setNewGoal)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditGoal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGoal}>Update Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={showEditAccount} onOpenChange={setShowEditAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Savings Account</DialogTitle>
            <DialogDescription>
              Update the details of your savings account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-account-name">Account Name</Label>
              <Input
                id="edit-account-name"
                name="name"
                placeholder="e.g., Emergency Fund"
                value={newAccount.name}
                onChange={(e) => handleInputChange(e, setNewAccount)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-account-type">Account Type</Label>
              <Input
                id="edit-account-type"
                name="type"
                placeholder="e.g., High-Yield Savings"
                value={newAccount.type}
                onChange={(e) => handleInputChange(e, setNewAccount)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-account-balance">Current Balance</Label>
                <Input
                  id="edit-account-balance"
                  name="balance"
                  type="number"
                  placeholder="0.00"
                  value={newAccount.balance}
                  onChange={(e) => handleInputChange(e, setNewAccount)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-account-interest">Interest Rate (%)</Label>
                <Input
                  id="edit-account-interest"
                  name="interestRate"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={newAccount.interestRate}
                  onChange={(e) => handleInputChange(e, setNewAccount)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAccount(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAccount}>Update Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                <CurrencyDisplay amount={totalMonthlyContribution} />
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
                <CurrencyDisplay amount={15000} />
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
              <div className="text-2xl font-bold">{activeGoalsCount} Active</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                {completedGoalsCount} Completed
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Savings goals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Savings Goals</CardTitle>
              <CardDescription>Track your progress towards your goals</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAddGoal(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add Goal
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {savingsGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{goal.name}</h3>
                    <p className="text-sm text-muted-foreground">Target: <CurrencyDisplay amount={goal.target} /></p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium"><CurrencyDisplay amount={goal.current} /> saved</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((goal.current / goal.target) * 100)}% complete
                    </p>
                  </div>
                </div>
                <Progress 
                  value={Math.min(Math.round((goal.current / goal.target) * 100), 100)} 
                  className="h-2 bg-muted" 
                  indicatorClassName="bg-finance-blue" 
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    <CurrencyDisplay amount={goal.monthlyContribution} />/month
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Est. completion: {goal.estimatedCompletion}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEditGoal(goal)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Savings Accounts</CardTitle>
              <CardDescription>Your linked savings accounts</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAddAccount(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add Account
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {savingsAccounts.map((account) => (
              <div key={account.id} className="rounded-lg border p-4 relative">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold"><CurrencyDisplay amount={account.balance} /></p>
                    <p className="text-sm text-finance-green">{account.interestRate}% APY</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEditAccount(account)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleDeleteAccount(account.id)}>
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavingsTracker;
