import { SectorGrowthCard } from "../components/SectorGrowthCard";

const mockdata = [
  {
    name: "Растениеводство",
    value: "28.5 млрд ₸",
    growth: "15.2%",
    potential: "85%",
    progress: 85,
  },
  {
    name: "Животноводство",
    value: "22.3 млрд ₸",
    growth: "12.8%",
    potential: "78%",
    progress: 78,
  },
  {
    name: "Переработка",
    value: "18.7 млрд ₸",
    growth: "18.9%",
    potential: "92%",
    progress: 92,
  },
  {
    name: "Логистика",
    value: "12.4 млрд ₸",
    growth: "25.3%",
    potential: "88%",
    progress: 88,
  },
  {
    name: "Технологии",
    value: "8.9 млрд ₸",
    growth: "35.7%",
    potential: "95%",
    progress: 95,
  },
];
export const SectorAnalyticsView = () => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold">Секторальная аналитика</h2>
      <section className="space-y-4 w-full">
        {mockdata.map((item) => (
          <SectorGrowthCard key={item.name} {...item} />
        ))}
      </section>
    </section>
  );
};
