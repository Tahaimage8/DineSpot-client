import "server-only";

import {
  protectedFetch,
  serverFetch,
} from "@/lib/core/server";

export type RestaurantStatus =
  | "pending"
  | "approved"
  | "rejected";

export type Restaurant = {
  _id: string;
  name: string;
  cuisine: string;
  location: string;
  description?: string;
  phone?: string;
  email?: string;
  image?: string;
  ownerId: string;
  ownerEmail: string;
  status: RestaurantStatus;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
  rejectedAt?: string | null;
  rejectedBy?: string | null;
  [key: string]: unknown;
};

export type RestaurantInput = {
  name: string;
  cuisine: string;
  location: string;
  description?: string;
  phone?: string;
  email?: string;
  image?: string;
  [key: string]: unknown;
};

export type RestaurantResponse = {
  success: boolean;
  message: string;
  insertedId?: string;
  restaurant?: Restaurant;
};

type AdminRestaurantFilters = {
  status?:
    | RestaurantStatus
    | "all";
  search?: string;
};

export const getRestaurants = async () => {
  return serverFetch<Restaurant[]>(
    "/api/restaurants",
  );
};

export const getRestaurantById = async (
  restaurantId: string,
) => {
  return serverFetch<Restaurant>(
    `/api/restaurants/${encodeURIComponent(
      restaurantId,
    )}`,
  );
};

export const getMyRestaurants =
  async () => {
    return protectedFetch<Restaurant[]>(
      "/api/my/restaurants",
    );
  };

export const getAdminRestaurants = async (
  filters: AdminRestaurantFilters = {},
) => {
  const searchParams =
    new URLSearchParams();

  if (
    filters.status &&
    filters.status !== "all"
  ) {
    searchParams.set(
      "status",
      filters.status,
    );
  }

  if (filters.search?.trim()) {
    searchParams.set(
      "search",
      filters.search.trim(),
    );
  }

  const query = searchParams.toString();

  const endpoint = query
    ? `/api/admin/restaurants?${query}`
    : "/api/admin/restaurants";

  return protectedFetch<Restaurant[]>(
    endpoint,
  );
};