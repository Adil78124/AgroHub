import React from "react";

import { useRecommendations } from "../../../hooks/useRecommendations";
import { KeyStatsCard } from "../../components/KeyStatsCard/KeyStatsCard";

/**
 * Пропсы для компонента KeyStatsWidget
 */
export interface KeyStatsWidgetProps {
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Виджет для отображения ключевых показателей
 *
 * @param props - Пропсы компонента
 * @param props.className - Дополнительные CSS классы
 * @returns JSX элемент виджета ключевых показателей
 * @example
 * ```typescript
 * <KeyStatsWidget />
 * ```
 */
export const KeyStatsWidget: React.FC<KeyStatsWidgetProps> = ({
  className,
}) => {
  const { data } = useRecommendations();

  return (
    <section className={`space-y-8 ${className || ""}`}>
      {/* Заголовок секции */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Ключевые показатели
        </h2>
        <p className="text-gray-600 text-lg">
          Основные метрики эффективности вашего хозяйства
        </p>
      </div>

      {/* Адаптивная сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {data.keyStats.map((stat, index) => (
          <div
            key={stat.title}
            className="animate-in fade-in-0 slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <KeyStatsCard stat={stat} />
          </div>
        ))}
      </div>

      {/* Дополнительная информация */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-700 font-medium">
            Данные обновляются в реальном времени
          </p>
        </div>
      </div>
    </section>
  );
};
