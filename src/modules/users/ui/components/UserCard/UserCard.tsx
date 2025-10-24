"use client";

import React from "react";

import { USER_ROLES } from "../../../constants/user.constants";
import { User } from "../../../schemas/user.schema";
import {
  formatUserCreatedDate,
  getUserDisplayName,
} from "../../../utils/user.utils";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export interface UserCardProps {
  user: User;
  showActions?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onView?: (user: User) => void;
  className?: string;
}

const roleLabels = {
  [USER_ROLES.ADMIN]: "Администратор",
  [USER_ROLES.USER]: "Пользователь",
  [USER_ROLES.MODERATOR]: "Модератор",
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  showActions = true,
  onEdit,
  onDelete,
  onView,
  className = "",
}) => {
  const displayName = getUserDisplayName(user);
  const createdDate = formatUserCreatedDate(user);
  const roleLabel = roleLabels[user.role];

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <UserAvatar user={user} size="lg" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {displayName}
            </h3>
            <span
              className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${
                  user.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              `}
            >
              {user.isActive ? "Активен" : "Неактивен"}
            </span>
          </div>

          <p className="text-sm text-gray-600 truncate">{user.email}</p>
          <p className="text-sm text-gray-500">{roleLabel}</p>
          <p className="text-xs text-gray-400 mt-1">
            Зарегистрирован: {createdDate}
          </p>
        </div>
      </div>

      {showActions && (
        <div className="mt-4 flex space-x-2">
          {onView && (
            <button
              onClick={() => onView(user)}
              className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Просмотр
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Редактировать
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(user)}
              className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
            >
              Удалить
            </button>
          )}
        </div>
      )}
    </div>
  );
};
