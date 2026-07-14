import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getUserToken = async () => {
  const session = await getUserSession();
  const token = session?.session?.token;

  if (typeof token !== "string") {
    return null;
  }

  return token;
}; 