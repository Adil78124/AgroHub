import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KeyStatsCard } from "../KeyStatsCard";

describe("KeyStatsCard", () => {
  const mockStat = {
    title: "Всего животных",
    value: "248 500",
    badge: "2,5%",
  };

  it("должен отображать заголовок статистики", () => {
    render(<KeyStatsCard stat={mockStat} />);

    expect(screen.getByText("Всего животных")).toBeInTheDocument();
  });

  it("должен отображать значение статистики", () => {
    render(<KeyStatsCard stat={mockStat} />);

    expect(screen.getByText("248 500")).toBeInTheDocument();
  });

  it("должен отображать бейдж статистики", () => {
    render(<KeyStatsCard stat={mockStat} />);

    expect(screen.getByText("2,5%")).toBeInTheDocument();
  });

  it("должен применять дополнительные CSS классы", () => {
    const { container } = render(
      <KeyStatsCard stat={mockStat} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
