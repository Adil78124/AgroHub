import { BarChart3, Crosshair, LineChart } from "lucide-react";
import React from "react";

import { Card } from "@/shared/components/ui";

/**
 * Пропсы для компонента GrowthStatsCard
 */
export interface GrowthStatsCardProps {
  /** Текущая эффективность */
  currentEfficiency: number;
  /** Целевая эффективность */
  targetEfficiency: number;
  /** Ожидаемый прирост */
  expectedGrowth: number;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Компонент карточки статистики роста
 *
 * @param props - Пропсы компонента
 * @param props.currentEfficiency - Текущая эффективность
 * @param props.targetEfficiency - Целевая эффективность
 * @param props.expectedGrowth - Ожидаемый прирост
 * @param props.className - Дополнительные CSS классы
 * @returns JSX элемент карточки статистики роста
 * @example
 * ```typescript
 * <GrowthStatsCard
 *   currentEfficiency={84.5}
 *   targetEfficiency={102}
 *   expectedGrowth={17.5}
 * />
 * ```
 */
export const GrowthStatsCard: React.FC<GrowthStatsCardProps> = ({
  currentEfficiency,
  targetEfficiency,
  expectedGrowth,
  className,
}) => {
  const stats = [
    {
      value: currentEfficiency.toFixed(1) + "%",
      label: "Текущая эффективность",
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      gradient: "from-blue-50 to-cyan-50",
      border: "border-blue-200",
      valueColor: "text-blue-700",
      labelColor: "text-blue-600",
    },
    {
      value: targetEfficiency + "%",
      label: "Цель через 12 месяцев",
      icon: <Crosshair className="w-12 h-12 text-green-600" />,
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-200",
      valueColor: "text-green-700",
      labelColor: "text-green-600",
    },
    {
      value: "+" + expectedGrowth + "%",
      label: "Ожидаемый прирост",
      icon: <LineChart className="w-12 h-12 text-purple-600" />,
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-200",
      valueColor: "text-purple-700",
      labelColor: "text-purple-600",
    },
  ];

  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${className || ""}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="animate-in fade-in-0 slide-in-from-bottom-4"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          <Card
            className={`
              group relative overflow-hidden border-2 ${stat.border} 
              bg-gradient-to-br ${stat.gradient} p-6 transition-all duration-300 
              hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 
              hover:border-opacity-60 cursor-pointer text-center
            `}
          >
            {/* Декоративный элемент */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>

            {/* Иконка */}
            <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity flex justify-center">
              {stat.icon}
            </div>

            {/* Значение */}
            <p
              className={`text-3xl font-bold ${stat.valueColor} mb-2 group-hover:scale-105 transition-transform`}
            >
              {stat.value}
            </p>

            {/* Подпись */}
            <p
              className={`text-sm font-medium ${stat.labelColor} group-hover:text-opacity-80 transition-colors`}
            >
              {stat.label}
            </p>

            {/* Hover эффект - подчеркивание */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
          </Card>
        </div>
      ))}
    </div>
  );
};
