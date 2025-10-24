import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "../schemas/user.schema";

interface UserState {
  // Состояние
  currentUser: User | null;
  selectedUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;

  // Действия
  setCurrentUser: (user: User | null) => void;
  setSelectedUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (userId: number, updates: Partial<User>) => void;
  removeUser: (userId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  currentUser: null,
  selectedUser: null,
  users: [],
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      ...initialState,

      setCurrentUser: (user) => set({ currentUser: user }),

      setSelectedUser: (user) => set({ selectedUser: user }),

      setUsers: (users) => set({ users }),

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUser: (userId, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, ...updates } : user
          ),
          currentUser:
            state.currentUser?.id === userId
              ? { ...state.currentUser, ...updates }
              : state.currentUser,
          selectedUser:
            state.selectedUser?.id === userId
              ? { ...state.selectedUser, ...updates }
              : state.selectedUser,
        })),

      removeUser: (userId) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
          selectedUser:
            state.selectedUser?.id === userId ? null : state.selectedUser,
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    {
      name: "user-store", // имя для devtools
    }
  )
);
