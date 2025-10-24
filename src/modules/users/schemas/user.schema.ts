import { z } from "zod";

/**
 * Схема для валидации данных пользователя
 */
export const userSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email("Некорректный email адрес"),
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    avatar: z.string().optional(),
    role: z.enum(["admin", "user", "moderator"]),
    isActive: z.boolean().default(true),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();

/**
 * Схема для создания пользователя
 */
export const createUserSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .strict();

/**
 * Схема для обновления пользователя
 */
export const updateUserSchema = createUserSchema.partial();

/**
 * Схема для фильтрации пользователей
 */
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  role: z.enum(["admin", "user", "moderator"]).optional(),
  isActive: z.boolean().optional(),
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(10),
});

// Типы, выведенные из схем
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserFilters = z.infer<typeof userFiltersSchema>;
