
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Plus } from "lucide-react";

const BillTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bill Reminders</h1>
          <p className="text-muted-foreground">Keep track of your upcoming bills and payments.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Bill
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Due this week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$485.64</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-orange/10">
                <BellRing className="h-5 w-5 text-finance-orange" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">3 upcoming bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Due next week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$340.25</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-blue/10">
                <BellRing className="h-5 w-5 text-finance-blue" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">2 upcoming bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1,875.89</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-purple/10">
                <BellRing className="h-5 w-5 text-finance-purple" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">8 regular bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$0.00</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-finance-green/10">
                <BellRing className="h-5 w-5 text-finance-green" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">No overdue bills</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Bills due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Card className="border shadow-none">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Electricity Bill</h3>
                      <p className="text-sm text-muted-foreground">Due in 2 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$85.40</p>
                      <div className="rounded bg-finance-red/10 px-2 py-1 text-xs font-medium text-finance-red">
                        High Priority
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-none">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Internet</h3>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$59.99</p>
                      <div className="rounded bg-finance-orange/10 px-2 py-1 text-xs font-medium text-finance-orange">
                        Medium Priority
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-none">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Credit Card</h3>
                      <p className="text-sm text-muted-foreground">Due in 7 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$340.25</p>
                      <div className="rounded bg-finance-orange/10 px-2 py-1 text-xs font-medium text-finance-orange">
                        Medium Priority
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-none">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Water Bill</h3>
                      <p className="text-sm text-muted-foreground">Due in 12 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$45.20</p>
                      <div className="rounded bg-finance-blue/10 px-2 py-1 text-xs font-medium text-finance-blue">
                        Low Priority
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurring Bills</CardTitle>
            <CardDescription>Monthly recurring payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">Rent</h3>
                  <p className="text-sm text-muted-foreground">Monthly on 1st</p>
                </div>
                <p className="font-bold">$1,200.00</p>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">Internet</h3>
                  <p className="text-sm text-muted-foreground">Monthly on 5th</p>
                </div>
                <p className="font-bold">$59.99</p>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">Electricity</h3>
                  <p className="text-sm text-muted-foreground">Monthly on 15th</p>
                </div>
                <p className="font-bold">$85.40</p>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">Phone Plan</h3>
                  <p className="text-sm text-muted-foreground">Monthly on 18th</p>
                </div>
                <p className="font-bold">$45.00</p>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">Streaming Services</h3>
                  <p className="text-sm text-muted-foreground">Monthly on 22nd</p>
                </div>
                <p className="font-bold">$35.97</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Gym Membership</h3>
                  <p className="text-sm text-muted-foreground">Monthly on 25th</p>
                </div>
                <p className="font-bold">$29.99</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillTracker;
