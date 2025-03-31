
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";

const IncomeTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Income Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your income sources.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Income
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$4,250.00</div>
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
              <div className="text-2xl font-bold">$3,500.00</div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                Salary
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Received on 1st of month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Side Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$750.00</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                Freelance
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Various dates</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Income Sources</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="p-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Salary</CardTitle>
                <div className="font-medium text-finance-green">$3,500.00</div>
              </div>
              <CardDescription>Company XYZ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Frequency</p>
                  <p>Monthly</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next Payment</p>
                  <p>Jul 1, 2023</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tax Rate</p>
                  <p>22%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Freelance Project</CardTitle>
                <div className="font-medium text-finance-purple">$500.00</div>
              </div>
              <CardDescription>Website Development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Frequency</p>
                  <p>One-time</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Received</p>
                  <p>Jun 15, 2023</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tax Status</p>
                  <p>Self-employment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Dividend Income</CardTitle>
                <div className="font-medium text-finance-blue">$250.00</div>
              </div>
              <CardDescription>Stock Investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Frequency</p>
                  <p>Quarterly</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Received</p>
                  <p>Jun 10, 2023</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tax Rate</p>
                  <p>15%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncomeTracker;
