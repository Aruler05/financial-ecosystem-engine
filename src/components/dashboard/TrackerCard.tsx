
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TrackerCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
  iconClassName?: string;
}

export function TrackerCard({
  title,
  description,
  icon,
  path,
  className,
  iconClassName,
}: TrackerCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className={cn("tracker-icon", iconClassName)}>{icon}</div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link to={path} className="flex items-center gap-2">
            View <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
