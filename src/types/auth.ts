export const accountTypes = [
  "customer",
  "restaurant_owner",
] as const;

export type AccountType = (typeof accountTypes)[number];

export const isAccountType = (
  value: unknown,
): value is AccountType => {
  return (
    typeof value === "string" &&
    accountTypes.includes(value as AccountType)
  );
};