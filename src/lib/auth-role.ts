import type { AuthSession } from "@/lib/auth-client";

export type EffectiveUserType =
  | "admin"
  | "customer"
  | "restaurant_owner";

type DineSpotUser = AuthSession["user"];

export const getEffectiveUserType = (
  user: DineSpotUser,
): EffectiveUserType => {
  if (user.role === "admin") {
    return "admin";
  }

  if (user.accountType === "restaurant_owner") {
    return "restaurant_owner";
  }

  return "customer";
};

export const getAccountLabel = (
  user: DineSpotUser,
): string => {
  const userType = getEffectiveUserType(user);

  if (userType === "admin") {
    return "Admin";
  }

  if (userType === "restaurant_owner") {
    return "Restaurant Owner";
  }

  return "Customer";
};

export const isAdmin = (
  user: DineSpotUser,
): boolean => {
  return getEffectiveUserType(user) === "admin";
};

export const isRestaurantOwner = (
  user: DineSpotUser,
): boolean => {
  return (
    getEffectiveUserType(user) ===
    "restaurant_owner"
  );
};

export const isCustomer = (
  user: DineSpotUser,
): boolean => {
  return getEffectiveUserType(user) === "customer";
};