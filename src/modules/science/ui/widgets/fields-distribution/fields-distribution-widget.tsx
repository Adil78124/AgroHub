"use client";

import React from "react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Progress } from "@/shared/components/ui/progress";

const data = [
  { name: "Растениеводство", value: 42, fill: "#10b981" }, // emerald-500
  { name: "Животноводство", value: 28, fill: "#f59e0b" }, // amber-500
  { name: "Агротехнологии", value: 15, fill: "#3b82f6" }, // blue-500
  { name: "Экология", value: 10, fill: "#14b8a6" }, // teal-500
  { name: "Почвоведение", value: 5, fill: "#6b7280" }, // gray-500
];

const chartConfig = {
  crop: { label: "Растениеводство", color: "#10b981" },
  livestock: { label: "Животноводство", color: "#f59e0b" },
  agrotech: { label: "Агротехнологии", color: "#3b82f6" },
  eco: { label: "Экология", color: "#14b8a6" },
  soil: { label: "Почвоведение", color: "#6b7280" },
} as const;

export const ResearchFieldsDistributionWidget: React.FC = () => {
  return (
    <Card className="bg-gradient-to-b from-white to-emerald-50/40">
      <CardHeader>
        <CardTitle>Направления исследований</CardTitle>
        <CardDescription>
          Доля публикаций и проектов по основным научным направлениям, %.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] items-center gap-8">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[260px] flex items-center justify-center"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                strokeWidth={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="space-y-3 w-full">
            {data.map((d) => (
              <div
                key={d.name}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 w-full"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: d.fill }}
                  />
                  <span className="text-sm text-foreground">{d.name}</span>
                </div>
                <Progress
                  value={d.value}
                  className="h-2 bg-muted"
                  progressStyles="!bg-current"
                  style={{ color: d.fill }}
                />
                <span className="text-sm font-medium tabular-nums">
                  {d.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchFieldsDistributionWidget;
