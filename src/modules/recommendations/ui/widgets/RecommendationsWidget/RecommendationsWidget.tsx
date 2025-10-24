import { AlertTriangle, Lightbulb, Siren } from "lucide-react";
import React from "react";

import { useRecommendations } from "../../../hooks/useRecommendations";
import type { Recommendation } from "../../../schemas/recommendation.schema";
import { RecommendationCard } from "../../components/RecommendationCard/RecommendationCard";

/**
 * Пропсы для компонента RecommendationsWidget
 */
export interface RecommendationsWidgetProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Обработчик клика по кнопке "Подробный план" */
  onViewDetails?: (recommendation: Recommendation) => void;
}

/**
 * Виджет для отображения рекомендаций
 *
 * @param props - Пропсы компонента
 * @param props.className - Дополнительные CSS классы
 * @param props.onViewDetails - Обработчик клика по кнопке "Подробный план"
 * @returns JSX элемент виджета рекомендаций
 * @example
 * ```typescript
 * <RecommendationsWidget
 *   onViewDetails={(rec) => console.log('View details:', rec)}
 * />
 * ```
 */
export const RecommendationsWidget: React.FC<RecommendationsWidgetProps> = ({
  className,
  onViewDetails,
}) => {
  const { data } = useRecommendations();

  // Группируем рекомендации по приоритету
  const groupedRecommendations = data.recommendations.reduce((acc, rec) => {
    if (!acc[rec.priority]) {
      acc[rec.priority] = [];
    }
    acc[rec.priority].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  // Порядок приоритетов для отображения
  const priorityOrder = ["high", "medium", "low"];

  return (
    <section className={`space-y-8 ${className || ""}`}>
      {/* Заголовок секции */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-900 to-red-600 bg-clip-text text-transparent">
          Рекомендации для улучшения эффективности
        </h2>
        <p className="text-gray-600 text-lg">
          Персонализированные рекомендации на основе анализа вашего хозяйства
        </p>
      </div>

      {/* Статистика рекомендаций */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {groupedRecommendations.high?.length || 0}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">
                Высокий приоритет
              </p>
              <p className="text-xs text-red-600">
                Требуют немедленного внимания
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {groupedRecommendations.medium?.length || 0}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-700">
                Средний приоритет
              </p>
              <p className="text-xs text-yellow-600">
                Планируйте в ближайшее время
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {groupedRecommendations.low?.length || 0}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Низкий приоритет
              </p>
              <p className="text-xs text-gray-600">Долгосрочные улучшения</p>
            </div>
          </div>
        </div>
      </div>

      {/* Рекомендации по приоритетам */}
      <div className="space-y-6">
        {priorityOrder.map((priority, priorityIndex) => {
          const recommendations = groupedRecommendations[priority];
          if (!recommendations || recommendations.length === 0) return null;

          const priorityLabels = {
            high: {
              label: "Высокий приоритет",
              icon: <Siren className="w-5 h-5 text-white" />,
              color: "red",
            },
            medium: {
              label: "Средний приоритет",
              icon: <AlertTriangle className="w-5 h-5 text-white" />,
              color: "yellow",
            },
            low: {
              label: "Низкий приоритет",
              icon: <Lightbulb className="w-5 h-5 text-white" />,
              color: "gray",
            },
          } as const;

          const config =
            priorityLabels[priority as keyof typeof priorityLabels];

          return (
            <div
              key={priority}
              className="animate-in fade-in-0 slide-in-from-bottom-4"
              style={{
                animationDelay: `${priorityIndex * 200}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Заголовок группы */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-10 h-10 bg-${config.color}-500 rounded-xl flex items-center justify-center`}
                >
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {config.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {recommendations.length} рекомендаций
                  </p>
                </div>
              </div>

              {/* Карточки рекомендаций */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recommendations.map((recommendation, index) => (
                  <div
                    key={recommendation.id}
                    className="animate-in fade-in-0 slide-in-from-left-2"
                    style={{
                      animationDelay: `${priorityIndex * 200 + index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <RecommendationCard
                      recommendation={recommendation}
                      onViewDetails={onViewDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Дополнительная информация */}
      <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Как использовать рекомендации
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Начните с рекомендаций высокого приоритета для максимального
              эффекта. Каждая рекомендация содержит подробный план действий,
              сроки выполнения и ожидаемые результаты. Регулярно отслеживайте
              прогресс для достижения поставленных целей.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
