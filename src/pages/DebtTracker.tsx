
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DebtTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Debt Management</h1>
          <p className="text-muted-foreground">Track and strategize your debt repayment.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Debt
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$32,450.00</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-yellow/10">
                <BadgeDollarSign className="h-5 w-5 text-finance-yellow" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$876.00</div>
              <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
                21% of income
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Minimum required payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Avg. Interest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">14.2%</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                Weighted avg.
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Across all debts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Debt-to-Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">35%</div>
              <div className="rounded bg-finance-orange/10 px-2 py-1 text-xs font-medium text-finance-orange">
                Moderate
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total debt / annual income</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Debt Breakdown</CardTitle>
            <CardDescription>All your current debts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Credit Card - Chase</h3>
                  <p className="text-sm text-muted-foreground">18.99% APR</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$4,250.00</p>
                  <p className="text-sm text-muted-foreground">Min: $85/mo</p>
                </div>
              </div>
              <Progress value={85} className="h-2 bg-muted" indicatorClassName="bg-finance-red" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$4,250 balance</span>
                <span>$5,000 limit (85% used)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Car Loan</h3>
                  <p className="text-sm text-muted-foreground">4.5% APR</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$12,400.00</p>
                  <p className="text-sm text-muted-foreground">$341/mo</p>
                </div>
              </div>
              <Progress value={38} className="h-2 bg-muted" indicatorClassName="bg-finance-blue" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>38% paid off</span>
                <span>32 months remaining</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Student Loan</h3>
                  <p className="text-sm text-muted-foreground">5.8% APR</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$15,800.00</p>
                  <p className="text-sm text-muted-foreground">$230/mo</p>
                </div>
              </div>
              <Progress value={47} className="h-2 bg-muted" indicatorClassName="bg-finance-green" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>47% paid off</span>
                <span>6.5 years remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debt Payoff Plan</CardTitle>
            <CardDescription>AI-recommended payoff strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-lg border border-finance-yellow/20 bg-finance-yellow/5 p-4">
              <h3 className="mb-2 font-medium">Avalanche Method Recommended</h3>
              <p className="text-sm text-muted-foreground">
                Pay minimum on all debts, and put extra money toward the highest-interest debt first. This will save you the most in interest payments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium">Step 1: Pay off Credit Card</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Current: $4,250.00</span>
                  <span>18.99% APR</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Minimum: $85/mo</span>
                  <span className="text-sm font-medium text-finance-green">Recommended: $300/mo</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Payoff time: ~16 months (vs 72 months at minimum payment)
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium">Step 2: Pay off Student Loan</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Current: $15,800.00</span>
                  <span>5.8% APR</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Minimum: $230/mo</span>
                  <span className="text-sm font-medium text-muted-foreground">Next priority</span>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium">Step 3: Pay off Car Loan</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Current: $12,400.00</span>
                  <span>4.5% APR</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Minimum: $341/mo</span>
                  <span className="text-sm font-medium text-muted-foreground">Final priority</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button className="w-full">Apply Extra Payment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebtTracker;
