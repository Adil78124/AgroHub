"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/shared/components/ui";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

import { GROWTH_CHART_CONFIG } from "../../../constants/recommendation.constants";
import { useRecommendations } from "../../../hooks/useRecommendations";
import { GrowthStatsCard } from "../../components/GrowthStatsCard/GrowthStatsCard";

/**
 * Пропсы для компонента GrowthForecastWidget
 */
export interface GrowthForecastWidgetProps {
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Виджет для отображения прогноза роста эффективности
 *
 * @param props - Пропсы компонента
 * @param props.className - Дополнительные CSS классы
 * @returns JSX элемент виджета прогноза роста
 * @example
 * ```typescript
 * <GrowthForecastWidget />
 * ```
 */
export const GrowthForecastWidget: React.FC<GrowthForecastWidgetProps> = ({
  className,
}) => {
  const { getGrowthForecast } = useRecommendations();
  const growthForecast = getGrowthForecast;

  // Вычисляем статистику для карточек
  const currentEfficiency = growthForecast[5]?.actual || 0; // около июня
  const targetEfficiency = 102; // цель через 12 месяцев
  const expectedGrowth = +(targetEfficiency - currentEfficiency).toFixed(1);

  return (
    <section className={`space-y-8 ${className || ""}`}>
      {/* Заголовок секции */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-900 to-purple-600 bg-clip-text text-transparent">
          Прогноз динамики роста эффективности
        </h2>
        <p className="text-gray-600 text-lg">
          Прогнозируемые показатели при соблюдении рекомендаций
        </p>
      </div>

      {/* Основная диаграмма */}
      <div className="animate-in fade-in-0 slide-in-from-bottom-4">
        <Card className="p-6 border-2 hover:shadow-xl transition-all duration-300">
          {/* Заголовок диаграммы */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Динамика эффективности
              </h3>
              <p className="text-sm text-gray-600">
                Текущие показатели и прогноз на 12 месяцев
              </p>
            </div>
          </div>

          {/* Диаграмма */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <ChartContainer
              className="aspect-[16/7]"
              config={GROWTH_CHART_CONFIG}
            >
              <ResponsiveContainer>
                <LineChart
                  data={growthForecast}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    domain={[75, 105]}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--color-actual)" }}
                    activeDot={{
                      r: 6,
                      stroke: "var(--color-actual)",
                      strokeWidth: 2,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="var(--color-projected)"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    dot={{ r: 4, fill: "var(--color-projected)" }}
                    activeDot={{
                      r: 6,
                      stroke: "var(--color-projected)",
                      strokeWidth: 2,
                    }}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
      </div>

      {/* Статистические карточки */}
      <div
        className="animate-in fade-in-0 slide-in-from-bottom-4"
        style={{ animationDelay: "200ms" }}
      >
        <GrowthStatsCard
          currentEfficiency={currentEfficiency}
          targetEfficiency={targetEfficiency}
          expectedGrowth={expectedGrowth}
        />
      </div>

      {/* Дополнительная информация */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Методология прогнозирования
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Прогноз основан на анализе текущих показателей эффективности и
              предполагаемом влиянии рекомендаций. Учитываются сезонные факторы,
              исторические данные и потенциальные риски. Регулярное обновление
              данных обеспечивает точность прогноза.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
