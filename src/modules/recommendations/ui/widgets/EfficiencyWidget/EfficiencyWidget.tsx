import React from "react";

import { useRecommendations } from "../../../hooks/useRecommendations";
import { EfficiencyCard } from "../../components/EfficiencyCard/EfficiencyCard";

/**
 * Пропсы для компонента EfficiencyWidget
 */
export interface EfficiencyWidgetProps {
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Виджет для отображения эффективности реализации продукции
 *
 * @param props - Пропсы компонента
 * @param props.className - Дополнительные CSS классы
 * @returns JSX элемент виджета эффективности
 * @example
 * ```typescript
 * <EfficiencyWidget />
 * ```
 */
export const EfficiencyWidget: React.FC<EfficiencyWidgetProps> = ({
  className,
}) => {
  const { data } = useRecommendations();

  return (
    <section className={`space-y-8 ${className || ""}`}>
      {/* Заголовок секции */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-900 to-indigo-600 bg-clip-text text-transparent">
          Эффективность реализации продукции
        </h2>
        <p className="text-gray-600 text-lg">
          Анализ показателей эффективности и потенциала роста
        </p>
      </div>

      {/* Адаптивная сетка карточек эффективности */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data.efficiencyData).map(
          ([key, efficiencyData], index) => (
            <div
              key={key}
              className="animate-in fade-in-0 slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              <EfficiencyCard efficiencyData={efficiencyData} />
            </div>
          )
        )}
      </div>

      {/* Дополнительная аналитическая информация */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
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
              Аналитическая сводка
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Показатели эффективности рассчитываются на основе текущих данных о
              производстве, продажах и рыночных условиях. Рекомендуется
              регулярно отслеживать изменения для оптимизации бизнес-процессов.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
