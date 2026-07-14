import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  APIError,
  createAuthMiddleware,
} from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

import { isAccountType } from "../types/auth";
import {
  database,
  mongoClient,
} from "./mongodb";

const betterAuthSecret =
  process.env.BETTER_AUTH_SECRET;

const betterAuthURL =
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000";

if (!betterAuthSecret) {
  throw new Error(
    "BETTER_AUTH_SECRET is missing. Add it to .env.local.",
  );
}

export const auth = betterAuth({
  appName: "DineSpot",
  secret: betterAuthSecret,
  baseURL: betterAuthURL,
  trustedOrigins: [betterAuthURL],

  database: mongodbAdapter(database, {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: false,
  },

  user: {
    modelName: "users",
    additionalFields: {
      accountType: {
        type: "string",
        required: true,
        defaultValue: "customer",
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },

  session: {
    modelName: "sessions",
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  account: {
    modelName: "accounts",
  },

  verification: {
    modelName: "verifications",
  },

  hooks: {
    before: createAuthMiddleware(
      async (context) => {
        if (
          context.path !==
          "/sign-up/email"
        ) {
          return;
        }

        const requestBody =
          context.body as
            | {
                accountType?: unknown;
              }
            | undefined;

        if (
          !isAccountType(
            requestBody?.accountType,
          )
        ) {
          throw new APIError(
            "BAD_REQUEST",
            {
              message:
                "Choose a valid Customer or Restaurant Owner account.",
            },
          );
        }
      },
    ),
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),

    // Keep nextCookies as the final plugin.
    nextCookies(),
  ],
});
