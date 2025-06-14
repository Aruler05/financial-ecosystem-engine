
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { CheckCircle, TrendingDown, Calendar, Target } from "lucide-react";

interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  completionDate: string;
  color: string;
}

interface AccomplishedGoal {
  id: number;
  name: string;
  target: number;
  completedDate: string;
  timeToComplete: string;
}

interface SavingsGap {
  goalName: string;
  expectedAmount: number;
  actualAmount: number;
  shortfall: number;
  monthsBehind: number;
}

interface FuturePlanning {
  goalName: string;
  projectedCompletion: string;
  totalSavingsNeeded: number;
  monthsRemaining: number;
  onTrack: boolean;
}

interface SavingsHistoryProps {
  activeGoals: SavingsGoal[];
}

export const SavingsHistory = ({ activeGoals }: SavingsHistoryProps) => {
  // Sample accomplished goals data
  const accomplishedGoals: AccomplishedGoal[] = [
    {
      id: 1,
      name: "Emergency Fund (Initial)",
      target: 10000,
      completedDate: "Jan 2024",
      timeToComplete: "18 months"
    },
    {
      id: 2,
      name: "Wedding Fund",
      target: 8500,
      completedDate: "Sep 2023",
      timeToComplete: "14 months"
    }
  ];

  // Calculate savings gaps for active goals
  const calculateSavingsGaps = (): SavingsGap[] => {
    return activeGoals.map(goal => {
      // Assume goals were started 6 months ago for calculation
      const monthsElapsed = 6;
      const expectedAmount = goal.monthlyContribution * monthsElapsed;
      const shortfall = Math.max(0, expectedAmount - goal.current);
      const monthsBehind = shortfall > 0 ? Math.ceil(shortfall / goal.monthlyContribution) : 0;
      
      return {
        goalName: goal.name,
        expectedAmount,
        actualAmount: goal.current,
        shortfall,
        monthsBehind
      };
    }).filter(gap => gap.shortfall > 0);
  };

  // Calculate future planning projections
  const calculateFuturePlanning = (): FuturePlanning[] => {
    return activeGoals.map(goal => {
      const remaining = goal.target - goal.current;
      const monthsRemaining = Math.ceil(remaining / goal.monthlyContribution);
      const projectedDate = new Date();
      projectedDate.setMonth(projectedDate.getMonth() + monthsRemaining);
      
      // Check if on track (within 10% of expected progress)
      const expectedProgress = (goal.current / goal.target) * 100;
      const onTrack = expectedProgress >= 40; // Assuming goals should be at least 40% complete by now
      
      return {
        goalName: goal.name,
        projectedCompletion: projectedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        totalSavingsNeeded: remaining,
        monthsRemaining,
        onTrack
      };
    });
  };

  const savingsGaps = calculateSavingsGaps();
  const futurePlanning = calculateFuturePlanning();

  return (
    <div className="space-y-6">
      {/* Accomplished Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-finance-green" />
            Accomplished Goals
          </CardTitle>
          <CardDescription>Your completed savings achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accomplishedGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-4 rounded-lg border bg-finance-green/5 border-finance-green/20">
                <div className="space-y-1">
                  <h3 className="font-medium text-finance-green">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed in {goal.timeToComplete} • {goal.completedDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-finance-green">
                    <CurrencyDisplay amount={goal.target} />
                  </p>
                  <Badge variant="outline" className="text-finance-green border-finance-green">
                    Achieved
                  </Badge>
                </div>
              </div>
            ))}
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">
                Total accomplished: <span className="font-semibold text-finance-green">
                  <CurrencyDisplay amount={accomplishedGoals.reduce((sum, goal) => sum + goal.target, 0)} />
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Gaps Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-finance-orange" />
            Savings Gaps Analysis
          </CardTitle>
          <CardDescription>Areas where you're behind on your savings targets</CardDescription>
        </CardHeader>
        <CardContent>
          {savingsGaps.length > 0 ? (
            <div className="space-y-4">
              {savingsGaps.map((gap, index) => (
                <div key={index} className="p-4 rounded-lg border bg-finance-orange/5 border-finance-orange/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{gap.goalName}</h3>
                    <Badge variant="outline" className="text-finance-orange border-finance-orange">
                      {gap.monthsBehind} months behind
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expected by now</p>
                      <p className="font-medium"><CurrencyDisplay amount={gap.expectedAmount} /></p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Actual amount</p>
                      <p className="font-medium"><CurrencyDisplay amount={gap.actualAmount} /></p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Shortfall</span>
                      <span className="font-medium text-finance-orange">
                        <CurrencyDisplay amount={gap.shortfall} />
                      </span>
                    </div>
                    <Progress 
                      value={(gap.actualAmount / gap.expectedAmount) * 100} 
                      className="h-2 bg-muted"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-finance-green" />
              <p>Great job! You're on track with all your savings goals.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Future Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-finance-blue" />
            Future Planning
          </CardTitle>
          <CardDescription>Projected completion dates and savings outlook</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {futurePlanning.map((plan, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{plan.goalName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Projected completion: {plan.projectedCompletion}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={plan.onTrack ? "text-finance-green border-finance-green" : "text-finance-orange border-finance-orange"}
                  >
                    {plan.onTrack ? "On Track" : "Needs Attention"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Remaining to save</p>
                    <p className="font-medium"><CurrencyDisplay amount={plan.totalSavingsNeeded} /></p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Months remaining</p>
                    <p className="font-medium">{plan.monthsRemaining} months</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-finance-purple" />
            Savings Insights
          </CardTitle>
          <CardDescription>Key metrics and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-finance-green/10">
              <p className="text-2xl font-bold text-finance-green">{accomplishedGoals.length}</p>
              <p className="text-sm text-muted-foreground">Goals Completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-finance-orange/10">
              <p className="text-2xl font-bold text-finance-orange">{savingsGaps.length}</p>
              <p className="text-sm text-muted-foreground">Goals Behind Schedule</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-finance-blue/10">
              <p className="text-2xl font-bold text-finance-blue">
                {futurePlanning.filter(p => p.onTrack).length}/{futurePlanning.length}
              </p>
              <p className="text-sm text-muted-foreground">Goals On Track</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
