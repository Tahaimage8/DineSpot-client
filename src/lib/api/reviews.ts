import "server-only";

import {
  protectedFetch,
  serverFetch,
} from "@/lib/core/server";

export type Review = {
  _id: string;
  reservationId: string;

  restaurantId: string;
  restaurantName: string;
  restaurantImage?: string;

  customerId: string;
  customerName: string;
  customerEmail: string;

  rating: number;
  comment: string;

  createdAt: string;
  updatedAt: string;

  [key: string]: unknown;
};

export type ReviewSummary = {
  averageRating: number;
  reviewCount: number;
};

export type RestaurantReviewsResponse = {
  reviews: Review[];
  summary: ReviewSummary;
};

export type ReviewInput = {
  reservationId: string;
  rating: number;
  comment: string;
};

export type ReviewUpdateInput = {
  rating?: number;
  comment?: string;
};

export type ReviewResponse = {
  success: boolean;
  message: string;
  insertedId?: string;
  review?: Review;
  ratingSummary?: ReviewSummary | null;
};

type ReviewFilters = {
  search?: string;
  rating?: number | "all";
};

const buildReviewQuery = (
  filters: ReviewFilters = {},
) => {
  const searchParams = new URLSearchParams();

  if (filters.search?.trim()) {
    searchParams.set(
      "search",
      filters.search.trim(),
    );
  }

  if (
    typeof filters.rating === "number" &&
    filters.rating >= 1 &&
    filters.rating <= 5
  ) {
    searchParams.set(
      "rating",
      String(filters.rating),
    );
  }

  const query = searchParams.toString();

  return query ? `?${query}` : "";
};

export const getRestaurantReviews = async (
  restaurantId: string,
) => {
  return serverFetch<RestaurantReviewsResponse>(
    `/api/restaurants/${encodeURIComponent(
      restaurantId,
    )}/reviews`,
  );
};

export const getMyReviews = async () => {
  return protectedFetch<Review[]>(
    "/api/my/reviews",
  );
};

export const getOwnerReviews = async (
  filters: Pick<ReviewFilters, "search"> = {},
) => {
  return protectedFetch<RestaurantReviewsResponse>(
    `/api/owner/reviews${buildReviewQuery(
      filters,
    )}`,
  );
};

export const getAdminReviews = async (
  filters: ReviewFilters = {},
) => {
  return protectedFetch<Review[]>(
    `/api/admin/reviews${buildReviewQuery(
      filters,
    )}`,
  );
};
