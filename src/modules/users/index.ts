/**
 * Публичный API модуля Users
 * Экспортируем только то, что нужно использовать в других модулях
 */

// Схемы и типы
export type {
  User,
  CreateUser,
  UpdateUser,
  UserFilters,
} from "./schemas/user.schema";
export {
  userSchema,
  createUserSchema,
  updateUserSchema,
  userFiltersSchema,
} from "./schemas/user.schema";

// Константы
export {
  USER_ROLES,
  USER_STATUS,
  USER_ERROR_MESSAGES,
  USER_SUCCESS_MESSAGES,
} from "./constants/user.constants";

// Утилиты
export {
  getUserDisplayName,
  getUserInitials,
  isAdmin,
  canEditUser,
  getUserAvatarUrl,
  formatUserCreatedDate,
  generateAvatarColor,
} from "./utils/user.utils";

// Хуки
export { useUser, useUserPermissions } from "./hooks/useUser";

// Стейт-менеджмент
export { useUserStore } from "./model/user.store";

// UI компоненты (только публичные)
export { UserAvatar } from "./ui/components/UserAvatar/UserAvatar";
export { UserCard } from "./ui/components/UserCard/UserCard";

// UI виджеты (только публичные)
export { UserProfile } from "./ui/widgets/UserProfile/UserProfile";
