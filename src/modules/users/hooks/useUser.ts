import { useCustomMutation } from "@/shared/lib/client";

import {
  USER_ERROR_MESSAGES,
  USER_SUCCESS_MESSAGES,
} from "../constants/user.constants";
import { UpdateUser, User } from "../schemas/user.schema";

/**
 * Хук для работы с пользователем
 *
 * @param userId - ID пользователя для работы с данными
 * @returns Объект с функциями для обновления пользователя и состоянием загрузки
 */
export const useUser = (userId: number) => {
  /**
   * Обновление данных пользователя
   */
  const updateUserMutation = useCustomMutation({
    mutationFn: (data: UpdateUser) => {
      return Promise.resolve(data);
    }, // Временное решение для примера
    toastConfig: {
      successMessage: USER_SUCCESS_MESSAGES.UPDATED,
      errorMessage: USER_ERROR_MESSAGES.NOT_FOUND,
    },
    customConfig: {
      invalidateQueries: [["users"], ["user", userId]],
      onSuccess: (data) => {
        // User updated successfully
        // TODO: Add proper logging or analytics tracking
        void data;
      },
    },
  });

  return {
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    updateError: updateUserMutation.error,
  };
};

/**
 * Хук для проверки прав пользователя
 *
 * @param currentUser - Текущий пользователь для проверки прав
 * @returns Объект с функциями для проверки различных прав доступа
 */
export const useUserPermissions = (currentUser: User) => {
  const canEditProfile = (targetUserId: number) => {
    return currentUser.id === targetUserId || currentUser.role === "admin";
  };

  const canDeleteUser = (targetUserId: number) => {
    return currentUser.role === "admin" && currentUser.id !== targetUserId;
  };

  const canViewUserDetails = (targetUserId: number) => {
    return currentUser.id === targetUserId || currentUser.role === "admin";
  };

  return {
    canEditProfile,
    canDeleteUser,
    canViewUserDetails,
  };
};
