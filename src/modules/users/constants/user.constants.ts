/**
 * Роли пользователей в системе
 */
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
} as const;

/**
 * Статусы активности пользователей
 */
export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
} as const;

/**
 * Лимиты для пагинации
 */
export const PAGINATION_LIMITS = {
  DEFAULT: 10,
  SMALL: 5,
  LARGE: 20,
  MAX: 100,
} as const;

/**
 * Сообщения об ошибках
 */
export const USER_ERROR_MESSAGES = {
  NOT_FOUND: "Пользователь не найден",
  EMAIL_EXISTS: "Пользователь с таким email уже существует",
  INVALID_CREDENTIALS: "Неверные учетные данные",
  ACCESS_DENIED: "Доступ запрещен",
  ACCOUNT_SUSPENDED: "Аккаунт заблокирован",
} as const;

/**
 * Сообщения об успехе
 */
export const USER_SUCCESS_MESSAGES = {
  CREATED: "Пользователь успешно создан",
  UPDATED: "Пользователь успешно обновлен",
  DELETED: "Пользователь успешно удален",
  ACTIVATED: "Пользователь активирован",
  DEACTIVATED: "Пользователь деактивирован",
} as const;

/**
 * Пути для аватаров по умолчанию
 */
export const DEFAULT_AVATARS = {
  MALE: "/avatars/default-male.png",
  FEMALE: "/avatars/default-female.png",
  NEUTRAL: "/avatars/default-neutral.png",
} as const;
