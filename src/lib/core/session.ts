import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true,
    },
  });

  return session;
};

export const getUserToken = async () => {
  const session = await getUserSession();

  if (!session?.session?.token) {
    return null;
  }

  return session.session.token;
};