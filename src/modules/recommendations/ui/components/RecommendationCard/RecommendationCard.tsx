"use client";

import React from "react";

import { Badge, Button, Card } from "@/shared/components/ui";

import { PRIORITY_MAP } from "../../../constants/recommendation.constants";
import type { Recommendation } from "../../../schemas/recommendation.schema";

/**
 * Пропсы для компонента RecommendationCard
 */
export interface RecommendationCardProps {
  /** Рекомендация для отображения */
  recommendation: Recommendation;
  /** Дополнительные CSS классы */
  className?: string;
  /** Обработчик клика по кнопке "Подробный план" */
  onViewDetails?: (recommendation: Recommendation) => void;
}

/**
 * Компонент карточки рекомендации
 *
 * @param props - Пропсы компонента
 * @param props.recommendation - Объект с рекомендацией
 * @param props.className - Дополнительные CSS классы
 * @param props.onViewDetails - Обработчик клика по кнопке "Подробный план"
 *
 * @returns JSX элемент карточки рекомендации
 * @example
 * ```typescript
 * <RecommendationCard
 *   recommendation={{
 *     id: "r1",
 *     category: "Почвы и удобрения",
 *     title: "Проблема: Низкий уровень фосфора",
 *     description: "Внести фосфорные удобрения...",
 *     deadline: "Срок: 2–3 недели",
 *     result: "Результат: +15% урожайности",
 *     priority: "low"
 *   }}
 *   onViewDetails={(rec) => console.log(rec)}
 * />
 * ```
 */
export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  className,
  onViewDetails,
}) => {
  const priorityConfig = PRIORITY_MAP[recommendation.priority];

  const handleViewDetails = () => {
    onViewDetails?.(recommendation);
  };

  return (
    <Card className={`p-4 flex flex-col gap-3 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {recommendation.category}
        </p>
        <Badge className={priorityConfig.className}>
          {priorityConfig.label}
        </Badge>
      </div>
      <h3 className="text-base font-semibold text-red-600">
        {recommendation.title}
      </h3>
      <p className="text-sm text-foreground/80">{recommendation.description}</p>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{recommendation.deadline}</span>
        <span className="text-green-600">{recommendation.result}</span>
      </div>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          className="gap-2"
          onClick={handleViewDetails}
        >
          Подробный план
        </Button>
      </div>
    </Card>
  );
};
