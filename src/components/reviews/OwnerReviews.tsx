"use client";

import { useMemo, useState } from "react";
import {
  FiMessageSquare,
  FiSearch,
  FiUser,
} from "react-icons/fi";

import type {
  RestaurantReviewsResponse,
} from "@/lib/api/reviews";
import ReviewStars from "@/components/reviews/ReviewStars";

type OwnerReviewsProps = {
  initialData: RestaurantReviewsResponse;
};

type RatingFilter =
  | "all"
  | 1
  | 2
  | 3
  | 4
  | 5;

const OwnerReviews = ({
  initialData,
}: OwnerReviewsProps) => {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] =
    useState<RatingFilter>("all");

  const filteredReviews = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return initialData.reviews.filter(
      (review) => {
        const matchesRating =
          ratingFilter === "all" ||
          review.rating === ratingFilter;

        const searchableText = [
          review.customerName,
          review.customerEmail,
          review.comment,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !searchValue ||
          searchableText.includes(
            searchValue,
          );

        return (
          matchesRating && matchesSearch
        );
      },
    );
  }, [
    initialData.reviews,
    search,
    ratingFilter,
  ]);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Restaurant Owner
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Restaurant Reviews
        </h1>

        <p className="muted-text mt-2">
          Read real feedback submitted by your
          completed customers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Average Rating
          </p>

          <div className="mt-3">
            <ReviewStars
              rating={
                initialData.summary
                  .averageRating
              }
              showValue
            />
          </div>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Total Reviews
          </p>

          <p className="mt-2 text-3xl font-bold">
            {
              initialData.summary
                .reviewCount
            }
          </p>
        </div>
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
            placeholder="Search customer or review..."
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

          <p className="muted-text mt-2">
            Matching customer reviews will
            appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredReviews.map((review) => (
            <article
              key={review._id}
              className="surface-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                    <FiUser />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      {review.customerName}
                    </h2>

                    <p className="muted-text break-all text-xs">
                      {review.customerEmail}
                    </p>
                  </div>
                </div>

                <ReviewStars
                  rating={review.rating}
                  showValue
                />
              </div>

              <p className="muted-text mt-4 whitespace-pre-line leading-7">
                {review.comment}
              </p>

              <p className="muted-text mt-4 text-xs">
                {new Date(
                  review.createdAt,
                ).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default OwnerReviews;
