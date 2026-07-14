"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  FiCoffee,
  FiEdit2,
  FiMessageSquare,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  deleteReview,
} from "@/lib/actions/reviews";
import type { Reservation } from "@/lib/api/reservations";
import type { Review } from "@/lib/api/reviews";
import ReviewEditor from "@/components/reviews/ReviewEditor";
import ReviewStars from "@/components/reviews/ReviewStars";

type CustomerReviewsProps = {
  initialReviews: Review[];
  initialEligibleReservations: Reservation[];
  initialOpenReservationId?: string;
};

const CustomerReviews = ({
  initialReviews,
  initialEligibleReservations,
  initialOpenReservationId,
}: CustomerReviewsProps) => {
  const [reviews, setReviews] =
    useState(initialReviews);

  const [
    eligibleReservations,
    setEligibleReservations,
  ] = useState(
    initialEligibleReservations,
  );

  const [openReservationId, setOpenReservationId] =
    useState<string | null>(
      initialEligibleReservations.some(
        (reservation) =>
          reservation._id ===
          initialOpenReservationId,
      )
        ? initialOpenReservationId ||
            null
        : null,
    );

  const [editingReviewId, setEditingReviewId] =
    useState<string | null>(null);

  const [activeReviewId, setActiveReviewId] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    setReviews(initialReviews);
    setEligibleReservations(
      initialEligibleReservations,
    );
  }, [
    initialReviews,
    initialEligibleReservations,
  ]);

  const handleCreated = (
    review: Review,
  ) => {
    setReviews((currentReviews) => [
      review,
      ...currentReviews,
    ]);

    setEligibleReservations(
      (currentReservations) =>
        currentReservations.filter(
          (reservation) =>
            reservation._id !==
            review.reservationId,
        ),
    );

    setOpenReservationId(null);
  };

  const handleUpdated = (
    review: Review,
  ) => {
    setReviews((currentReviews) =>
      currentReviews.map(
        (item) =>
          item._id === review._id
            ? review
            : item,
      ),
    );

    setEditingReviewId(null);
  };

  const handleDelete = (
    review: Review,
  ) => {
    const confirmed = window.confirm(
      `Delete your review for "${review.restaurantName}"?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveReviewId(review._id);

    startTransition(async () => {
      try {
        const result =
          await deleteReview(
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
        setActiveReviewId(null);
      }
    });
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Customer Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          My Reviews
        </h1>

        <p className="muted-text mt-2">
          Review completed dining reservations
          and manage your existing feedback.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">
          Ready to Review
        </h2>

        {eligibleReservations.length === 0 ? (
          <div className="surface-card mt-4 flex min-h-44 flex-col items-center justify-center p-6 text-center">
            <FiMessageSquare className="muted-text text-4xl" />

            <p className="muted-text mt-3">
              No completed reservation is waiting
              for a review.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 xl:grid-cols-2">
            {eligibleReservations.map(
              (reservation) => (
                <article
                  key={reservation._id}
                  className="surface-card overflow-hidden"
                >
                  <div className="grid sm:grid-cols-[150px_1fr]">
                    <div className="relative min-h-36 bg-black/5 dark:bg-white/5">
                      {reservation.restaurantImage ? (
                        <Image
                          src={
                            reservation.restaurantImage
                          }
                          alt={
                            reservation.restaurantName
                          }
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      ) : (
                        <div className="flex h-full min-h-36 items-center justify-center">
                          <FiCoffee className="muted-text text-5xl" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold">
                        {
                          reservation.restaurantName
                        }
                      </h3>

                      <p className="muted-text mt-2 text-sm">
                        Completed on{" "}
                        {
                          reservation.reservationDate
                        }{" "}
                        at{" "}
                        {
                          reservation.reservationTime
                        }
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenReservationId(
                            openReservationId ===
                              reservation._id
                              ? null
                              : reservation._id,
                          )
                        }
                        className="mt-4 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                      >
                        {openReservationId ===
                        reservation._id
                          ? "Close Form"
                          : "Write Review"}
                      </button>
                    </div>
                  </div>

                  {openReservationId ===
                    reservation._id && (
                    <div className="border-t border-[var(--border)] p-5">
                      <ReviewEditor
                        reservationId={
                          reservation._id
                        }
                        restaurantName={
                          reservation.restaurantName
                        }
                        onSaved={
                          handleCreated
                        }
                        onCancel={() =>
                          setOpenReservationId(
                            null,
                          )
                        }
                      />
                    </div>
                  )}
                </article>
              ),
            )}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold">
          Submitted Reviews
        </h2>

        {reviews.length === 0 ? (
          <div className="surface-card mt-4 flex min-h-44 flex-col items-center justify-center p-6 text-center">
            <FiMessageSquare className="muted-text text-4xl" />

            <p className="muted-text mt-3">
              You have not submitted a review
              yet.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 xl:grid-cols-2">
            {reviews.map((review) => {
              const isEditing =
                editingReviewId ===
                review._id;

              const isDeleting =
                isPending &&
                activeReviewId ===
                  review._id;

              return (
                <article
                  key={review._id}
                  className="surface-card p-5"
                >
                  {isEditing ? (
                    <ReviewEditor
                      reservationId={
                        review.reservationId
                      }
                      restaurantName={
                        review.restaurantName
                      }
                      initialReview={review}
                      onSaved={handleUpdated}
                      onCancel={() =>
                        setEditingReviewId(
                          null,
                        )
                      }
                    />
                  ) : (
                    <>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold">
                            {
                              review.restaurantName
                            }
                          </h3>

                          <p className="muted-text mt-1 text-xs">
                            {new Date(
                              review.createdAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <ReviewStars
                          rating={
                            review.rating
                          }
                          showValue
                        />
                      </div>

                      <p className="muted-text mt-4 whitespace-pre-line leading-7">
                        {review.comment}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingReviewId(
                              review._id,
                            )
                          }
                          disabled={
                            isDeleting
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              review,
                            )
                          }
                          disabled={
                            isDeleting
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
                        >
                          <FiTrash2 />
                          {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
