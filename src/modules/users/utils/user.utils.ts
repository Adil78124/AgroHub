import { USER_ROLES } from "@/modules/users/constants/user.constants";
import { DEFAULT_AVATARS } from "@/modules/users/constants/user.constants";
import { User } from "@/modules/users/schemas/user.schema";

/**
 * Получает отображаемое имя пользователя
 *
 * @param user - Объект пользователя
 * @returns Имя пользователя или часть email до символа @
 * @example
 * ```typescript
 * const displayName = getUserDisplayName({ name: 'John Doe', email: 'john@example.com' });
 * // Returns: 'John Doe'
 * ```
 */
export const getUserDisplayName = (user: User): string => {
  return user.name || user.email.split("@")[0];
};

/**
 * Получает инициалы пользователя
 *
 * @param user - Объект пользователя
 * @returns Инициалы пользователя (до 2 символов в верхнем регистре)
 * @example
 * ```typescript
 * const initials = getUserInitials({ name: 'John Doe', email: 'john@example.com' });
 * // Returns: 'JD'
 * ```
 */
export const getUserInitials = (user: User): string => {
  const name = getUserDisplayName(user);
  const words = name.split(" ");

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
};

/**
 * Проверяет, является ли пользователь администратором
 *
 * @param user - Объект пользователя
 * @returns true, если пользователь является администратором
 * @example
 * ```typescript
 * const adminStatus = isAdmin({ role: 'admin', id: 1 });
 * // Returns: true
 * ```
 */
export const isAdmin = (user: User): boolean => {
  return user.role === USER_ROLES.ADMIN;
};

/**
 * Проверяет, может ли пользователь редактировать другого пользователя
 *
 * @param currentUser - Текущий пользователь
 * @param targetUser - Целевой пользователь для редактирования
 * @returns true, если текущий пользователь может редактировать целевого пользователя
 * @example
 * ```typescript
 * const canEdit = canEditUser(currentUser, targetUser);
 * // Returns: true если currentUser админ или это тот же пользователь
 * ```
 */
export const canEditUser = (currentUser: User, targetUser: User): boolean => {
  // Админ может редактировать всех
  if (isAdmin(currentUser)) return true;

  // Пользователь может редактировать только себя
  return currentUser.id === targetUser.id;
};

/**
 * Получает URL аватара пользователя
 *
 * @param user - Объект пользователя
 * @returns URL аватара пользователя или аватар по умолчанию
 * @example
 * ```typescript
 * const avatarUrl = getUserAvatarUrl({ avatar: 'custom.jpg', id: 1 });
 * // Returns: 'custom.jpg' или DEFAULT_AVATARS.NEUTRAL
 * ```
 */
export const getUserAvatarUrl = (user: User): string => {
  if (user.avatar) return user.avatar;

  // Возвращаем нейтральный аватар по умолчанию
  return DEFAULT_AVATARS.NEUTRAL;
};

/**
 * Форматирует дату создания пользователя
 *
 * @param user - Объект пользователя
 * @returns Отформатированная дата создания в русской локали
 * @example
 * ```typescript
 * const formattedDate = formatUserCreatedDate({ createdAt: '2023-01-15' });
 * // Returns: '15 января 2023 г.'
 * ```
 */
export const formatUserCreatedDate = (user: User): string => {
  const date = new Date(user.createdAt);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Генерирует случайный цвет для аватара на основе ID пользователя
 *
 * @param userId - ID пользователя
 * @returns HEX код цвета для аватара
 * @example
 * ```typescript
 * const color = generateAvatarColor(123);
 * // Returns: '#FF6B6B' (один из предопределенных цветов)
 * ```
 */
export const generateAvatarColor = (userId: number): string => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
  ];

  return colors[userId % colors.length];
};
