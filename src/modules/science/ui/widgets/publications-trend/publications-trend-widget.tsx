"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Line } from "recharts";

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

const data = [
  { month: "Янв", publications: 18 },
  { month: "Фев", publications: 22 },
  { month: "Мар", publications: 24 },
  { month: "Апр", publications: 28 },
  { month: "Май", publications: 30 },
  { month: "Июн", publications: 27 },
  { month: "Июл", publications: 25 },
  { month: "Авг", publications: 29 },
  { month: "Сен", publications: 35 },
  { month: "Окт", publications: 38 },
  { month: "Ноя", publications: 40 },
  { month: "Дек", publications: 45 },
];

const PRIMARY_COLOR = "#6366f1"; // indigo-500

const chartConfig = {
  publications: {
    label: "Публикации",
    color: PRIMARY_COLOR,
  },
} as const;

export const PublicationsTrendWidget: React.FC = () => {
  return (
    <Card className="bg-gradient-to-b from-white to-sky-50/40">
      <CardHeader>
        <CardTitle>Динамика публикаций (12 мес.)</CardTitle>
        <CardDescription>
          Количество научных публикаций по месяцам за последний год.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-72 max-w-[760px] mx-auto"
        >
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              label={{
                value: "Публикации, шт.",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillPublications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.8} />
                <stop
                  offset="95%"
                  stopColor={PRIMARY_COLOR}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="publications"
              type="monotone"
              stroke={PRIMARY_COLOR}
              fill="url(#fillPublications)"
            />
            <Line
              dataKey="publications"
              type="monotone"
              stroke={PRIMARY_COLOR}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PublicationsTrendWidget;
