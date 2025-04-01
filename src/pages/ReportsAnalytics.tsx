
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, Download, Calendar, Filter, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { useCurrency } from "@/contexts/CurrencyContext";

const ReportsAnalytics = () => {
  const { currencySymbol } = useCurrency();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">In-depth analysis of your financial data.</p>
        </div>
        <div className="flex flex-wrap gap-2">
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

      <div className="relative">
        <Search className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports..."
          className="pl-9 mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
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
                <div className="text-2xl font-bold">
                  <CurrencyDisplay amount={4250.00} />
                </div>
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
                <div className="text-2xl font-bold">
                  <CurrencyDisplay amount={2540.00} />
                </div>
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
                <div className="text-2xl font-bold">
                  <CurrencyDisplay amount={1710.00} />
                </div>
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
                <p className="text-muted-foreground ml-4">Chart visualization would appear here</p>
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
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-finance-red"></div>
                          <span>Housing</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <span className="font-medium">
                            <CurrencyDisplay amount={1200.00} />
                          </span>
                          <p className="text-xs text-muted-foreground">47.2% of expenses</p>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-finance-green"></div>
                          <span>Food</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <span className="font-medium">
                            <CurrencyDisplay amount={420.00} />
                          </span>
                          <p className="text-xs text-muted-foreground">16.5% of expenses</p>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-finance-blue"></div>
                          <span>Transportation</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <span className="font-medium">
                            <CurrencyDisplay amount={350.00} />
                          </span>
                          <p className="text-xs text-muted-foreground">13.8% of expenses</p>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-finance-purple"></div>
                          <span>Entertainment</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <span className="font-medium">
                            <CurrencyDisplay amount={180.00} />
                          </span>
                          <p className="text-xs text-muted-foreground">7.1% of expenses</p>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-finance-yellow"></div>
                          <span>Other</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <span className="font-medium">
                            <CurrencyDisplay amount={390.00} />
                          </span>
                          <p className="text-xs text-muted-foreground">15.4% of expenses</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Income Analysis</CardTitle>
                  <CardDescription>Details of your income sources and trends</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Income Report</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Income Report</DialogTitle>
                      <DialogDescription>
                        Customize your income report parameters.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Form fields would go here */}
                      <p className="text-muted-foreground">Report configuration options would appear here</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Generate Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead className="hidden md:table-cell">Tax Rate</TableHead>
                    <TableHead className="hidden md:table-cell">Annual Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Salary</TableCell>
                    <TableCell><CurrencyDisplay amount={3500.00} /></TableCell>
                    <TableCell>Monthly</TableCell>
                    <TableCell className="hidden md:table-cell">22%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={42000.00} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Freelance</TableCell>
                    <TableCell><CurrencyDisplay amount={750.00} /></TableCell>
                    <TableCell>Variable</TableCell>
                    <TableCell className="hidden md:table-cell">Self-employment</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={9000.00} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Investments</TableCell>
                    <TableCell><CurrencyDisplay amount={250.00} /></TableCell>
                    <TableCell>Quarterly</TableCell>
                    <TableCell className="hidden md:table-cell">15%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={1000.00} /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Expense Analysis</CardTitle>
                  <CardDescription>Details of your spending patterns and trends</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Expense Report</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Expense Report</DialogTitle>
                      <DialogDescription>
                        Customize your expense report parameters.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Form fields would go here */}
                      <p className="text-muted-foreground">Report configuration options would appear here</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Generate Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>This Month</TableHead>
                    <TableHead>Last Month</TableHead>
                    <TableHead className="hidden md:table-cell">Change</TableHead>
                    <TableHead className="hidden md:table-cell">Budget</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Housing</TableCell>
                    <TableCell><CurrencyDisplay amount={1200.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={1200.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">0%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={1200.00} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Food</TableCell>
                    <TableCell><CurrencyDisplay amount={520.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={610.00} /></TableCell>
                    <TableCell className="hidden md:table-cell text-finance-green">-15%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={600.00} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Transportation</TableCell>
                    <TableCell><CurrencyDisplay amount={350.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={280.00} /></TableCell>
                    <TableCell className="hidden md:table-cell text-finance-red">+25%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={400.00} /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Budget Analysis</CardTitle>
                  <CardDescription>Details of your budget performance and trends</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Budget Report</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Budget Report</DialogTitle>
                      <DialogDescription>
                        Customize your budget report parameters.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Form fields would go here */}
                      <p className="text-muted-foreground">Report configuration options would appear here</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Generate Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Budgeted</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead className="hidden md:table-cell">Remaining</TableHead>
                    <TableHead className="hidden md:table-cell">% Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Housing</TableCell>
                    <TableCell><CurrencyDisplay amount={1200.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={1200.00} /></TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={0.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">100%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Food</TableCell>
                    <TableCell><CurrencyDisplay amount={600.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={520.00} /></TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={80.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">87%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Transportation</TableCell>
                    <TableCell><CurrencyDisplay amount={400.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={350.00} /></TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={50.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">88%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="savings" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Savings & Debt Analysis</CardTitle>
                  <CardDescription>Details of your savings, investments, and debt</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Savings Report</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Savings Report</DialogTitle>
                      <DialogDescription>
                        Customize your savings report parameters.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Form fields would go here */}
                      <p className="text-muted-foreground">Report configuration options would appear here</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Generate Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Monthly Contribution</TableHead>
                    <TableHead className="hidden md:table-cell">Interest Rate</TableHead>
                    <TableHead className="hidden md:table-cell">Goal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Emergency Fund</TableCell>
                    <TableCell><CurrencyDisplay amount={5000.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={200.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">0.5%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={10000.00} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Retirement</TableCell>
                    <TableCell><CurrencyDisplay amount={45000.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={500.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">7%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={1000000.00} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Credit Card Debt</TableCell>
                    <TableCell><CurrencyDisplay amount={2500.00} /></TableCell>
                    <TableCell><CurrencyDisplay amount={300.00} /></TableCell>
                    <TableCell className="hidden md:table-cell">18%</TableCell>
                    <TableCell className="hidden md:table-cell"><CurrencyDisplay amount={0.00} /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
