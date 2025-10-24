import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCustomMutation } from "@/shared/lib/client";

import { User } from "../../schemas/user.schema";
import { useUser, useUserPermissions } from "../useUser";

// Mock the useCustomMutation hook
vi.mock("@/shared/lib/client", () => ({
  useCustomMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    error: null,
  })),
}));

describe("useUser — хук пользователя", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const OTHER_USER_ID = 999 as const;
  const DEFAULT_ISO_DATE = "2023-01-01T00:00:00Z" as const;

  describe("хук useUser", () => {
    it("возвращает функции мутаций пользователя", () => {
      const { result } = renderHook(() => useUser(1));

      expect(result.current).toHaveProperty("updateUser");
      expect(result.current).toHaveProperty("isUpdating");
      expect(result.current).toHaveProperty("updateError");
      expect(typeof result.current.updateUser).toBe("function");
      expect(typeof result.current.isUpdating).toBe("boolean");
    });

    it("вызывает updateUser с корректными данными", async () => {
      const mockMutate = vi.fn();
      const mutationMock = {
        mutate: mockMutate,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useCustomMutation>;

      vi.mocked(useCustomMutation).mockReturnValue(mutationMock);

      const { result } = renderHook(() => useUser(1));

      const updateData = { name: "Updated Name", email: "updated@example.com" };
      result.current.updateUser(updateData);

      expect(mockMutate).toHaveBeenCalledWith(updateData);
    });

    it("возвращает состояние загрузки", async () => {
      const mutationMock = {
        mutate: vi.fn(),
        isPending: true,
        error: null,
      } as unknown as ReturnType<typeof useCustomMutation>;

      vi.mocked(useCustomMutation).mockReturnValue(mutationMock);

      const { result } = renderHook(() => useUser(1));

      expect(result.current.isUpdating).toBe(true);
    });

    it("возвращает состояние ошибки", async () => {
      const mockError = new Error("Update failed");
      const mutationMock = {
        mutate: vi.fn(),
        isPending: false,
        error: mockError,
      } as unknown as ReturnType<typeof useCustomMutation>;

      vi.mocked(useCustomMutation).mockReturnValue(mutationMock);

      const { result } = renderHook(() => useUser(1));

      expect(result.current.updateError).toBe(mockError);
    });
  });

  describe("хук useUserPermissions", () => {
    const mockCurrentUser: User = {
      id: 1,
      email: "admin@example.com",
      name: "Admin User",
      avatar: "",
      role: "admin",
      isActive: true,
      createdAt: DEFAULT_ISO_DATE,
      updatedAt: DEFAULT_ISO_DATE,
    };

    const mockRegularUser: User = {
      id: 2,
      email: "user@example.com",
      name: "Regular User",
      avatar: "",
      role: "user",
      isActive: true,
      createdAt: DEFAULT_ISO_DATE,
      updatedAt: DEFAULT_ISO_DATE,
    };

    it("возвращает функции проверки прав", () => {
      const { result } = renderHook(() => useUserPermissions(mockCurrentUser));

      expect(result.current).toHaveProperty("canEditProfile");
      expect(result.current).toHaveProperty("canDeleteUser");
      expect(result.current).toHaveProperty("canViewUserDetails");
      expect(typeof result.current.canEditProfile).toBe("function");
      expect(typeof result.current.canDeleteUser).toBe("function");
      expect(typeof result.current.canViewUserDetails).toBe("function");
    });

    describe("canEditProfile", () => {
      it("разрешает администратору редактировать любой профиль", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockCurrentUser)
        );

        expect(result.current.canEditProfile(1)).toBe(true);
        expect(result.current.canEditProfile(2)).toBe(true);
        expect(result.current.canEditProfile(OTHER_USER_ID)).toBe(true);
      });

      it("разрешает пользователю редактировать свой профиль", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockRegularUser)
        );

        expect(result.current.canEditProfile(2)).toBe(true);
      });

      it("запрещает пользователю редактировать чужие профили", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockRegularUser)
        );

        expect(result.current.canEditProfile(1)).toBe(false);
        expect(result.current.canEditProfile(OTHER_USER_ID)).toBe(false);
      });
    });

    describe("canDeleteUser", () => {
      it("разрешает администратору удалять других пользователей", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockCurrentUser)
        );

        expect(result.current.canDeleteUser(2)).toBe(true);
        expect(result.current.canDeleteUser(OTHER_USER_ID)).toBe(true);
      });

      it("запрещает администратору удалять самого себя", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockCurrentUser)
        );

        expect(result.current.canDeleteUser(1)).toBe(false);
      });

      it("запрещает обычному пользователю удалять кого-либо", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockRegularUser)
        );

        expect(result.current.canDeleteUser(1)).toBe(false);
        expect(result.current.canDeleteUser(2)).toBe(false);
        expect(result.current.canDeleteUser(OTHER_USER_ID)).toBe(false);
      });
    });

    describe("canViewUserDetails", () => {
      it("позволяет администратору просматривать любые данные пользователя", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockCurrentUser)
        );

        expect(result.current.canViewUserDetails(1)).toBe(true);
        expect(result.current.canViewUserDetails(2)).toBe(true);
        expect(result.current.canViewUserDetails(OTHER_USER_ID)).toBe(true);
      });

      it("позволяет пользователю просматривать свои данные", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockRegularUser)
        );

        expect(result.current.canViewUserDetails(2)).toBe(true);
      });

      it("запрещает пользователю просматривать данные других пользователей", () => {
        const { result } = renderHook(() =>
          useUserPermissions(mockRegularUser)
        );

        expect(result.current.canViewUserDetails(1)).toBe(false);
        expect(result.current.canViewUserDetails(OTHER_USER_ID)).toBe(false);
      });
    });

    it("корректно обрабатывает роль модератора", () => {
      const mockModerator: User = {
        ...mockRegularUser,
        id: 3,
        role: "moderator",
      };

      const { result } = renderHook(() => useUserPermissions(mockModerator));

      // Moderator should behave like regular user
      expect(result.current.canEditProfile(3)).toBe(true);
      expect(result.current.canEditProfile(1)).toBe(false);
      expect(result.current.canDeleteUser(1)).toBe(false);
      expect(result.current.canViewUserDetails(3)).toBe(true);
      expect(result.current.canViewUserDetails(1)).toBe(false);
    });
  });
});
