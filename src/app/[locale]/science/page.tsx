import React from "react";

import { KeyStatsWidget } from "@/modules/recommendations";
import {
  PublicationsTrendWidget,
  ResearchCatalogWidget,
  ResearchFieldsDistributionWidget,
} from "@/modules/science/ui/widgets";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto mt-20 flex flex-col gap-16">
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
      <KeyStatsWidget />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PublicationsTrendWidget />
        <ResearchFieldsDistributionWidget />
      </section>
      <ResearchCatalogWidget />
    </main>
  );
}
