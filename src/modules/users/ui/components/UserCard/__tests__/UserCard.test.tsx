import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { User } from "../../../../schemas/user.schema";
import { UserCard } from "../UserCard";

describe("UserCard — карточка пользователя", () => {
  const ACTION_BUTTONS = ["Просмотр", "Редактировать", "Удалить"] as const;

  const mockUser: User = {
    id: 1,
    email: "test@example.com",
    name: "John Doe",
    avatar: "",
    role: "user",
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  };

  const mockAdminUser: User = {
    ...mockUser,
    id: 2,
    role: "admin",
  };

  const mockInactiveUser: User = {
    ...mockUser,
    id: 3,
    isActive: false,
  };

  it("корректно отображает информацию о пользователе", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Пользователь")).toBeInTheDocument();
    expect(screen.getByText("Активен")).toBeInTheDocument();
    expect(screen.getByText(/Зарегистрирован:/)).toBeInTheDocument();
  });

  it("отображает администратора с правильной меткой роли", () => {
    render(<UserCard user={mockAdminUser} />);

    expect(screen.getByText("Администратор")).toBeInTheDocument();
  });

  it("отображает неактивного пользователя со статусом", () => {
    render(<UserCard user={mockInactiveUser} />);

    expect(screen.getByText("Неактивен")).toBeInTheDocument();
  });

  it("показывает кнопки действий при showActions=true", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserCard
        user={mockUser}
        showActions
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    ACTION_BUTTONS.forEach((buttonText) => {
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
  });

  it("не показывает кнопки действий при showActions=false", () => {
    render(<UserCard user={mockUser} showActions={false} />);

    ACTION_BUTTONS.forEach((buttonText) => {
      expect(screen.queryByText(buttonText)).not.toBeInTheDocument();
    });
  });

  it("вызывает onView при клике по кнопке Просмотр", () => {
    const onView = vi.fn();

    render(<UserCard user={mockUser} onView={onView} />);

    fireEvent.click(screen.getByText(ACTION_BUTTONS[0]));
    expect(onView).toHaveBeenCalledWith(mockUser);
  });

  it("вызывает onEdit при клике по кнопке Редактировать", () => {
    const onEdit = vi.fn();

    render(<UserCard user={mockUser} onEdit={onEdit} />);

    fireEvent.click(screen.getByText(ACTION_BUTTONS[1]));
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });

  it("вызывает onDelete при клике по кнопке Удалить", () => {
    const onDelete = vi.fn();

    render(<UserCard user={mockUser} onDelete={onDelete} />);

    fireEvent.click(screen.getByText(ACTION_BUTTONS[2]));
    expect(onDelete).toHaveBeenCalledWith(mockUser);
  });

  it("отображает только доступные кнопки действий", () => {
    const onView = vi.fn();

    render(<UserCard user={mockUser} onView={onView} />);

    expect(screen.getByText(ACTION_BUTTONS[0])).toBeInTheDocument();
    expect(screen.queryByText(ACTION_BUTTONS[1])).not.toBeInTheDocument();
    expect(screen.queryByText(ACTION_BUTTONS[2])).not.toBeInTheDocument();
  });

  it("применяет переданный className", () => {
    render(<UserCard user={mockUser} className="custom-class" />);

    const cardElement = screen.getByText("John Doe").closest(".bg-white");
    expect(cardElement).toHaveClass("custom-class");
  });

  it("отображает аватар пользователя", () => {
    const { container } = render(<UserCard user={mockUser} />);

    // UserAvatar component should render with default avatar
    const avatarContainer = container.querySelector(
      'div[style*="background-image"]'
    );
    expect(avatarContainer).toBeInTheDocument();
  });

  it("обрабатывает пользователя без имени (фолбэк к email)", () => {
    const userWithoutName = { ...mockUser, name: "" };
    render(<UserCard user={userWithoutName} />);

    expect(screen.getByText("test")).toBeInTheDocument(); // Email prefix
  });

  it("корректно отображает роль модератора", () => {
    const moderatorUser = { ...mockUser, role: "moderator" as const };
    render(<UserCard user={moderatorUser} />);

    expect(screen.getByText("Модератор")).toBeInTheDocument();
  });

  it("корректно форматирует дату регистрации", () => {
    render(<UserCard user={mockUser} />);

    expect(
      screen.getByText("Зарегистрирован: 1 января 2023 г.")
    ).toBeInTheDocument();
  });

  it("корректно обрабатывает все колбэки действий вместе", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserCard
        user={mockUser}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByText(ACTION_BUTTONS[0]));
    fireEvent.click(screen.getByText(ACTION_BUTTONS[1]));
    fireEvent.click(screen.getByText(ACTION_BUTTONS[2]));

    expect(onView).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
