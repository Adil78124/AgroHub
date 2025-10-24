import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect,it } from "vitest";

import { ResearchStatsView } from "../research-stats-view-widget";

describe("Виджет статистики науки", () => {
  it("рендерит ключевые метрики", () => {
    render(<ResearchStatsView />);
    expect(screen.getByText("Публикации (год)")).toBeInTheDocument();
    expect(screen.getByText("Активные проекты")).toBeInTheDocument();
    expect(screen.getByText("Доля open-access")).toBeInTheDocument();
    expect(screen.getByText("Межвуз. коллаборации")).toBeInTheDocument();
  });
});
