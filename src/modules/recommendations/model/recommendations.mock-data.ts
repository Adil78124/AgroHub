import type {
  AnimalAnalysis,
  EfficiencyData,
  GrowthForecastPoint,
  KeyStat,
  Recommendation,
  RecommendationsData,
  SoilAnalysis,
} from "../schemas/recommendation.schema";

/**
 * Моковые данные для ключевых показателей
 */
export const mockKeyStats: KeyStat[] = [
  {
    title: "Всего животных",
    value: "248 500",
    badge: "+2,5%",
  },
  {
    title: "Привитые животные",
    value: "98%",
    badge: "+3,4%",
  },
  {
    title: "Экспорт продукции",
    value: "56 000 т",
    badge: "+5,2%",
  },
  {
    title: "Посевные площади",
    value: "215 тыс. га",
    badge: "+1,7%",
  },
];

/**
 * Моковые данные для анализа почвы
 */
export const mockSoilAnalysis: SoilAnalysis = {
  metrics: [
    { name: "pH почвы", value: 6.2, note: "Норма: 6-7.5", status: "ok" },
    { name: "Азот (мг/кг)", value: 18, note: "Норма: 20-40", status: "warn" },
    { name: "Фосфор (мг/кг)", value: 12, note: "Норма: 15-30", status: "warn" },
    { name: "Калий (мг/кг)", value: 140, note: "Норма: 100-200", status: "ok" },
    {
      name: "Органические вещества (%)",
      value: 2.8,
      note: "Норма: 2.5-4",
      status: "ok",
    },
    { name: "Влажность (%)", value: 18, note: "Норма: 15-25", status: "ok" },
  ],
  radarData: [
    { metric: "pH почвы", value: 85, min: 60, max: 95 },
    { metric: "Азот", value: 60, min: 55, max: 85 },
    { metric: "Фосфор", value: 55, min: 50, max: 80 },
    { metric: "Калий", value: 75, min: 60, max: 95 },
    { metric: "Орг. вещества", value: 80, min: 65, max: 95 },
    { metric: "Влажность", value: 78, min: 65, max: 90 },
  ],
};

/**
 * Моковые данные для анализа состояния животных
 */
export const mockAnimalAnalysis: AnimalAnalysis = {
  metrics: [
    {
      name: "Индекс здоровья",
      value: "88%",
      note: "Норма: 85-100%",
      status: "ok",
    },
    {
      name: "Индекс продуктивности",
      value: "82%",
      note: "Норма: 80-100%",
      status: "ok",
    },
    {
      name: "Качество кормов",
      value: "72%",
      note: "Норма: 75-100%",
      status: "warn",
    },
    {
      name: "Охват вакцинаций (%)",
      value: "98%",
      note: "Норма: 95-100%",
      status: "good",
    },
    {
      name: "Качество молока",
      value: "89%",
      note: "Норма: 85-100%",
      status: "ok",
    },
    {
      name: "Репродуктивное здоровье",
      value: "85%",
      note: "Норма: 80-100%",
      status: "ok",
    },
  ],
  radarData: [
    { metric: "Здоровье", value: 88, min: 85, max: 100 },
    { metric: "Продуктивность", value: 82, min: 80, max: 100 },
    { metric: "Качество кормов", value: 72, min: 75, max: 100 },
    { metric: "Качество молока", value: 89, min: 85, max: 100 },
    { metric: "Репродукция", value: 85, min: 80, max: 100 },
    { metric: "Вакцинация", value: 98, min: 95, max: 100 },
  ],
};

/**
 * Моковые данные для рекомендаций
 */
export const mockRecommendations: Recommendation[] = [
  {
    id: "r1",
    category: "Почвы и удобрения",
    title: "Проблема: Низкий уровень фосфора",
    description:
      "Внести фосфорные удобрения (суперфосфат) в дозе 40–50 кг/га весной",
    deadline: "Срок: 2–3 недели",
    result: "Результат: +15% урожайности зерновых",
    priority: "low",
  },
  {
    id: "r2",
    category: "Животноводство",
    title: "Проблема: Низкое качество кормов",
    description:
      "Включить в рацион премиксы с витаминами A, D, E и микроэлементами",
    deadline: "Срок: 1–2 месяца",
    result: "Результат: +8% молочной продуктивности",
    priority: "medium",
  },
  {
    id: "r3",
    category: "Эффективность продаж",
    title: "Проблема: Неоптимальные каналы сбыта",
    description:
      "Заключить прямые договоры с переработчиками, минуя посредников",
    deadline: "Срок: 1 месяц",
    result: "Результат: +12% от цены реализации",
    priority: "high",
  },
  {
    id: "r4",
    category: "Технологии",
    title: "Проблема: Устаревшее оборудование",
    description:
      "Модернизировать доильную установку для повышения производительности",
    deadline: "Срок: 3–6 месяцев",
    result: "Результат: +20% производительности труда",
    priority: "medium",
  },
];

/**
 * Моковые данные для эффективности реализации продукции
 */
export const mockEfficiencyData: Record<string, EfficiencyData> = {
  currentEfficiency: {
    title: "Текущая эффективность",
    value: "84.5%",
    comment: "Хороший результат",
    status: "good",
  },
  regionalIndicator: {
    title: "Региональная показатель",
    value: "87%",
    comment: "Ниже среднего",
    status: "warning",
  },
  growthPotential: {
    title: "Потенциал роста",
    value: "+17.5%",
    comment: "При соблюдении рекомендаций",
    status: "info",
  },
};

/**
 * Моковые данные для прогноза роста
 */
export const mockGrowthForecast: GrowthForecastPoint[] = [
  { month: "Янв", actual: 82, projected: 82 },
  { month: "Фев", actual: 83, projected: 85 },
  { month: "Мар", actual: 83.5, projected: 87 },
  { month: "Апр", actual: 84, projected: 90 },
  { month: "Май", actual: 84.2, projected: 91.5 },
  { month: "Июн", actual: 84.5, projected: 94 },
  { month: "Июл", actual: 84.7, projected: 96 },
  { month: "Авг", actual: 85, projected: 97 },
  { month: "Сен", actual: 85.2, projected: 98.2 },
  { month: "Окт", actual: 85.5, projected: 99.5 },
  { month: "Ноя", actual: 85.7, projected: 100.5 },
  { month: "Дек", actual: 86, projected: 102 },
];

/**
 * Полные моковые данные для модуля рекомендаций
 */
export const mockRecommendationsData: RecommendationsData = {
  keyStats: mockKeyStats,
  soilAnalysis: mockSoilAnalysis,
  animalAnalysis: mockAnimalAnalysis,
  recommendations: mockRecommendations,
  efficiencyData: mockEfficiencyData,
  growthForecast: mockGrowthForecast,
};
