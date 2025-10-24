import { StatsCard } from "../components/StatsCard";

const mock = [
  {
    title: "Общие инвестиции",
    value: "45.8 млрд ₸",
    tooltip: "+12,3% за год",
  },
  {
    title: "Количество проектов",
    value: "23",
    tooltip: "На стадии реализации",
  },
  {
    title: "Средний ROI",
    value: "18.5%",
    tooltip: "За последние 3 года",
  },
  {
    title: "Рабочие места",
    value: "3 420",
    tooltip: "Создано с 2020 года",
  },
];

export const StatsView = () => {
  return (
    <section className="flex gap-2 flex-wrap">
      {mock.map((stat) => (
        <StatsCard key={stat.title} stats={stat} />
      ))}
    </section>
  );
};
