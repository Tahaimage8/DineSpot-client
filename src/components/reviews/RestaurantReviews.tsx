import {
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

import type {
  RestaurantReviewsResponse,
} from "@/lib/api/reviews";
import ReviewStars from "@/components/reviews/ReviewStars";

type RestaurantReviewsProps = {
  reviewData: RestaurantReviewsResponse;
};

const RestaurantReviews = ({
  reviewData,
}: RestaurantReviewsProps) => {
  const { reviews, summary } =
    reviewData;

  return (
    <section className="mt-8">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              Customer Reviews
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Real Dining Experiences
            </h2>
          </div>

          {summary.reviewCount > 0 && (
            <ReviewStars
              rating={
                summary.averageRating
              }
              reviewCount={
                summary.reviewCount
              }
              showValue
              className="sm:justify-end"
            />
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="mt-8 flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] p-6 text-center">
            <FiMessageSquare className="muted-text text-4xl" />

            <h3 className="mt-4 text-lg font-bold">
              No reviews yet
            </h3>

            <p className="muted-text mt-2">
              Completed customers can share the
              first review.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review._id}
                className="rounded-2xl border border-[var(--border)] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                      <FiUser />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        {review.customerName ||
                          "DineSpot Customer"}
                      </h3>

                      <p className="muted-text text-xs">
                        {new Date(
                          review.createdAt,
                        ).toLocaleDateString()}
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
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantReviews;
