import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

import { Badge } from "@/shared/components/ui";
import { Progress } from "@/shared/components/ui/progress";
interface RiskAnalysisCardProps {
  name: string;
  status: "low" | "medium" | "high";
  progress: number;
  note: string;
}
export const RiskAnalysisCard = ({
  name,
  status,
  progress,
  note,
}: RiskAnalysisCardProps) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="flex items-center gap-2">
          {status === "low" && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          {status === "medium" && (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          )}
          {status === "high" && (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          {{ low: "Низкий", medium: "Средний", high: "Высокий" }[status]} {name}
        </h4>
        <Badge
          variant={
            status === "low"
              ? "low"
              : status === "medium"
              ? "warn"
              : "destructive"
          }
        >
          {{ low: "Низкий", medium: "Средний", high: "Высокий" }[status]}
        </Badge>
      </div>
      <Progress
        value={progress}
        progressStyles={
          status === "low"
            ? "bg-green-500"
            : status === "medium"
            ? "bg-yellow-500"
            : "bg-red-500"
        }
      />
      <span className="text-sm text-gray-500">{note}</span>
    </section>
  );
};
