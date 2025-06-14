import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrackerCard } from "@/components/dashboard/TrackerCard";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Library, ArrowUpCircle, ArrowDownCircle, Activity, Receipt, PiggyBank, TrendingUp as TrendingUpIcon } from "lucide-react";

const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    // Load data from localStorage if available
    const savedBalance = localStorage.getItem('totalBalance');
    const savedIncome = localStorage.getItem('monthlyIncome');
    const savedExpenses = localStorage.getItem('monthlyExpenses');
    const savedSavings = localStorage.getItem('totalSavings');

    if (savedBalance) setTotalBalance(parseFloat(savedBalance));
    if (savedIncome) setMonthlyIncome(parseFloat(savedIncome));
    if (savedExpenses) setMonthlyExpenses(parseFloat(savedExpenses));
    if (savedSavings) setTotalSavings(parseFloat(savedSavings));
  }, []);

  const netIncome = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) : 0;

  // Sample data for recent transactions
  const recentTransactions = [
    { id: 1, description: "Grocery Store", amount: -85.50, category: "Food", date: "Today" },
    { id: 2, description: "Salary Deposit", amount: 3500.00, category: "Income", date: "Yesterday" },
    { id: 3, description: "Electric Bill", amount: -120.00, category: "Utilities", date: "2 days ago" },
    { id: 4, description: "Gas Station", amount: -45.00, category: "Transportation", date: "3 days ago" },
    { id: 5, description: "Coffee Shop", amount: -8.50, category: "Food", date: "3 days ago" }
  ];

  // Sample data for expense breakdown
  const expenseBreakdown = [
    { category: "Housing", value: 1200, color: "bg-finance-blue" },
    { category: "Food", value: 450, color: "bg-finance-green" },
    { category: "Transportation", value: 300, color: "bg-finance-purple" },
    { category: "Utilities", value: 200, color: "bg-finance-orange" },
    { category: "Entertainment", value: 150, color: "bg-finance-red" }
  ];

  const totalExpenseValue = expenseBreakdown.reduce((sum, expense) => sum + expense.value, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-4 md:p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your financial overview at a glance.</p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={totalBalance}
            description="Current account balance"
            icon={<Library className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Monthly Income"
            value={monthlyIncome}
            description="This month's income"
            icon={<ArrowUpCircle className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Monthly Expenses"
            value={monthlyExpenses}
            description="This month's spending"
            icon={<ArrowDownCircle className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Net Income"
            value={netIncome}
            description={`${savingsRate.toFixed(1)}% savings rate`}
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Quick Action Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TrackerCard
            title="Expense Tracker"
            description="Track your daily expenses"
            icon="receipt"
            path="/expenses"
          />
          <TrackerCard
            title="Income Tracker"
            description="Monitor your income sources"
            icon="piggy-bank"
            path="/income"
          />
          <TrackerCard
            title="Savings Tracker"
            description="Watch your savings grow"
            icon="trending-up"
            path="/savings"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{transaction.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                      <CurrencyDisplay amount={Math.abs(transaction.amount)} showSymbol={transaction.amount > 0} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Where your money goes this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseBreakdown.map((expense, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{expense.category}</span>
                      <span className="text-muted-foreground">
                        <CurrencyDisplay amount={expense.value} /> ({((expense.value / totalExpenseValue) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress 
                      value={(expense.value / totalExpenseValue) * 100} 
                      className="h-2 bg-muted" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
