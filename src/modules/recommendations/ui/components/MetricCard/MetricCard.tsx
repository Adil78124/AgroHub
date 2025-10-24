import { AlertTriangle, BarChart3, CheckCircle2, Zap } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/components/ui";

import { METRIC_STATUS_MAP } from "../../../constants/recommendation.constants";
import type { Metric } from "../../../schemas/recommendation.schema";

/**
 * Пропсы для компонента MetricCard
 */
export interface MetricCardProps {
  /** Метрика для отображения */
  metric: Metric;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Компонент карточки метрики
 *
 * @param props - Пропсы компонента
 * @param props.metric - Объект с метрикой
 * @param props.className - Дополнительные CSS классы
 * @returns JSX элемент карточки метрики
 * @example
 * ```typescript
 * <MetricCard
 *   metric={{
 *     name: "pH почвы",
 *     value: 6.2,
 *     note: "Норма: 6-7.5",
 *     status: "ok"
 *   }}
 * />
 * ```
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  className,
}) => {
  const statusConfig = METRIC_STATUS_MAP[metric.status];

  // Определяем цветовую схему на основе статуса
  const getCardTheme = (status: string) => {
    switch (status) {
      case "ok":
        return {
          gradient: "from-yellow-50 to-amber-50",
          border: "border-yellow-200",
          icon: <Zap className="w-4 h-4 text-yellow-600" />,
          value: "text-yellow-700",
          note: "text-yellow-600",
        };
      case "warn":
        return {
          gradient: "from-red-50 to-rose-50",
          border: "border-red-200",
          icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
          value: "text-red-700",
          note: "text-red-600",
        };
      case "good":
        return {
          gradient: "from-green-50 to-emerald-50",
          border: "border-green-200",
          icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
          value: "text-green-700",
          note: "text-green-600",
        };
      default:
        return {
          gradient: "from-gray-50 to-slate-50",
          border: "border-gray-200",
          icon: <BarChart3 className="w-4 h-4 text-gray-600" />,
          value: "text-gray-700",
          note: "text-gray-600",
        };
    }
  };

  const theme = getCardTheme(metric.status);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl border-2 ${theme.border} 
        bg-gradient-to-br ${theme.gradient} p-4 transition-all duration-300 
        hover:shadow-lg hover:shadow-gray-200/50 
        hover:border-opacity-60 cursor-pointer
        ${className || ""}
      `}
    >
      {/* Декоративный элемент */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>

      {/* Иконка статуса */}
      <div className="text-lg mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
        {theme.icon}
      </div>

      {/* Название метрики */}
      <h4 className="text-sm font-medium text-gray-700 mb-2 group-hover:text-gray-800 transition-colors leading-tight">
        {metric.name}
      </h4>

      {/* Значение */}
      <div className="mb-2">
        <p
          className={`text-2xl font-bold ${theme.value} group-hover:scale-105 transition-transform`}
        >
          {metric.value}
        </p>
      </div>

      {/* Примечание и статус */}
      <div className="flex items-center justify-between">
        {metric.note && (
          <p
            className={`text-xs font-medium ${theme.note} group-hover:text-opacity-80 transition-colors`}
          >
            {metric.note}
          </p>
        )}

        {/* Статус бейдж */}
        <Badge
          className={`
            ${statusConfig.className} text-xs px-2 py-1 
            shadow-sm group-hover:shadow-md transition-all
          `}
        >
          {statusConfig.label}
        </Badge>
      </div>

      {/* Hover эффект - подчеркивание */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
};
