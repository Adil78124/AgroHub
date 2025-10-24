import { RiskAnalysisCard } from "../components/RiskAnalysisCard";

const mock: {
  name: string;
  status: "low" | "medium" | "high";
  progress: number;
  note: string;
}[] = [
  {
    name: "Погодные условия",
    status: "high",
    progress: 90,
    note: "Страхование урожая",
  },
  {
    name: "Рыночная волатильность",
    status: "medium",
    progress: 60,
    note: "Диверсификация",
  },
  {
    name: "Валютные риски",
    status: "medium",
    progress: 65,
    note: "Хеджирование",
  },
  {
    name: "Регуляторные изменения",
    status: "low",
    progress: 20,
    note: "Мониторинг законов",
  },
  {
    name: "Технологические риски",
    status: "low",
    progress: 25,
    note: "Поэтапное внедрение",
  },
];
export const RiskAnalysisView = () => {
  return (
    <section>
      <h2 className="text-2xl mb-4 font-bold">Анализ рисков</h2>
      <section>
        {mock.map((item) => (
          <RiskAnalysisCard key={item.name} {...item} />
        ))}
      </section>
    </section>
  );
};
