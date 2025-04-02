
import { StatCard } from "@/components/dashboard/StatCard";
import { TrackerCard } from "@/components/dashboard/TrackerCard";
import {
  CreditCard,
  DollarSign,
  BarChart3,
  PiggyBank,
  Wallet,
  BellRing,
  TrendingUp,
  Calculator,
  BadgeDollarSign,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const expensesData = [
  { name: 'Housing', value: 1200, color: '#DC2626' },
  { name: 'Transportation', value: 350, color: '#1E40AF' },
  { name: 'Food', value: 420, color: '#059669' },
  { name: 'Entertainment', value: 180, color: '#8B5CF6' },
  { name: 'Utilities', value: 240, color: '#EA580C' },
  { name: 'Healthcare', value: 150, color: '#0D9488' },
  { name: 'Other', value: 100, color: '#4B5563' },
];

const pieChartConfig = {
  housing: { label: 'Housing', color: '#DC2626' },
  transportation: { label: 'Transportation', color: '#1E40AF' },
  food: { label: 'Food', color: '#059669' },
  entertainment: { label: 'Entertainment', color: '#8B5CF6' },
  utilities: { label: 'Utilities', color: '#EA580C' },
  healthcare: { label: 'Healthcare', color: '#0D9488' },
  other: { label: 'Other', color: '#4B5563' },
};

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value={<CurrencyDisplay amount={2540.00} />}
          description="12% from last month"
          icon={<ArrowDownRight className="h-5 w-5" />}
          iconClassName="bg-finance-red/10 text-finance-red"
        />
        <StatCard
          title="Total Income"
          value={<CurrencyDisplay amount={4250.00} />}
          description="8% from last month"
          icon={<ArrowUpRight className="h-5 w-5" />}
          iconClassName="bg-finance-green/10 text-finance-green"
        />
        <StatCard
          title="Savings Rate"
          value="40.2%"
          description="5% increase from target"
          icon={<PiggyBank className="h-5 w-5" />}
          iconClassName="bg-finance-teal/10 text-finance-teal"
        />
        <StatCard
          title="Net Worth"
          value={<CurrencyDisplay amount={78350.00} />}
          description={<><CurrencyDisplay amount={3200.00} /> increase from last month</>}
          icon={<BarChart3 className="h-5 w-5" />}
          iconClassName="bg-finance-blue/10 text-finance-blue"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Your spending by category this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className={`${isMobile ? "h-[220px]" : "h-[260px]"} pr-4`}>
              <div className="space-y-4">
                {expensesData.map((expense, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: expense.color }}></div>
                        <span>{expense.name}</span>
                      </div>
                      <div className="font-medium">
                        <CurrencyDisplay amount={expense.value} /> / <CurrencyDisplay amount={expense.value * 1.25} />
                      </div>
                    </div>
                    <Progress 
                      value={(expense.value / (expense.value * 1.25)) * 100} 
                      className="h-2 bg-muted" 
                      indicatorClassName={`bg-[${expense.color}]`}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses Breakdown</CardTitle>
            <CardDescription>Monthly expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${isMobile ? "h-[190px]" : "h-[220px]"} w-full`}>
              <ChartContainer className="h-full" config={pieChartConfig}>
                <PieChart>
                  <Pie
                    data={expensesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={isMobile ? 35 : 45}
                    outerRadius={isMobile ? 65 : 80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {expensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent
                        formatter={(value) => (
                          <span><CurrencyDisplay amount={value as number} /></span>
                        )}
                      />
                    }
                  />
                </PieChart>
              </ChartContainer>
              <ChartLegend>
                <ChartLegendContent
                  verticalAlign="bottom"
                />
              </ChartLegend>
            </div>
            <div className="mt-2 text-xs text-center text-muted-foreground">
              Total Monthly Expenses: <CurrencyDisplay amount={2640.00} className="font-medium" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Bills due in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className={`${isMobile ? "h-[120px]" : "max-h-full"} pr-4`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Electricity Bill</p>
                    <p className="text-sm text-muted-foreground">Due in 2 days</p>
                  </div>
                  <p className="font-medium"><CurrencyDisplay amount={85.40} /></p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Internet</p>
                    <p className="text-sm text-muted-foreground">Due in 5 days</p>
                  </div>
                  <p className="font-medium"><CurrencyDisplay amount={59.99} /></p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Credit Card</p>
                    <p className="text-sm text-muted-foreground">Due in 7 days</p>
                  </div>
                  <p className="font-medium"><CurrencyDisplay amount={340.25} /></p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Phone Bill</p>
                    <p className="text-sm text-muted-foreground">Due in 3 days</p>
                  </div>
                  <p className="font-medium"><CurrencyDisplay amount={45.99} /></p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Water Bill</p>
                    <p className="text-sm text-muted-foreground">Due in 6 days</p>
                  </div>
                  <p className="font-medium"><CurrencyDisplay amount={32.50} /></p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold tracking-tight">Financial Trackers</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TrackerCard
          title="Expense Tracker"
          description="Track and categorize your spending"
          icon={<CreditCard className="h-5 w-5" />}
          path="/expenses"
          iconClassName="bg-finance-red/10 text-finance-red"
        />
        <TrackerCard
          title="Income Tracker"
          description="Monitor your various income sources"
          icon={<DollarSign className="h-5 w-5" />}
          path="/income"
          iconClassName="bg-finance-green/10 text-finance-green"
        />
        <TrackerCard
          title="Budget Planner"
          description="Set and manage your budget goals"
          icon={<Calculator className="h-5 w-5" />}
          path="/budget"
          iconClassName="bg-finance-purple/10 text-finance-purple"
        />
        <TrackerCard
          title="Bill Reminders"
          description="Stay on top of your bill payments"
          icon={<BellRing className="h-5 w-5" />}
          path="/bills"
          iconClassName="bg-finance-orange/10 text-finance-orange"
        />
        <TrackerCard
          title="Savings Goals"
          description="Track progress toward your savings goals"
          icon={<PiggyBank className="h-5 w-5" />}
          path="/savings"
          iconClassName="bg-finance-teal/10 text-finance-teal"
        />
        <TrackerCard
          title="Investment Portfolio"
          description="Monitor your investment performance"
          icon={<TrendingUp className="h-5 w-5" />}
          path="/investments"
          iconClassName="bg-finance-indigo/10 text-finance-indigo"
        />
        <TrackerCard
          title="Debt Management"
          description="Track and manage your debt payoff"
          icon={<BadgeDollarSign className="h-5 w-5" />}
          path="/debt"
          iconClassName="bg-finance-yellow/10 text-finance-yellow"
        />
        <TrackerCard
          title="Loan Tracker"
          description="Monitor loan balances and payments"
          icon={<Wallet className="h-5 w-5" />}
          path="/loans"
          iconClassName="bg-finance-gray/10 text-finance-gray"
        />
        <TrackerCard
          title="Reports & Analytics"
          description="Gain insights into your financial data"
          icon={<BarChart3 className="h-5 w-5" />}
          path="/reports"
          iconClassName="bg-finance-blue/10 text-finance-blue"
        />
      </div>
    </div>
  );
};

export default Dashboard;
