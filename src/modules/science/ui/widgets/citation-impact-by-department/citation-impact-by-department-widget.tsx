"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

const data = [
  { department: "Агрономия", impact: 3.4 },
  { department: "Земледелие", impact: 2.7 },
  { department: "Ветеринария", impact: 2.2 },
  { department: "Биоинженерия", impact: 3.9 },
  { department: "Экология", impact: 2.1 },
];

const chartConfig = {
  impact: { label: "Индекс цитируемости", color: "hsl(var(--chart-2))" },
} as const;

export const CitationImpactByDepartmentWidget: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Цитируемость по кафедрам</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72">
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="department" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={30} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="impact" fill="var(--color-impact)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CitationImpactByDepartmentWidget;
