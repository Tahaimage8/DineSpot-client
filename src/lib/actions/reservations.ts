"use server";

import { revalidatePath } from "next/cache";

import type {
  ReservationInput,
  ReservationResponse,
  ReservationStatus,
} from "@/lib/api/reservations";
import { serverMutation } from "@/lib/core/server";

const refreshReservationPages = () => {
  revalidatePath("/dashboard/reservations");
};

export const createReservation = async (
  reservationData: ReservationInput,
) => {
  const result =
    await serverMutation<ReservationResponse>(
      "/api/reservations",
      "POST",
      reservationData,
    );

  refreshReservationPages();

  return result;
};

export const cancelReservation = async (
  reservationId: string,
) => {
  const result =
    await serverMutation<ReservationResponse>(
      `/api/reservations/${encodeURIComponent(
        reservationId,
      )}/cancel`,
      "PATCH",
    );

  refreshReservationPages();

  return result;
};

export const updateOwnerReservationStatus =
  async (
    reservationId: string,
    status: Extract<
      ReservationStatus,
      "confirmed" | "rejected" | "completed"
    >,
  ) => {
    const result =
      await serverMutation<ReservationResponse>(
        `/api/owner/reservations/${encodeURIComponent(
          reservationId,
        )}/status`,
        "PATCH",
        {
          status,
        },
      );

    refreshReservationPages();

    return result;
  };

export const deleteAdminReservation =
  async (reservationId: string) => {
    const result =
      await serverMutation<ReservationResponse>(
        `/api/admin/reservations/${encodeURIComponent(
          reservationId,
        )}`,
        "DELETE",
      );

    refreshReservationPages();

    return result;
  };
