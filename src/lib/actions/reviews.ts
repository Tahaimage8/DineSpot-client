"use server";

import { revalidatePath } from "next/cache";

import type {
  ReviewInput,
  ReviewResponse,
  ReviewUpdateInput,
} from "@/lib/api/reviews";
import { serverMutation } from "@/lib/core/server";

const refreshReviewPages = (
  restaurantId?: string,
) => {
  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath("/dashboard/reviews");
  revalidatePath("/dashboard/reservations");

  if (restaurantId) {
    revalidatePath(
      `/explore/${restaurantId}`,
    );
  }
};

export const createReview = async (
  reviewData: ReviewInput,
) => {
  const result =
    await serverMutation<ReviewResponse>(
      "/api/reviews",
      "POST",
      reviewData,
    );

  refreshReviewPages(
    result.review?.restaurantId,
  );

  return result;
};

export const updateReview = async (
  reviewId: string,
  reviewData: ReviewUpdateInput,
) => {
  const result =
    await serverMutation<ReviewResponse>(
      `/api/reviews/${encodeURIComponent(
        reviewId,
      )}`,
      "PATCH",
      reviewData,
    );

  refreshReviewPages(
    result.review?.restaurantId,
  );

  return result;
};

export const deleteReview = async (
  reviewId: string,
  restaurantId?: string,
) => {
  const result =
    await serverMutation<ReviewResponse>(
      `/api/reviews/${encodeURIComponent(
        reviewId,
      )}`,
      "DELETE",
    );

  refreshReviewPages(restaurantId);

  return result;
};

export const deleteAdminReview = async (
  reviewId: string,
  restaurantId?: string,
) => {
  const result =
    await serverMutation<ReviewResponse>(
      `/api/admin/reviews/${encodeURIComponent(
        reviewId,
      )}`,
      "DELETE",
    );

  refreshReviewPages(restaurantId);

  return result;
};
