import { Calculator } from "lucide-react";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

export const ROICalculator = () => {
  return (
    <section className="space-y-5">
      <h2 className="flex items-center gap-2">
        <Calculator />
        <span>ROI Калькулятор</span>
      </h2>
      <section className="flex justify-between">
        <form className="space-y-3 w-1/2">
          <div className="space-y-2">
            <Label>Сумма инвестиций (тенге)</Label>
            <Input />
          </div>
          <div className="space-y-2">
            <Label>Период инвестиций (лет)</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 год</SelectItem>
                <SelectItem value="3">3 года</SelectItem>
                <SelectItem value="5">5 года</SelectItem>
                <SelectItem value="10">10 года</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Сектор</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите сектор" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agriculture">Растениеводство</SelectItem>
                <SelectItem value="livestock">Животноводство</SelectItem>
                <SelectItem value="processing">Переработка</SelectItem>
                <SelectItem value="logistics">Логистика</SelectItem>
                <SelectItem value="technology">Технологии</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Риск-толерантность</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите риск-толерантность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Низкий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="high">Высокий</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Рассчитать</Button>
        </form>
        <section>
          <h3 className="text-xl font-semibold">Результаты рассчета</h3>
          <section className="flex flex-col justify-center min-h-52 items-center gap-2">
            <Calculator size={48} className="text-gray-400" />
            <span className="text-gray-400">
              Введите парамертры и нажмите &quot;Рассчитать&quot;
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};
