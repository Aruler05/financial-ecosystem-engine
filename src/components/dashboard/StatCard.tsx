
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | ReactNode;
  description: string | ReactNode;
  icon: ReactNode;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  iconClassName = "bg-primary/10 text-primary",
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClassName}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
