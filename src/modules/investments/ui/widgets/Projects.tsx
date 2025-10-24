import { Button } from "@/shared/components/ui/button";

import { ProjectCard } from "../components/ProjectCard";

const mockProjectData: {
  risk: "low" | "medium" | "high";
  sector: string;
  name: string;
  description: string;
  investment: string;
  roi: string;
  advantages: string[];
  status: "search" | "partial" | "ready";
  time: string;
}[] = [
  {
    risk: "medium",
    sector: "Переработка",
    name: "Агротехнопарк «Абай»",
    description:
      "Современный комплекс переработки зерновых с использованием передовых технологий",
    investment: "8.5 млрд ₸",
    roi: "22.3%",
    time: "4.2 лет",
    advantages: [
      "Государственная поддержка",
      "Экспортный потенциал",
      "Создание 250 рабочих мест",
    ],
    status: "search",
  },
  {
    risk: "low",
    sector: "Животноводство",
    name: "Цифровая ферма будущего",
    description:
      "Высокотехнологичный животноводческий комплекс с автоматизированными системами",
    investment: "12.3 млрд ₸",
    roi: "19.8%",
    time: "5.1 лет",
    advantages: ["IoT мониторинг", "Органическая продукция", "Экологичность"],
    status: "partial",
  },
  {
    risk: "medium",
    sector: "Логистика",
    name: "Логистический хаб АПК",
    description:
      "Мультимодальный логистический центр для обслуживания сельхозпроизводителей региона",
    investment: "15.7 млрд ₸",
    roi: "25.6%",
    time: "3.8 лет",
    advantages: [
      "Стратегическое расположение",
      "Государственные гарантии",
      "Быстрая окупаемость",
    ],
    status: "ready",
  },
];
export const Projects = () => {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold ">Проекты</h2>
      <p className="text-gray-500 mb-4">
        Готовые к финансированию проекты с высоким потенциалом роста
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjectData.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col gap-4 items-center rounded-lg p-5">
        <h2 className="text-2xl font-bold">Готовы начать финансирование?</h2>
        <p className="text-lg ">
          Присоединяйтесь к успешным инвесторам, которые уже получают прибыль от
          проектов в Абайской области
        </p>
        <div>
          <Button variant={"secondary"}>Связаться с экспертом</Button>
        </div>
      </section>
    </section>
  );
};
