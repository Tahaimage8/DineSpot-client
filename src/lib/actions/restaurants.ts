"use server";

import { serverMutation } from "@/lib/core/server";
import type {
  RestaurantInput,
  RestaurantResponse,
  RestaurantStatus,
} from "@/lib/api/restaurants";

export const createRestaurant = async (
  restaurantData: RestaurantInput,
) => {
  return serverMutation<RestaurantResponse>(
    "/api/restaurants",
    "POST",
    restaurantData,
  );
};

export const updateRestaurant = async (
  restaurantId: string,
  restaurantData: Partial<RestaurantInput>,
) => {
  return serverMutation<RestaurantResponse>(
    `/api/restaurants/${encodeURIComponent(
      restaurantId,
    )}`,
    "PATCH",
    restaurantData,
  );
};

export const deleteRestaurant = async (
  restaurantId: string,
) => {
  return serverMutation<RestaurantResponse>(
    `/api/restaurants/${encodeURIComponent(
      restaurantId,
    )}`,
    "DELETE",
  );
};

export const updateRestaurantStatus =
  async (
    restaurantId: string,
    status: RestaurantStatus,
  ) => {
    return serverMutation<RestaurantResponse>(
      `/api/admin/restaurants/${encodeURIComponent(
        restaurantId,
      )}/status`,
      "PATCH",
      {
        status,
      },
    );
  };

export const deleteAdminRestaurant =
  async (restaurantId: string) => {
    return serverMutation<RestaurantResponse>(
      `/api/admin/restaurants/${encodeURIComponent(
        restaurantId,
      )}`,
      "DELETE",
    );
  };