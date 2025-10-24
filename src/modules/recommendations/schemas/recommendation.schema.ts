import { z } from "zod";

/**
 * Схема для статуса метрики
 */
export const MetricStatusSchema = z.enum(["ok", "warn", "good"]);

/**
 * Схема для приоритета рекомендации
 */
export const PrioritySchema = z.enum(["high", "medium", "low"]);

/**
 * Схема для статуса комментария
 */
export const CommentStatusSchema = z.enum(["good", "warning", "info", "error"]);

/**
 * Схема для ключевой статистики
 */
export const KeyStatSchema = z.object({
  title: z.string(),
  value: z.string(),
  badge: z.string(),
});

/**
 * Схема для метрики анализа
 */
export const MetricSchema = z.object({
  name: z.string(),
  value: z.union([z.string(), z.number()]),
  note: z.string().optional(),
  status: MetricStatusSchema,
});

/**
 * Схема для данных радарной диаграммы
 */
export const RadarDatumSchema = z.object({
  metric: z.string(),
  value: z.number(),
  min: z.number().optional(),
  max: z.number().optional(),
});

/**
 * Схема для рекомендации
 */
export const RecommendationSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
  result: z.string(),
  priority: PrioritySchema,
});

/**
 * Схема для данных эффективности
 */
export const EfficiencyDataSchema = z.object({
  title: z.string(),
  value: z.string(),
  comment: z.string(),
  status: CommentStatusSchema,
});

/**
 * Схема для точки данных прогноза роста
 */
export const GrowthForecastPointSchema = z.object({
  month: z.string(),
  actual: z.number(),
  projected: z.number(),
});

/**
 * Схема для данных анализа почвы
 */
export const SoilAnalysisSchema = z.object({
  metrics: z.array(MetricSchema),
  radarData: z.array(RadarDatumSchema),
});

/**
 * Схема для данных анализа животных
 */
export const AnimalAnalysisSchema = z.object({
  metrics: z.array(MetricSchema),
  radarData: z.array(RadarDatumSchema),
});

/**
 * Схема для полных данных рекомендаций
 */
export const RecommendationsDataSchema = z.object({
  keyStats: z.array(KeyStatSchema),
  soilAnalysis: SoilAnalysisSchema,
  animalAnalysis: AnimalAnalysisSchema,
  recommendations: z.array(RecommendationSchema),
  efficiencyData: z.record(z.string(), EfficiencyDataSchema),
  growthForecast: z.array(GrowthForecastPointSchema),
});

// Типы для экспорта
export type MetricStatus = z.infer<typeof MetricStatusSchema>;
export type Priority = z.infer<typeof PrioritySchema>;
export type CommentStatus = z.infer<typeof CommentStatusSchema>;
export type KeyStat = z.infer<typeof KeyStatSchema>;
export type Metric = z.infer<typeof MetricSchema>;
export type RadarDatum = z.infer<typeof RadarDatumSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type EfficiencyData = z.infer<typeof EfficiencyDataSchema>;
export type GrowthForecastPoint = z.infer<typeof GrowthForecastPointSchema>;
export type SoilAnalysis = z.infer<typeof SoilAnalysisSchema>;
export type AnimalAnalysis = z.infer<typeof AnimalAnalysisSchema>;
export type RecommendationsData = z.infer<typeof RecommendationsDataSchema>;
