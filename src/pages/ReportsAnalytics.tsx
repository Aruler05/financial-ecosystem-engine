
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Calendar, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportsAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">In-depth analysis of your financial data.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" /> Jun 2023
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="savings">Savings & Debt</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,250.00</div>
                <div className="flex items-center mt-1">
                  <div className="text-xs mr-2 text-finance-green">+8.2%</div>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,540.00</div>
                <div className="flex items-center mt-1">
                  <div className="text-xs mr-2 text-finance-red">+12%</div>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Net Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,710.00</div>
                <div className="flex items-center mt-1">
                  <div className="text-xs mr-2 text-finance-green">+2.5%</div>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40.2%</div>
                <div className="flex items-center mt-1">
                  <div className="text-xs mr-2 text-finance-blue">-1.8%</div>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Financial Summary</CardTitle>
              <CardDescription>Income vs. Expenses (Last 6 Months)</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="flex items-center justify-center rounded-full bg-muted/50 p-10">
                <BarChart3 className="h-20 w-20 text-muted-foreground" />
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Expense Categories</CardTitle>
                <CardDescription>June 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-finance-red"></div>
                      <span>Housing</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$1,200.00</span>
                      <p className="text-xs text-muted-foreground">47.2% of expenses</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-finance-green"></div>
                      <span>Food</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$420.00</span>
                      <p className="text-xs text-muted-foreground">16.5% of expenses</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-finance-blue"></div>
                      <span>Transportation</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$350.00</span>
                      <p className="text-xs text-muted-foreground">13.8% of expenses</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-finance-purple"></div>
                      <span>Entertainment</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$180.00</span>
                      <p className="text-xs text-muted-foreground">7.1% of expenses</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-finance-yellow"></div>
                      <span>Other</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$390.00</span>
                      <p className="text-xs text-muted-foreground">15.4% of expenses</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>AI-powered financial recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-finance-green/20 bg-finance-green/5 p-4">
                  <h3 className="font-medium">Spending Pattern</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your restaurant spending has decreased by 15% compared to last month. Great job cutting back!
                  </p>
                </div>

                <div className="rounded-lg border border-finance-blue/20 bg-finance-blue/5 p-4">
                  <h3 className="font-medium">Budget Alert</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You've spent 87.5% of your transportation budget, and there are still 12 days left in the month.
                  </p>
                </div>

                <div className="rounded-lg border border-finance-purple/20 bg-finance-purple/5 p-4">
                  <h3 className="font-medium">Savings Opportunity</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on your cash flow, you could increase your monthly savings by $200 while maintaining your current lifestyle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Analysis</CardTitle>
              <CardDescription>Details of your income sources and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Income visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Select the Income tab to view your income details and analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Details of your spending patterns and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Expense visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Select the Expenses tab to view your spending details and analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Analysis</CardTitle>
              <CardDescription>Details of your budget performance and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Budget visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Select the Budget tab to view your budget details and analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="savings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Savings & Debt Analysis</CardTitle>
              <CardDescription>Details of your savings, investments, and debt</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Savings & Debt visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Select the Savings & Debt tab to view your financial details and analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
