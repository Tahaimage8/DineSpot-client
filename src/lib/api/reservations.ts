import "server-only";

import { protectedFetch } from "@/lib/core/server";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

export type Reservation = {
  _id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage?: string;
  restaurantLocation?: string;
  restaurantOwnerId?: string;
  restaurantOwnerEmail?: string;

  customerId: string;
  customerName: string;
  customerEmail: string;

  phone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequest?: string;

  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;

  confirmedAt?: string;
  rejectedAt?: string;
  cancelledAt?: string;
  completedAt?: string;

  [key: string]: unknown;
};

export type ReservationInput = {
  restaurantId: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  phone: string;
  specialRequest?: string;
};

export type ReservationResponse = {
  success: boolean;
  message: string;
  insertedId?: string;
  reservation?: Reservation;
};

type ReservationFilters = {
  status?: ReservationStatus | "all";
  search?: string;
};

const buildReservationQuery = (
  filters: ReservationFilters = {},
) => {
  const searchParams = new URLSearchParams();

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

  return query ? `?${query}` : "";
};

export const getMyReservations = async (
  filters: ReservationFilters = {},
) => {
  return protectedFetch<Reservation[]>(
    `/api/my/reservations${buildReservationQuery(
      filters,
    )}`,
  );
};

export const getOwnerReservations = async (
  filters: ReservationFilters = {},
) => {
  return protectedFetch<Reservation[]>(
    `/api/owner/reservations${buildReservationQuery(
      filters,
    )}`,
  );
};

export const getAdminReservations = async (
  filters: ReservationFilters = {},
) => {
  return protectedFetch<Reservation[]>(
    `/api/admin/reservations${buildReservationQuery(
      filters,
    )}`,
  );
};
