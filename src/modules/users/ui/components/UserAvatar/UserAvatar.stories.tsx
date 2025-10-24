import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { UserAvatar } from "./UserAvatar";

const DEFAULT_DATE = "2024-01-01T00:00:00Z";

const meta: Meta<typeof UserAvatar> = {
  title: "Modules/Users/UserAvatar",
  component: UserAvatar,
  args: {
    user: {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      role: "user",
      isActive: true,
      createdAt: DEFAULT_DATE,
      updatedAt: DEFAULT_DATE,
    },
    size: "md",
    showOnline: false,
    isOnline: false,
  },
};

export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {};

export const WithAvatar: Story = {
  args: {
    user: {
      id: 2,
      email: "jane.smith@example.com",
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      role: "admin",
      isActive: true,
      createdAt: DEFAULT_DATE,
      updatedAt: DEFAULT_DATE,
    },
  },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const ExtraLarge: Story = {
  args: { size: "xl" },
};

export const Online: Story = {
  args: {
    showOnline: true,
    isOnline: true,
  },
};

export const Offline: Story = {
  args: {
    showOnline: true,
    isOnline: false,
  },
};

export const LongName: Story = {
  args: {
    user: {
      id: 3,
      email: "very.long.name.user@example.com",
      name: "Very Long Name User",
      role: "moderator",
      isActive: true,
      createdAt: DEFAULT_DATE,
      updatedAt: DEFAULT_DATE,
    },
  },
};
