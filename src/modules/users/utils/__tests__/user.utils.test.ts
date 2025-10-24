import { describe, expect, it } from "vitest";

import { User } from "../../schemas/user.schema";
import {
  canEditUser,
  formatUserCreatedDate,
  generateAvatarColor,
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
  isAdmin,
} from "../user.utils";

describe("user.utils — утилиты пользователя", () => {
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

  describe("getUserDisplayName", () => {
    it("возвращает имя пользователя при наличии", () => {
      const result = getUserDisplayName(mockUser);
      expect(result).toBe("John Doe");
    });

    it("возвращает префикс email при отсутствии имени", () => {
      const userWithoutName = { ...mockUser, name: "" };
      const result = getUserDisplayName(userWithoutName);
      expect(result).toBe("test");
    });

    it("обрабатывает email без символа @", () => {
      const userWithInvalidEmail = {
        ...mockUser,
        name: "",
        email: "invalid-email",
      };
      const result = getUserDisplayName(userWithInvalidEmail);
      expect(result).toBe("invalid-email");
    });
  });

  describe("getUserInitials", () => {
    it("возвращает инициалы из полного имени", () => {
      const result = getUserInitials(mockUser);
      expect(result).toBe("JD");
    });

    it("возвращает первые две буквы при одном имени", () => {
      const userWithSingleName = { ...mockUser, name: "John" };
      const result = getUserInitials(userWithSingleName);
      expect(result).toBe("JO");
    });

    it("обрабатывает пустое имя", () => {
      const userWithoutName = { ...mockUser, name: "" };
      const result = getUserInitials(userWithoutName);
      expect(result).toBe("TE");
    });

    it("обрабатывает имя из нескольких слов", () => {
      const userWithLongName = { ...mockUser, name: "John Michael Doe Smith" };
      const result = getUserInitials(userWithLongName);
      expect(result).toBe("JM");
    });
  });

  describe("isAdmin", () => {
    it("возвращает true для администратора", () => {
      const result = isAdmin(mockAdminUser);
      expect(result).toBe(true);
    });

    it("возвращает false для обычного пользователя", () => {
      const result = isAdmin(mockUser);
      expect(result).toBe(false);
    });

    it("возвращает false для модератора", () => {
      const moderatorUser = { ...mockUser, role: "moderator" as const };
      const result = isAdmin(moderatorUser);
      expect(result).toBe(false);
    });
  });

  describe("canEditUser", () => {
    it("разрешает администратору редактировать любого пользователя", () => {
      const result = canEditUser(mockAdminUser, mockUser);
      expect(result).toBe(true);
    });

    it("разрешает пользователю редактировать себя", () => {
      const result = canEditUser(mockUser, mockUser);
      expect(result).toBe(true);
    });

    it("запрещает пользователю редактировать других пользователей", () => {
      const otherUser = { ...mockUser, id: 3 };
      const result = canEditUser(mockUser, otherUser);
      expect(result).toBe(false);
    });

    it("разрешает администратору редактировать себя", () => {
      const result = canEditUser(mockAdminUser, mockAdminUser);
      expect(result).toBe(true);
    });
  });

  describe("getUserAvatarUrl", () => {
    it("возвращает аватар пользователя при наличии", () => {
      const userWithAvatar = { ...mockUser, avatar: "/custom-avatar.jpg" };
      const result = getUserAvatarUrl(userWithAvatar);
      expect(result).toBe("/custom-avatar.jpg");
    });

    it("возвращает аватар по умолчанию при отсутствии avatar", () => {
      const result = getUserAvatarUrl(mockUser);
      expect(result).toBe("/avatars/default-neutral.png");
    });

    it("возвращает аватар по умолчанию при пустой строке avatar", () => {
      const userWithEmptyAvatar = { ...mockUser, avatar: "" };
      const result = getUserAvatarUrl(userWithEmptyAvatar);
      expect(result).toBe("/avatars/default-neutral.png");
    });
  });

  describe("formatUserCreatedDate", () => {
    it("корректно форматирует дату в русской локали", () => {
      const result = formatUserCreatedDate(mockUser);
      expect(result).toBe("1 января 2023 г.");
    });

    it("обрабатывает различные даты", () => {
      const userWithDifferentDate = {
        ...mockUser,
        createdAt: "2022-12-25T10:30:00Z",
      };
      const result = formatUserCreatedDate(userWithDifferentDate);
      expect(result).toBe("25 декабря 2022 г.");
    });
  });

  describe("generateAvatarColor", () => {
    it("возвращает стабильный цвет для одинакового ID пользователя", () => {
      const color1 = generateAvatarColor(1);
      const color2 = generateAvatarColor(1);
      expect(color1).toBe(color2);
    });

    it("возвращает разные цвета для разных ID пользователей", () => {
      const color1 = generateAvatarColor(1);
      const color2 = generateAvatarColor(2);
      expect(color1).not.toBe(color2);
    });

    it("возвращает валидный шестнадцатеричный цвет", () => {
      const color = generateAvatarColor(1);
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it("обрабатывает большие значения ID", () => {
      const color = generateAvatarColor(999999);
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it("обрабатывает нулевой ID пользователя", () => {
      const color = generateAvatarColor(0);
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
});
