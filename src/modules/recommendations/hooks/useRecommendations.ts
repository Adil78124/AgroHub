import { useMemo } from "react";

import { mockRecommendationsData } from "../model/recommendations.mock-data";
import type { RecommendationsData } from "../schemas/recommendation.schema";

/**
 * Хук для получения данных рекомендаций
 *
 * @returns Объект с данными рекомендаций и методами для работы с ними
 * @example
 * ```typescript
 * const { data, isLoading, error } = useRecommendations();
 * ```
 */
export const useRecommendations = () => {
  // В будущем здесь будет загрузка данных с API
  const data: RecommendationsData = mockRecommendationsData;
  const isLoading = false;
  const error = null;

  /**
   * Получить рекомендации по приоритету
   */
  const getRecommendationsByPriority = useMemo(() => {
    return (priority: "high" | "medium" | "low") => {
      return data.recommendations.filter((rec) => rec.priority === priority);
    };
  }, [data.recommendations]);

  /**
   * Получить рекомендации по категории
   */
  const getRecommendationsByCategory = useMemo(() => {
    return (category: string) => {
      return data.recommendations.filter((rec) => rec.category === category);
    };
  }, [data.recommendations]);

  /**
   * Получить статистику по рекомендациям
   */
  const getRecommendationsStats = useMemo(() => {
    const stats = {
      total: data.recommendations.length,
      high: data.recommendations.filter((rec) => rec.priority === "high")
        .length,
      medium: data.recommendations.filter((rec) => rec.priority === "medium")
        .length,
      low: data.recommendations.filter((rec) => rec.priority === "low").length,
    };
    return stats;
  }, [data.recommendations]);

  /**
   * Получить текущую эффективность
   */
  const getCurrentEfficiency = useMemo(() => {
    return data.efficiencyData.currentEfficiency;
  }, [data.efficiencyData]);

  /**
   * Получить прогноз роста
   */
  const getGrowthForecast = useMemo(() => {
    return data.growthForecast;
  }, [data.growthForecast]);

  return {
    data,
    isLoading,
    error,
    getRecommendationsByPriority,
    getRecommendationsByCategory,
    getRecommendationsStats,
    getCurrentEfficiency,
    getGrowthForecast,
  };
};
