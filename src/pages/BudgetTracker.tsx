
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calculator, Plus } from "lucide-react";

const BudgetTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
          <p className="text-muted-foreground">Plan and track your monthly budget.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Budget
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$3,200.00</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-purple/10">
                <Calculator className="h-5 w-5 text-finance-purple" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Monthly budget allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Spent So Far</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1,840.00</div>
              <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                57.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">of monthly budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1,360.00</div>
              <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                42.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">for this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Daily Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$45.33</div>
              <div className="rounded bg-finance-orange/10 px-2 py-1 text-xs font-medium text-finance-orange">
                12 days left
              </div>
            </div>
            <p className="text-xs text-muted-foreground">remaining per day</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Budget allocation by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-red"></div>
                  <span>Housing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$1,200 / $1,500</span>
                  <span className="text-xs text-muted-foreground">80%</span>
                </div>
              </div>
              <Progress value={80} className="h-2 bg-muted" indicatorClassName="bg-finance-red" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-green"></div>
                  <span>Food</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$420 / $600</span>
                  <span className="text-xs text-muted-foreground">70%</span>
                </div>
              </div>
              <Progress value={70} className="h-2 bg-muted" indicatorClassName="bg-finance-green" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-blue"></div>
                  <span>Transportation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$350 / $400</span>
                  <span className="text-xs text-muted-foreground">87.5%</span>
                </div>
              </div>
              <Progress value={87.5} className="h-2 bg-muted" indicatorClassName="bg-finance-blue" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-purple"></div>
                  <span>Entertainment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$180 / $250</span>
                  <span className="text-xs text-muted-foreground">72%</span>
                </div>
              </div>
              <Progress value={72} className="h-2 bg-muted" indicatorClassName="bg-finance-purple" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-finance-orange"></div>
                  <span>Utilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$250 / $300</span>
                  <span className="text-xs text-muted-foreground">83.3%</span>
                </div>
              </div>
              <Progress value={83.3} className="h-2 bg-muted" indicatorClassName="bg-finance-orange" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Performance</CardTitle>
            <CardDescription>Monthly budget history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">June 2023</div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                    Under Budget
                  </div>
                  <span className="font-medium">-$320</span>
                </div>
              </div>
              <Progress value={88} className="h-2 bg-muted" indicatorClassName="bg-finance-green" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$2,880 spent</span>
                <span>of $3,200 budget</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">May 2023</div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
                    Over Budget
                  </div>
                  <span className="font-medium">+$150</span>
                </div>
              </div>
              <Progress value={105} className="h-2 bg-muted" indicatorClassName="bg-finance-red" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$3,350 spent</span>
                <span>of $3,200 budget</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">April 2023</div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                    Under Budget
                  </div>
                  <span className="font-medium">-$210</span>
                </div>
              </div>
              <Progress value={93} className="h-2 bg-muted" indicatorClassName="bg-finance-green" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$2,990 spent</span>
                <span>of $3,200 budget</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">March 2023</div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-finance-green/10 px-2 py-1 text-xs font-medium text-finance-green">
                    Under Budget
                  </div>
                  <span className="font-medium">-$50</span>
                </div>
              </div>
              <Progress value={98} className="h-2 bg-muted" indicatorClassName="bg-finance-green" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$3,150 spent</span>
                <span>of $3,200 budget</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetTracker;
