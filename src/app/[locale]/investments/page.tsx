import {
  CropPriceStructureView,
  Projects,
  RegionAnalyticsView,
  RiskAnalysisView,
  ROICalculator,
  SectorAnalyticsView,
  StatsView,
  YieldForecastByRegionView,
} from "@/modules/investments/ui/widgets";

export default function InvestmentsPage() {
  return (
    <section className="max-w-7xl mx-auto mt-20 flex flex-col gap-16">
      <section className="text-center">
        <h1 className="text-2xl font-bold">Инвестиционные возможности</h1>
        <p className="text-gray-500">
          Откройте для себя прибыльные инвестиционные проекты в агропромышленном
          комплексе Абайской области
        </p>
      </section>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Важное уведомление
            </h3>
            <p className="text-yellow-700">
              Представленные ниже данные носят исключительно примерный и
              демонстрационный характер. Они служат для иллюстрации.
            </p>
          </div>
        </div>
      </div>
      <StatsView />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectorAnalyticsView />
        <RegionAnalyticsView />
      </section>
      <ROICalculator />
      <RiskAnalysisView />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <CropPriceStructureView />
        <YieldForecastByRegionView />
      </section>
      <Projects />
    </section>
  );
}
