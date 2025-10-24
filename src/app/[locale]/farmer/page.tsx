import {
  ArrowRight,
  DollarSign,
  FileText,
  Heart,
  PawPrint,
  TestTube,
  TrendingUp,
  Truck,
  Wheat,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";

export default function FarmerPage() {
  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 min-h-[60vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#6D758F] mb-4 sm:mb-6 leading-tight">
              Индивидуальные рекомендации для вашего хозяйства
            </h1>

            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
              Мы знаем, что каждое хозяйство уникально, и универсальные советы
              редко приносят желаемый результат. Поэтому мы предлагаем
              индивидуальный подход:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto px-6 py-3 rounded-md text-white hover:opacity-90 transition"
                style={{ backgroundColor: "#486284" }}
              >
                Заказать рекомендацию
              </Button>
              <Link href="/recomendation">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 py-3 rounded-md border border-[#486284] text-[#486284] hover:bg-gray-100 transition"
                >
                  Показать пример рекомендации
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-56 sm:h-72 lg:h-[420px]">
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
                <Wheat className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6D758F] mb-3 sm:mb-4">
              Наш подход
            </h2>
            <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12">
              Комплексный анализ вашего хозяйства для максимальной эффективности
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Truck,
                title: "Выезд специалистов",
                description:
                  "Наши специалисты выезжают прямо на ваше хозяйство",
              },
              {
                icon: TestTube,
                title: "Анализ почвы и воды",
                description: "Берём анализы почвы, воды и кормов",
              },
              {
                icon: Heart,
                title: "Исследование животных",
                description:
                  "Проводим исследования животных и условий их содержания",
              },
              {
                icon: FileText,
                title: "Практичные рекомендации",
                description:
                  "На основе данных разрабатываем понятные и практичные рекомендации",
              },
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#486284] to-[#6D758F] rounded-lg flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6D758F] mb-3 sm:mb-4">
              Что вы получаете
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              Конкретные результаты для вашего хозяйства
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Повышение урожайности",
                description:
                  "Более высокий урожай и улучшенное качество продукции",
                icon: Wheat,
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "Здоровые животные",
                description: "Здоровых и продуктивных животных",
                icon: PawPrint,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Экономия ресурсов",
                description:
                  "Экономию на кормах и удобрениях за счёт их оптимального использования",
                icon: DollarSign,
                color: "from-yellow-500 to-orange-500",
              },
              {
                title: "Рентабельность",
                description: "Повышение рентабельности хозяйства",
                icon: TrendingUp,
                color: "from-purple-500 to-violet-500",
              },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#486284] to-[#6D758F] rounded-lg flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Мы не просто анализируем — мы даём конкретные шаги, которые
                помогут вашему хозяйству расти и развиваться.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6D758F] mb-6">
            Готовы начать?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Получите индивидуальные рекомендации для вашего хозяйства уже
            сегодня
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 rounded-md text-white hover:opacity-90 transition"
              style={{ backgroundColor: "#486284" }}
            >
              Заказать рекомендацию
            </Button>

            <Link href="/recomendation">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-3 rounded-md border border-[#486284] text-[#486284] hover:bg-gray-100 transition"
              >
                Показать пример рекомендации
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
