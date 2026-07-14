import "server-only";

import { protectedFetch } from "@/lib/core/server";

export type UserRole =
  | "user"
  | "admin";

export type UserAccountType =
  | "customer"
  | "restaurant_owner";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  emailVerified: boolean;
  role: UserRole;
  accountType: UserAccountType;
  createdAt?: string | null;
  updatedAt?: string | null;
  isBlocked: boolean;
  blockedAt?: string | null;
  isCurrentUser: boolean;
};

export type AdminUserResponse = {
  success: boolean;
  message: string;
  user?: AdminUser;
};

type AdminUserFilters = {
  search?: string;
  role?: UserRole | "all";
  accountType?:
    | UserAccountType
    | "all";
};

export const getAdminUsers = async (
  filters: AdminUserFilters = {},
) => {
  const searchParams =
    new URLSearchParams();

  if (filters.search?.trim()) {
    searchParams.set(
      "search",
      filters.search.trim(),
    );
  }

  if (
    filters.role &&
    filters.role !== "all"
  ) {
    searchParams.set(
      "role",
      filters.role,
    );
  }

  if (
    filters.accountType &&
    filters.accountType !== "all"
  ) {
    searchParams.set(
      "accountType",
      filters.accountType,
    );
  }

  const query = searchParams.toString();

  const endpoint = query
    ? `/api/admin/users?${query}`
    : "/api/admin/users";

  return protectedFetch<AdminUser[]>(
    endpoint,
  );
};
