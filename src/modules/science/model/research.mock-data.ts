import type { Research } from "../schemas/research.schema";

export const researchListMock: Research[] = [
  {
    id: "1",
    category: "Растениеводство",
    isPremium: true,
    title: "Анализ урожайности Абайской области 2024",
    description:
      "Комплексное исследование урожайности основных сельскохозяйственных культур с прогнозом на 2025 год.",
    price: 15000,
    pages: 45,
    publishedAt: "15.12.2024",
    requiresPurchases: true,
  },
  {
    id: "2",
    category: "Животноводство",
    isPremium: true,
    title: "Тенденции развития животноводства",
    description:
      "Детальный анализ развития животноводческого сектора, включая молочное и мясное направления.",
    price: 12000,
    pages: 38,
    publishedAt: "28.11.2024",
    requiresPurchases: true,
  },
  {
    id: "3",
    category: "Маркетинг",
    isPremium: true,
    title: "Прогноз цен на сельхозпродукцию 2025",
    description:
      "Экспертный прогноз ценовой конъюнктуры на основные виды сельскохозяйственной продукции.",
    price: 18000,
    pages: 52,
    publishedAt: "01.12.2024",
    requiresPurchases: true,
  },
  {
    id: "4",
    category: "Аналитика",
    isPremium: false,
    title: "Бенчмарки эффективности хозяйств",
    description:
      "Сравнительный анализ эффективности работы сельскохозяйственных предприятий различных типов.",
    price: 10000,
    pages: 29,
    publishedAt: "15.11.2024",
    requiresPurchases: true,
  },
];
