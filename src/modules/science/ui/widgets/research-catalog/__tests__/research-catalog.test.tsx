import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from 'vitest';

import { ResearchCatalogWidget } from "../research-catalog-widget";

describe("Аналитические исследования — виджет", () => {
  it("рендерит заголовок и карточки", () => {
    render(<ResearchCatalogWidget />);
    expect(screen.getByText("Аналитические исследования")).toBeInTheDocument();
    expect(
      screen.getByText("Экспертные отчеты и прогнозы для принятия решений")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Анализ урожайности Абайской области 2024")
    ).toBeInTheDocument();
  });
});

