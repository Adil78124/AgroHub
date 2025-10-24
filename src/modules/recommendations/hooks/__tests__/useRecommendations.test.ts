import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useRecommendations } from "../useRecommendations";

describe("useRecommendations", () => {
  it("должен возвращать данные рекомендаций", () => {
    const { result } = renderHook(() => useRecommendations());

    expect(result.current.data).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("должен возвращать ключевые показатели", () => {
    const { result } = renderHook(() => useRecommendations());

    expect(result.current.data.keyStats).toHaveLength(4);
    expect(result.current.data.keyStats[0]).toHaveProperty("title");
    expect(result.current.data.keyStats[0]).toHaveProperty("value");
    expect(result.current.data.keyStats[0]).toHaveProperty("badge");
  });

  it("должен возвращать анализ почвы", () => {
    const { result } = renderHook(() => useRecommendations());

    expect(result.current.data.soilAnalysis).toBeDefined();
    expect(result.current.data.soilAnalysis.metrics).toHaveLength(6);
    expect(result.current.data.soilAnalysis.radarData).toHaveLength(6);
  });

  it("должен возвращать анализ животных", () => {
    const { result } = renderHook(() => useRecommendations());

    expect(result.current.data.animalAnalysis).toBeDefined();
    expect(result.current.data.animalAnalysis.metrics).toHaveLength(6);
    expect(result.current.data.animalAnalysis.radarData).toHaveLength(6);
  });

  it("должен возвращать рекомендации", () => {
    const { result } = renderHook(() => useRecommendations());

    expect(result.current.data.recommendations).toHaveLength(4);
    expect(result.current.data.recommendations[0]).toHaveProperty("id");
    expect(result.current.data.recommendations[0]).toHaveProperty("category");
    expect(result.current.data.recommendations[0]).toHaveProperty("title");
  });

  it("должен фильтровать рекомендации по приоритету", () => {
    const { result } = renderHook(() => useRecommendations());

    const highPriorityRecs =
      result.current.getRecommendationsByPriority("high");
    const mediumPriorityRecs =
      result.current.getRecommendationsByPriority("medium");
    const lowPriorityRecs = result.current.getRecommendationsByPriority("low");

    expect(highPriorityRecs).toHaveLength(1);
    expect(mediumPriorityRecs).toHaveLength(2);
    expect(lowPriorityRecs).toHaveLength(1);
  });

  it("должен фильтровать рекомендации по категории", () => {
    const { result } = renderHook(() => useRecommendations());

    const soilRecs =
      result.current.getRecommendationsByCategory("Почвы и удобрения");
    const animalRecs =
      result.current.getRecommendationsByCategory("Животноводство");

    expect(soilRecs).toHaveLength(1);
    expect(animalRecs).toHaveLength(1);
  });

  it("должен возвращать статистику рекомендаций", () => {
    const { result } = renderHook(() => useRecommendations());

    const stats = result.current.getRecommendationsStats;

    expect(stats.total).toBe(4);
    expect(stats.high).toBe(1);
    expect(stats.medium).toBe(2);
    expect(stats.low).toBe(1);
  });

  it("должен возвращать текущую эффективность", () => {
    const { result } = renderHook(() => useRecommendations());

    const efficiency = result.current.getCurrentEfficiency;

    expect(efficiency).toBeDefined();
    expect(efficiency.title).toBe("Текущая эффективность");
    expect(efficiency.value).toBe("84.5%");
  });

  it("должен возвращать прогноз роста", () => {
    const { result } = renderHook(() => useRecommendations());

    const forecast = result.current.getGrowthForecast;

    expect(forecast).toHaveLength(12);
    expect(forecast[0]).toHaveProperty("month");
    expect(forecast[0]).toHaveProperty("actual");
    expect(forecast[0]).toHaveProperty("projected");
  });
});
