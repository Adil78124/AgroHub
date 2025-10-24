"use client";

import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

/**
 * Данные для графика прогноза урожайности по регионам
 */
interface YieldForecastData {
  /** Название региона */
  region: string;
  /** Основной показатель (зеленая линия) */
  mainMetric: number;
  /** Вторичный показатель (серые столбцы) */
  secondaryMetric: number;
  /** Дополнительный показатель (синие столбцы) */
  additionalMetric: number;
}

/**
 * Конфигурация цветов для графика
 */
const chartConfig: ChartConfig = {
  mainMetric: {
    label: "Основной показатель",
    color: "#22c55e", // Зеленый цвет для линии
  },
  secondaryMetric: {
    label: "Вторичный показатель",
    color: "#9ca3af", // Серый цвет для столбцов
  },
  additionalMetric: {
    label: "Дополнительный показатель",
    color: "#3b82f6", // Синий цвет для столбцов
  },
};

/**
 * Моковые данные для демонстрации графика
 */
const mockData: YieldForecastData[] = [
  {
    region: "Абайский",
    mainMetric: 88,
    secondaryMetric: 2,
    additionalMetric: 4,
  },
  {
    region: "Аксуский",
    mainMetric: 83,
    secondaryMetric: 2,
    additionalMetric: 4,
  },
  {
    region: "Темиртауский",
    mainMetric: 88,
    secondaryMetric: 2,
    additionalMetric: 4,
  },
  {
    region: "Шетский",
    mainMetric: 79,
    secondaryMetric: 2,
    additionalMetric: 4,
  },
  {
    region: "Карагандинский",
    mainMetric: 80,
    secondaryMetric: 2,
    additionalMetric: 4,
  },
];

/**
 * Компонент для отображения прогноза урожайности по регионам
 *
 * Отображает комбинированный график с линией (основной показатель)
 * и столбцами (вторичные показатели) для различных регионов
 * @returns JSX элемент виджета прогноза урожайности по регионам
 * @example
 * ```typescript
 * <YieldForecastByRegionView />
 * ```
 */
export const YieldForecastByRegionView: React.FC = () => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">
        Прогноз урожайности по регионам
      </h3>

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.3}
            />
            <XAxis
              dataKey="region"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "#9ca3af" }}
              axisLine={{ stroke: "#9ca3af" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "#9ca3af" }}
              axisLine={{ stroke: "#9ca3af" }}
              tickCount={5}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Регион: ${value}`}
                  formatter={(value, name) => [
                    `${value}%`,
                    chartConfig[name as keyof typeof chartConfig]?.label ||
                      name,
                  ]}
                />
              }
            />

            {/* Серые столбцы (вторичный показатель) */}
            <Bar
              dataKey="secondaryMetric"
              fill="var(--color-secondaryMetric)"
              radius={[2, 2, 0, 0]}
              maxBarSize={20}
            />

            {/* Синие столбцы (дополнительный показатель) */}
            <Bar
              dataKey="additionalMetric"
              fill="var(--color-additionalMetric)"
              radius={[2, 2, 0, 0]}
              maxBarSize={20}
            />

            {/* Зеленая линия (основной показатель) */}
            <Line
              type="monotone"
              dataKey="mainMetric"
              stroke="var(--color-mainMetric)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-mainMetric)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: "var(--color-mainMetric)",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
