
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LoanTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Tracker</h1>
          <p className="text-muted-foreground">Manage and track your loans in one place.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Loan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-gray/10">
                <Wallet className="h-5 w-5 text-finance-gray" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">2 personal, 1 mortgage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$235,800.00</div>
              <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
                3 loans
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Outstanding principal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1,356.00</div>
              <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                Combined
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total monthly outflow</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Jul 1, 2023</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                12 days
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Mortgage payment due</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Overview of your active loans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">Mortgage Loan</h3>
                    <p className="text-sm text-muted-foreground">Home First Bank</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                      Fixed Rate
                    </div>
                    <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                      3.75% APR
                    </div>
                  </div>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Original Amount</p>
                    <p className="font-medium">$320,000.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="font-medium">$215,600.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium">$985.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payment</p>
                    <p className="font-medium">Jul 1, 2023</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Progress</span>
                    <span>32.6% paid off</span>
                  </div>
                  <Progress value={32.6} className="h-2 bg-muted" indicatorClassName="bg-finance-blue" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>21 years 4 months remaining</span>
                    <span>Started: May 2018</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">Auto Loan</h3>
                    <p className="text-sm text-muted-foreground">Reliable Auto Finance</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                      Fixed Rate
                    </div>
                    <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                      4.5% APR
                    </div>
                  </div>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Original Amount</p>
                    <p className="font-medium">$20,000.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="font-medium">$12,400.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium">$341.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payment</p>
                    <p className="font-medium">Jul 15, 2023</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Progress</span>
                    <span>38% paid off</span>
                  </div>
                  <Progress value={38} className="h-2 bg-muted" indicatorClassName="bg-finance-green" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>32 months remaining</span>
                    <span>Started: Oct 2021</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">Personal Loan</h3>
                    <p className="text-sm text-muted-foreground">Community Credit Union</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                      Fixed Rate
                    </div>
                    <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                      8.25% APR
                    </div>
                  </div>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Original Amount</p>
                    <p className="font-medium">$10,000.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="font-medium">$7,800.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium">$230.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payment</p>
                    <p className="font-medium">Jul 5, 2023</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Progress</span>
                    <span>22% paid off</span>
                  </div>
                  <Progress value={22} className="h-2 bg-muted" indicatorClassName="bg-finance-purple" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>36 months remaining</span>
                    <span>Started: Jan 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Loan Insights</CardTitle>
            <CardDescription>Analysis of your loan portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-finance-blue/20 bg-finance-blue/5 p-4">
              <h3 className="mb-2 font-medium">Interest Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Total interest paid and remaining
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Paid to date:</span>
                  <span className="font-medium">$32,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-medium">$115,200.00</span>
                </div>
                <div className="flex justify-between border-t pt-1 mt-1">
                  <span>Total interest:</span>
                  <span className="font-medium">$147,650.00</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-finance-green/20 bg-finance-green/5 p-4">
              <h3 className="mb-2 font-medium">Refinance Opportunity</h3>
              <p className="text-sm text-muted-foreground">
                Refinancing your mortgage at current rates could save you up to $340/month.
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Explore Options
              </Button>
            </div>

            <div className="rounded-lg border border-finance-purple/20 bg-finance-purple/5 p-4">
              <h3 className="mb-2 font-medium">Extra Payment Impact</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Adding $200/month to your mortgage payment:
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Time saved:</span>
                  <span className="font-medium">4 years 8 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest saved:</span>
                  <span className="font-medium">$43,200.00</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Apply Extra Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanTracker;
