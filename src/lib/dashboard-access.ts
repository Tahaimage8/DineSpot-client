import "server-only";

import { auth } from "@/lib/auth";
import {
  getEffectiveUserType,
  type EffectiveUserType,
} from "@/lib/auth-role";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const requireDashboardRole = async (
  allowedRoles: EffectiveUserType | EffectiveUserType[],
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const currentUserType = getEffectiveUserType(
    session.user,
  );

  const acceptedRoles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (!acceptedRoles.includes(currentUserType)) {
    redirect("/unauthorized");
  }

  return session;
};