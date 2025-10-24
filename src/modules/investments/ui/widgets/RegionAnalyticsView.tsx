"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

export const description = "Динамика инвестиций";

const chartData = [
  { year: "2020", baseInvestment: 28, additionalInvestment: 1.5 },
  { year: "2021", baseInvestment: 32, additionalInvestment: 2.2 },
  { year: "2022", baseInvestment: 36, additionalInvestment: 2.8 },
  { year: "2023", baseInvestment: 40, additionalInvestment: 3.5 },
  { year: "2024", baseInvestment: 43, additionalInvestment: 4.2 },
];

const chartConfig = {
  baseInvestment: {
    label: "Базовые инвестиции",
    color: "#14b8a6", // teal-500
  },
  additionalInvestment: {
    label: "Дополнительные инвестиции",
    color: "#0ea5e9", // sky-500
  },
} satisfies ChartConfig;

/**
 * Виджет для отображения динамики инвестиций
 *
 * @returns JSX элемент виджета динамики инвестиций
 * @example
 * ```typescript
 * <RegionAnalyticsView />
 * ```
 */
export function RegionAnalyticsView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Динамика инвестиций
        </CardTitle>
        <CardDescription>
          Показывает рост инвестиций в АПК за последние 5 лет
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 60]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* Базовые инвестиции (нижний слой) */}
            <Area
              dataKey="baseInvestment"
              type="monotone"
              fill="var(--color-baseInvestment)"
              fillOpacity={0.8}
              stroke="var(--color-baseInvestment)"
              strokeWidth={2}
              stackId="1"
            />
            {/* Дополнительные инвестиции (верхний слой) */}
            <Area
              dataKey="additionalInvestment"
              type="monotone"
              fill="var(--color-additionalInvestment)"
              fillOpacity={0.8}
              stroke="var(--color-additionalInvestment)"
              strokeWidth={2}
              stackId="1"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Рост инвестиций на 57% за 5 лет <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              2020 - 2024 гг.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
