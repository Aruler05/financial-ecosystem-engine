
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

interface LoanInsightsProps {
  onRefinanceClick: (id: number) => void;
  onExtraPaymentClick: (id: number) => void;
}

export const LoanInsights = ({ onRefinanceClick, onExtraPaymentClick }: LoanInsightsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Insights</CardTitle>
        <CardDescription>Analysis of your loan portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interest Breakdown */}
        <div className="rounded-lg border border-finance-blue/20 bg-finance-blue/5 p-4">
          <h3 className="font-semibold text-base mb-3">Interest Breakdown</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Total interest paid and remaining
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span>Paid to date:</span>
              <span className="font-semibold">
                <CurrencyDisplay amount={32450.00} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Remaining:</span>
              <span className="font-semibold">
                <CurrencyDisplay amount={115200.00} />
              </span>
            </div>
            <div className="flex justify-between items-center border-t pt-3 mt-3">
              <span className="font-medium">Total interest:</span>
              <span className="font-bold">
                <CurrencyDisplay amount={147650.00} />
              </span>
            </div>
          </div>
        </div>

        {/* Refinance Opportunity */}
        <div className="rounded-lg border border-finance-green/20 bg-finance-green/5 p-4">
          <h3 className="font-semibold text-base mb-3">Refinance Opportunity</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Refinancing your mortgage at current rates could save you up to{" "}
            <span className="font-semibold text-finance-green">
              <CurrencyDisplay amount={340.00} />
            </span>
            /month.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onRefinanceClick(1)}
          >
            Explore Options
          </Button>
        </div>

        {/* Extra Payment Impact */}
        <div className="rounded-lg border border-finance-purple/20 bg-finance-purple/5 p-4">
          <h3 className="font-semibold text-base mb-3">Extra Payment Impact</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Adding{" "}
            <span className="font-semibold text-finance-purple">
              <CurrencyDisplay amount={200.00} showSymbol={true} />
            </span>
            /month to your mortgage payment:
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span>Time saved:</span>
              <span className="font-semibold">4 years 8 months</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Interest saved:</span>
              <span className="font-semibold">
                <CurrencyDisplay amount={43200.00} />
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={() => onExtraPaymentClick(1)}
          >
            Apply Extra Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
