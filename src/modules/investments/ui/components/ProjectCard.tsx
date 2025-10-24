import { CheckCircle } from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

interface ProjectCardProps {
  risk: "low" | "medium" | "high";
  sector: string;
  name: string;
  description: string;
  investment: string;
  roi: string;
  time: string;
  advantages: string[];
  status: "search" | "partial" | "ready";
}
export const ProjectCard = ({
  risk,
  sector,
  name,
  description,
  investment,
  roi,
  time,
  advantages,
  status,
}: ProjectCardProps) => {
  return (
    <section className="space-y-5 border rounded-md p-4">
      <div className="flex justify-between items-center">
        <Badge variant={"outline"}>{sector}</Badge>
        <Badge
          variant={
            risk === "low" ? "low" : risk === "medium" ? "warn" : "destructive"
          }
        >
          {{ low: "Низкий", medium: "Средний", high: "Высокий" }[risk]}
        </Badge>
      </div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Требуемые инвестиции</span>
          <p className="text-lg font-semibold">{investment}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Ожидаемый ROI</span>
          <p className="text-green-500 text-lg font-semibold">{roi}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Ожидаемый срок окупаемости
          </span>
          <p className="text-lg font-semibold">{time}</p>
        </div>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-2">Ключевые преимущества:</h4>
        <ul>
          {advantages.map((advantage) => (
            <li key={advantage} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />{" "}
              <span className="text-sm">{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <span>Cтатус:</span>
        <Badge variant={"outline"}>
          {status === "search"
            ? "Ищем инвестора"
            : status === "partial"
            ? "Частичное финансирование"
            : "Готов к выпуску"}
        </Badge>
      </div>
      <div className="flex gap-5">
        <Button className="flex-1">Подробнее</Button>
        <Button variant={"outline"}>Связаться</Button>
      </div>
    </section>
  );
};
