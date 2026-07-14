"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  FiMessageSquare,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { deleteAdminReview } from "@/lib/actions/reviews";
import type { Review } from "@/lib/api/reviews";
import ReviewStars from "@/components/reviews/ReviewStars";

type AdminReviewsProps = {
  initialReviews: Review[];
};

type RatingFilter =
  | "all"
  | 1
  | 2
  | 3
  | 4
  | 5;

const AdminReviews = ({
  initialReviews,
}: AdminReviewsProps) => {
  const [reviews, setReviews] =
    useState(initialReviews);

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] =
    useState<RatingFilter>("all");

  const [activeId, setActiveId] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const filteredReviews = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return reviews.filter((review) => {
      const matchesRating =
        ratingFilter === "all" ||
        review.rating === ratingFilter;

      const searchableText = [
        review.restaurantName,
        review.customerName,
        review.customerEmail,
        review.comment,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      return (
        matchesRating && matchesSearch
      );
    });
  }, [reviews, search, ratingFilter]);

  const handleDelete = (
    review: Review,
  ) => {
    const confirmed = window.confirm(
      `Delete this review for "${review.restaurantName}"?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveId(review._id);

    startTransition(async () => {
      try {
        const result =
          await deleteAdminReview(
            review._id,
            review.restaurantId,
          );

        setReviews((currentReviews) =>
          currentReviews.filter(
            (item) =>
              item._id !== review._id,
          ),
        );

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete review.",
        );
      } finally {
        setActiveId(null);
      }
    });
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Manage Reviews
        </h1>

        <p className="muted-text mt-2">
          Review real customer feedback across
          the platform.
        </p>
      </div>

      <div className="surface-card grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_220px]">
        <div className="relative">
          <FiSearch className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search restaurant, customer or comment..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
          />
        </div>

        <select
          value={ratingFilter}
          onChange={(event) => {
            const value =
              event.target.value;

            setRatingFilter(
              value === "all"
                ? "all"
                : (Number(
                    value,
                  ) as RatingFilter),
            );
          }}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500"
        >
          <option value="all">
            All Ratings
          </option>
          <option value="5">
            5 Stars
          </option>
          <option value="4">
            4 Stars
          </option>
          <option value="3">
            3 Stars
          </option>
          <option value="2">
            2 Stars
          </option>
          <option value="1">
            1 Star
          </option>
        </select>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="surface-card flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <FiMessageSquare className="muted-text text-5xl" />

          <h2 className="mt-4 text-xl font-bold">
            No reviews found
          </h2>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredReviews.map((review) => {
            const isDeleting =
              isPending &&
              activeId === review._id;

            return (
              <article
                key={review._id}
                className="surface-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">
                      {review.restaurantName}
                    </h2>

                    <p className="muted-text mt-1">
                      {review.customerName}
                    </p>

                    <p className="muted-text break-all text-xs">
                      {review.customerEmail}
                    </p>
                  </div>

                  <ReviewStars
                    rating={review.rating}
                    showValue
                  />
                </div>

                <p className="muted-text mt-4 whitespace-pre-line leading-7">
                  {review.comment}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                  <p className="muted-text text-xs">
                    {new Date(
                      review.createdAt,
                    ).toLocaleDateString()}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(review)
                    }
                    disabled={isDeleting}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
                  >
                    <FiTrash2 />
                    {isDeleting
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminReviews;
