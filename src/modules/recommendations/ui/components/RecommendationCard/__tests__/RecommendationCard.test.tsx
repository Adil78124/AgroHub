import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RecommendationCard } from "../RecommendationCard";

describe("RecommendationCard", () => {
  const mockRecommendation = {
    id: "r1",
    category: "Почвы и удобрения",
    title: "Проблема: Низкий уровень фосфора",
    description:
      "Внести фосфорные удобрения (суперфосфат) в дозе 40–50 кг/га весной",
    deadline: "Срок: 2–3 недели",
    result: "Результат: +15% урожайности зерновых",
    priority: "low" as const,
  };

  it("должен отображать категорию рекомендации", () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);

    expect(screen.getByText("Почвы и удобрения")).toBeInTheDocument();
  });

  it("должен отображать заголовок рекомендации", () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);

    expect(
      screen.getByText("Проблема: Низкий уровень фосфора")
    ).toBeInTheDocument();
  });

  it("должен отображать описание рекомендации", () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);

    expect(
      screen.getByText(
        "Внести фосфорные удобрения (суперфосфат) в дозе 40–50 кг/га весной"
      )
    ).toBeInTheDocument();
  });

  it("должен отображать срок выполнения", () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);

    expect(screen.getByText("Срок: 2–3 недели")).toBeInTheDocument();
  });

  it("должен отображать ожидаемый результат", () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);

    expect(
      screen.getByText("Результат: +15% урожайности зерновых")
    ).toBeInTheDocument();
  });

  it("должен отображать приоритет рекомендации", () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);

    expect(screen.getByText("Пониженный анализ")).toBeInTheDocument();
  });

  it("должен вызывать onViewDetails при клике на кнопку", async () => {
    const user = userEvent.setup();
    const mockOnViewDetails = vi.fn();

    render(
      <RecommendationCard
        recommendation={mockRecommendation}
        onViewDetails={mockOnViewDetails}
      />
    );

    const button = screen.getByText("Подробный план");
    await user.click(button);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockRecommendation);
  });

  it("должен применять дополнительные CSS классы", () => {
    const { container } = render(
      <RecommendationCard
        recommendation={mockRecommendation}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
