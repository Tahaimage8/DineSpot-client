import "server-only";

import {
  getEffectiveUserType,
  type EffectiveUserType,
} from "@/lib/auth-role";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const requireDashboardRole = async (
  allowedRoles:
    | EffectiveUserType
    | EffectiveUserType[],
) => {
  const session = await getUserSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isBlocked) {
    redirect("/blocked");
  }

  const currentUserType =
    getEffectiveUserType(session.user);

  const acceptedRoles =
    Array.isArray(allowedRoles)
      ? allowedRoles
      : [allowedRoles];

  if (
    !acceptedRoles.includes(
      currentUserType,
    )
  ) {
    redirect("/unauthorized");
  }

  return session;
};
