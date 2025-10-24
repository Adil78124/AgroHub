import type {
  CommentStatus,
  MetricStatus,
  Priority,
} from "../schemas/recommendation.schema";

/**
 * Маппинг статусов метрик на стили и лейблы
 */
export const METRIC_STATUS_MAP: Record<
  MetricStatus,
  { label: string; className: string; valueClass: string }
> = {
  // Норма — желтый
  ok: {
    label: "Норма",
    className:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/90 border-yellow-200",
    valueClass: "text-yellow-600",
  },
  // Требует внимания — красный
  warn: {
    label: "Требует внимания",
    className: "bg-red-100 text-red-800 hover:bg-red-100/90 border-red-200",
    valueClass: "text-red-600",
  },
  // Отлично — зеленый
  good: {
    label: "Отлично",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100/90 border-green-200",
    valueClass: "text-green-600",
  },
};

/**
 * Маппинг приоритетов рекомендаций на стили и лейблы
 */
export const PRIORITY_MAP: Record<
  Priority,
  { label: string; className: string }
> = {
  high: {
    label: "Высокий приоритет",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  medium: {
    label: "Средний приоритет",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  low: {
    label: "Пониженный анализ",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

/**
 * Маппинг статусов комментариев на CSS классы
 */
export const COMMENT_STATUS_CLASSES: Record<CommentStatus, string> = {
  good: "text-green-500",
  warning: "text-yellow-500",
  info: "text-gray-500",
  error: "text-red-500",
};

/**
 * Конфигурация для радарных диаграмм
 */
export const RADAR_CHART_CONFIG = {
  value: { label: "Значение", color: "hsl(221 83% 53%)" },
  min: { label: "Норма (мин)", color: "hsl(0 84% 60%)" },
  max: { label: "Норма (макс)", color: "hsl(142 76% 36%)" },
} as const;

/**
 * Конфигурация для линейных диаграмм прогноза роста
 */
export const GROWTH_CHART_CONFIG = {
  actual: {
    label: "Текущая эффективность",
    color: "hsl(221 83% 53%)",
  },
  projected: {
    label: "Прогнозируемая эффективность",
    color: "hsl(262 83% 57%)",
  },
} as const;
