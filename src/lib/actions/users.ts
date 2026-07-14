"use server";

import { revalidatePath } from "next/cache";

import type {
  AdminUserResponse,
  UserAccountType,
  UserRole,
} from "@/lib/api/users";
import { serverMutation } from "@/lib/core/server";

const refreshUserPages = () => {
  revalidatePath("/dashboard/users");
};

export const updateAdminUserRole = async (
  userId: string,
  role: UserRole,
) => {
  const result =
    await serverMutation<AdminUserResponse>(
      `/api/admin/users/${encodeURIComponent(
        userId,
      )}/role`,
      "PATCH",
      {
        role,
      },
    );

  refreshUserPages();

  return result;
};

export const updateAdminUserAccountType =
  async (
    userId: string,
    accountType: UserAccountType,
  ) => {
    const result =
      await serverMutation<AdminUserResponse>(
        `/api/admin/users/${encodeURIComponent(
          userId,
        )}/account-type`,
        "PATCH",
        {
          accountType,
        },
      );

    refreshUserPages();

    return result;
  };

export const updateAdminUserBlockStatus =
  async (
    userId: string,
    isBlocked: boolean,
  ) => {
    const result =
      await serverMutation<AdminUserResponse>(
        `/api/admin/users/${encodeURIComponent(
          userId,
        )}/block`,
        "PATCH",
        {
          isBlocked,
        },
      );

    refreshUserPages();

    return result;
  };
