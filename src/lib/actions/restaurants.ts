"use server";

import { revalidatePath } from "next/cache";

import type {
  RestaurantInput,
  RestaurantResponse,
  RestaurantStatus,
} from "@/lib/api/restaurants";
import { serverMutation } from "@/lib/core/server";

const refreshRestaurantPages = () => {
  revalidatePath("/");
  revalidatePath("/dashboard/my-restaurants");
  revalidatePath("/dashboard/manage-restaurants");
};

export const createRestaurant = async (
  restaurantData: RestaurantInput,
) => {
  const result =
    await serverMutation<RestaurantResponse>(
      "/api/restaurants",
      "POST",
      restaurantData,
    );

  refreshRestaurantPages();

  return result;
};

export const updateRestaurant = async (
  restaurantId: string,
  restaurantData: Partial<RestaurantInput>,
) => {
  const result =
    await serverMutation<RestaurantResponse>(
      `/api/restaurants/${encodeURIComponent(
        restaurantId,
      )}`,
      "PATCH",
      restaurantData,
    );

  refreshRestaurantPages();

  return result;
};

export const deleteRestaurant = async (
  restaurantId: string,
) => {
  const result =
    await serverMutation<RestaurantResponse>(
      `/api/restaurants/${encodeURIComponent(
        restaurantId,
      )}`,
      "DELETE",
    );

  refreshRestaurantPages();

  return result;
};

export const updateRestaurantStatus = async (
  restaurantId: string,
  status: RestaurantStatus,
) => {
  const result =
    await serverMutation<RestaurantResponse>(
      `/api/admin/restaurants/${encodeURIComponent(
        restaurantId,
      )}/status`,
      "PATCH",
      {
        status,
      },
    );

  refreshRestaurantPages();

  return result;
};

export const deleteAdminRestaurant = async (
  restaurantId: string,
) => {
  const result =
    await serverMutation<RestaurantResponse>(
      `/api/admin/restaurants/${encodeURIComponent(
        restaurantId,
      )}`,
      "DELETE",
    );

  refreshRestaurantPages();

  return result;
};