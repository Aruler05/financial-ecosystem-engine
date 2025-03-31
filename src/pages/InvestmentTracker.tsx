
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";

const InvestmentTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">Track and analyze your investments.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Investment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$145,320.00</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-indigo/10">
                <TrendingUp className="h-5 w-5 text-finance-indigo" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+$12,450.00 (9.4%) this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$85,720.00</div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                59% of portfolio
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+$8,200.00 (10.6%) this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Bonds & Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$42,300.00</div>
              <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                29% of portfolio
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+$2,850.00 (7.2%) this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Crypto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$17,300.00</div>
              <div className="rounded bg-finance-purple/10 px-2 py-1 text-xs font-medium text-finance-purple">
                12% of portfolio
              </div>
            </div>
            <p className="text-xs text-muted-foreground">+$1,400.00 (8.8%) this year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Holdings</CardTitle>
            <CardDescription>Your largest investments by value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                    AAPL
                  </div>
                  <div>
                    <p className="font-medium">Apple Inc.</p>
                    <p className="text-sm text-muted-foreground">Technology</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$18,450.00</p>
                  <p className="text-sm text-finance-green">+12.4%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200">
                    VOO
                  </div>
                  <div>
                    <p className="font-medium">Vanguard S&P 500 ETF</p>
                    <p className="text-sm text-muted-foreground">Index Fund</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$15,320.00</p>
                  <p className="text-sm text-finance-green">+9.2%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200">
                    BTC
                  </div>
                  <div>
                    <p className="font-medium">Bitcoin</p>
                    <p className="text-sm text-muted-foreground">Cryptocurrency</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$12,800.00</p>
                  <p className="text-sm text-finance-green">+15.7%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200">
                    MSFT
                  </div>
                  <div>
                    <p className="font-medium">Microsoft Corp.</p>
                    <p className="text-sm text-muted-foreground">Technology</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$11,250.00</p>
                  <p className="text-sm text-finance-green">+8.3%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200">
                    AMZN
                  </div>
                  <div>
                    <p className="font-medium">Amazon.com Inc.</p>
                    <p className="text-sm text-muted-foreground">Consumer Cyclical</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$9,850.00</p>
                  <p className="text-sm text-finance-red">-2.1%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Breakdown of your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-center">
              <div className="relative h-40 w-40 rounded-full border-8 border-[conic-gradient(var(--finance-blue)_0%,var(--finance-blue)_59%,var(--finance-indigo)_59%,var(--finance-indigo)_88%,var(--finance-purple)_88%,var(--finance-purple)_100%)]">
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-card">
                  <span className="text-lg font-bold">$145,320</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-blue"></div>
                  <span className="font-medium">Stocks - 59%</span>
                </div>
                <p className="text-sm text-muted-foreground">$85,720.00</p>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-indigo"></div>
                  <span className="font-medium">Bonds & ETFs - 29%</span>
                </div>
                <p className="text-sm text-muted-foreground">$42,300.00</p>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-purple"></div>
                  <span className="font-medium">Crypto - 12%</span>
                </div>
                <p className="text-sm text-muted-foreground">$17,300.00</p>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full">
                View Full Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentTracker;
