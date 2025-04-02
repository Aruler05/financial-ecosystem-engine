
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

const SavingsTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">Track and achieve your savings targets.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Savings Goal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <CurrencyDisplay amount={23540.00} />
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
                <CurrencyDisplay amount={1200.00} />
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
              <div className="text-2xl font-bold">3 Active</div>
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">New Car</h3>
                  <p className="text-sm text-muted-foreground">Target: <CurrencyDisplay amount={20000} /></p>
                </div>
                <div className="text-right">
                  <p className="font-medium"><CurrencyDisplay amount={5200} /> saved</p>
                  <p className="text-sm text-muted-foreground">26% complete</p>
                </div>
              </div>
              <Progress value={26} className="h-2 bg-muted" indicatorClassName="bg-finance-blue" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span><CurrencyDisplay amount={200} />/month</span>
                <span>Est. completion: Mar 2025</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Vacation Fund</h3>
                  <p className="text-sm text-muted-foreground">Target: <CurrencyDisplay amount={3500} /></p>
                </div>
                <div className="text-right">
                  <p className="font-medium"><CurrencyDisplay amount={2800} /> saved</p>
                  <p className="text-sm text-muted-foreground">80% complete</p>
                </div>
              </div>
              <Progress value={80} className="h-2 bg-muted" indicatorClassName="bg-finance-teal" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span><CurrencyDisplay amount={350} />/month</span>
                <span>Est. completion: Aug 2023</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Home Down Payment</h3>
                  <p className="text-sm text-muted-foreground">Target: <CurrencyDisplay amount={50000} /></p>
                </div>
                <div className="text-right">
                  <p className="font-medium"><CurrencyDisplay amount={15000} /> saved</p>
                  <p className="text-sm text-muted-foreground">30% complete</p>
                </div>
              </div>
              <Progress value={30} className="h-2 bg-muted" indicatorClassName="bg-finance-purple" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span><CurrencyDisplay amount={500} />/month</span>
                <span>Est. completion: Jun 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Accounts</CardTitle>
            <CardDescription>Your linked savings accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Emergency Fund</h3>
                  <p className="text-sm text-muted-foreground">High-Yield Savings</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold"><CurrencyDisplay amount={15000.00} /></p>
                  <p className="text-sm text-finance-green">3.5% APY</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Vacation Fund</h3>
                  <p className="text-sm text-muted-foreground">Regular Savings</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold"><CurrencyDisplay amount={2800.00} /></p>
                  <p className="text-sm text-finance-green">1.8% APY</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">New Car Fund</h3>
                  <p className="text-sm text-muted-foreground">Regular Savings</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold"><CurrencyDisplay amount={5200.00} /></p>
                  <p className="text-sm text-finance-green">1.8% APY</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Home Down Payment</h3>
                  <p className="text-sm text-muted-foreground">CD Account (3-year)</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold"><CurrencyDisplay amount={15000.00} /></p>
                  <p className="text-sm text-finance-green">4.2% APY</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavingsTracker;
