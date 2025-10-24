import clsx from "clsx";
import { AlertTriangle, BarChart3, CheckCircle2, Info } from "lucide-react";
import React from "react";

import type { EfficiencyData } from "../../../schemas/recommendation.schema";

/**
 * Пропсы для компонента EfficiencyCard
 */
export interface EfficiencyCardProps {
  /** Данные эффективности для отображения */
  efficiencyData: EfficiencyData;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Компонент карточки эффективности
 *
 * @param props - Пропсы компонента
 * @param props.efficiencyData - Объект с данными эффективности
 * @param props.className - Дополнительные CSS классы
 * @returns JSX элемент карточки эффективности
 * @example
 * ```typescript
 * <EfficiencyCard
 *   efficiencyData={{
 *     title: "Текущая эффективность",
 *     value: "84.5%",
 *     comment: "Хороший результат",
 *     status: "good"
 *   }}
 * />
 * ```
 */
export const EfficiencyCard = ({
  efficiencyData,
  className,
}: EfficiencyCardProps) => {
  // Нейтральная тема карточки, статус влияет только на маленькую точку-индикатор
  const theme = {
    border: "border-gray-200",
    bg: "bg-white",
    value: "text-gray-900",
    title: "text-gray-700",
    comment: "text-gray-600",
  } as const;

  // Централизованные стили по статусам
  type StatusKey = "good" | "warning" | "info" | "error";
  type StatusStyle = {
    bgBorder: string;
    icon: string;
    value: string;
    dot: string;
    label: string;
  };

  const statusStyles: Record<StatusKey | "default", StatusStyle> = {
    good: {
      bgBorder: "bg-emerald-50 border-emerald-200",
      icon: "text-emerald-600",
      value: "text-emerald-800",
      dot: "bg-emerald-500",
      label: "отлично",
    },
    warning: {
      bgBorder: "bg-amber-50 border-amber-200",
      icon: "text-amber-600",
      value: "text-amber-800",
      dot: "bg-amber-500",
      label: "внимание",
    },
    info: {
      bgBorder: "bg-blue-50 border-blue-200",
      icon: "text-blue-600",
      value: "text-blue-800",
      dot: "bg-blue-500",
      label: "инфо",
    },
    error: {
      bgBorder: "bg-red-50 border-red-200",
      icon: "text-red-600",
      value: "text-red-800",
      dot: "bg-red-500",
      label: "ошибка",
    },
    default: {
      bgBorder: "bg-gray-100 border-gray-200",
      icon: "text-gray-500",
      value: theme.value,
      dot: "bg-gray-400",
      label: "",
    },
  } as const;

  const getStatusStyles = (status: string): StatusStyle =>
    statusStyles[(status as StatusKey) || "default"] || statusStyles.default;

  // Выбор Lucide-иконки по статусу (цвет задается контейнером)
  const renderIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="w-4 h-4" strokeWidth={2} />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" strokeWidth={2} />;
      case "info":
        return <Info className="w-4 h-4" strokeWidth={2} />;
      case "error":
        return <AlertTriangle className="w-4 h-4" strokeWidth={2} />;
      default:
        return <BarChart3 className="w-4 h-4" strokeWidth={2} />;
    }
  };

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl border ${theme.border} 
        ${theme.bg} p-6 transition-all duration-200 
        hover:shadow-md hover:-translate-y-0.5 cursor-pointer h-full
        ${className || ""}
      `}
    >
      {/* Пиктограмма Lucide с мягким фоном и статусным цветом */}
      <div className="mb-4">
        <div
          className={clsx(
            "w-8 h-8 rounded-md border flex items-center justify-center",
            getStatusStyles(efficiencyData.status).bgBorder
          )}
        >
          <div className={getStatusStyles(efficiencyData.status).icon}>
            {renderIcon(efficiencyData.status)}
          </div>
        </div>
      </div>

      {/* Заголовок */}
      <h3 className={`text-lg font-semibold ${theme.title} mb-3 leading-tight`}>
        {efficiencyData.title}
      </h3>

      {/* Основное значение */}
      <div className="mb-4">
        <p
          className={clsx(
            "text-4xl font-bold",
            getStatusStyles(efficiencyData.status).value
          )}
        >
          {efficiencyData.value}
        </p>
      </div>

      {/* Комментарий с бейджем */}
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${theme.comment}`}>
            {efficiencyData.comment}
          </p>

          {/* Статус индикатор */}
          <div className="flex items-center space-x-1">
            <div
              className={clsx(
                "w-2 h-2 rounded-full",
                getStatusStyles(efficiencyData.status).dot
              )}
            />
            <span className="text-xs text-gray-500 font-medium">
              {getStatusStyles(efficiencyData.status).label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
