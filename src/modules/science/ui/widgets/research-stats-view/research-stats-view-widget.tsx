"use client";

import { BookOpen, FlaskConical, Unlock, Users } from "lucide-react";
import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

type Stat = {
  title: string;
  value: string;
  tooltip?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const stats: Stat[] = [
  {
    title: "Публикации (год)",
    value: "312",
    tooltip: "+8% к прошлому году",
    icon: BookOpen,
    color: "#10b981",
  },
  {
    title: "Активные проекты",
    value: "57",
    tooltip: "грантовые и инициативные",
    icon: FlaskConical,
    color: "#0ea5e9",
  },
  {
    title: "Доля open-access",
    value: "62%",
    tooltip: "из публикаций за год",
    icon: Unlock,
    color: "#6366f1",
  },
  {
    title: "Межвуз. коллаборации",
    value: "34%",
    tooltip: "публикаций с внешними соавторами",
    icon: Users,
    color: "#f59e0b",
  },
];

export const ResearchStatsView: React.FC = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => (
        <Card key={item.title} className="h-full">
          <div
            className="h-1 w-full rounded-t-xl"
            style={{ backgroundColor: item.color }}
          />
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              {item.title}
            </CardTitle>
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-md"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon className="w-4 h-4" />
            </span>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-semibold tracking-tight">
              {item.value}
            </div>
            {item.tooltip ? (
              <div className="text-xs text-muted-foreground mt-1">
                {item.tooltip}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default ResearchStatsView;
