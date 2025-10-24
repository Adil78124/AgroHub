"use client";

import React, { useState } from "react";

import { USER_ROLES } from "@/modules/users/constants/user.constants";
import { useUser } from "@/modules/users/hooks/useUser";
import { useUserPermissions } from "@/modules/users/hooks/useUser";
import { User } from "@/modules/users/schemas/user.schema";
import { UserAvatar } from "@/modules/users/ui/components/UserAvatar/UserAvatar";
import {
  formatUserCreatedDate,
  getUserDisplayName,
} from "@/modules/users/utils/user.utils";

export interface UserProfileProps {
  user: User;
  currentUser: User;
  onUserUpdate?: (updatedUser: User) => void;
  className?: string;
}

const roleLabels = {
  [USER_ROLES.ADMIN]: "Администратор",
  [USER_ROLES.USER]: "Пользователь",
  [USER_ROLES.MODERATOR]: "Модератор",
};

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  currentUser,
  onUserUpdate,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });

  const { updateUser, isUpdating } = useUser(user.id);
  const { canEditProfile } = useUserPermissions(currentUser);

  const canEdit = canEditProfile(user.id);
  const displayName = getUserDisplayName(user);
  const createdDate = formatUserCreatedDate(user);

  const handleSave = async () => {
    try {
      await updateUser({
        name: editForm.name,
        email: editForm.email,
      });
      setIsEditing(false);
      onUserUpdate?.(user);
    } catch (error) {
      void error;
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
    >
      <div className="flex items-start space-x-6">
        <UserAvatar user={user} size="xl" />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            {canEdit && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={isUpdating}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isEditing ? "Отмена" : "Редактировать"}
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Роль
              </label>
              <p className="text-gray-900">{roleLabels[user.role]}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Статус
              </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата регистрации
              </label>
              <p className="text-gray-900">{createdDate}</p>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isUpdating ? "Сохранение..." : "Сохранить"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 disabled:opacity-50 transition-colors"
              >
                Отмена
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
