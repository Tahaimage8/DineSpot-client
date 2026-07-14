"use client";

import {
  type FormEvent,
  useState,
  useTransition,
} from "react";
import { FiStar } from "react-icons/fi";
import { toast } from "react-toastify";

import {
  createReview,
  updateReview,
} from "@/lib/actions/reviews";
import type { Review } from "@/lib/api/reviews";

type ReviewEditorProps = {
  reservationId: string;
  restaurantName: string;
  initialReview?: Review;
  onSaved: (review: Review) => void;
  onCancel?: () => void;
};

const ReviewEditor = ({
  reservationId,
  restaurantName,
  initialReview,
  onSaved,
  onCancel,
}: ReviewEditorProps) => {
  const [rating, setRating] =
    useState(initialReview?.rating || 5);

  const [comment, setComment] =
    useState(
      initialReview?.comment || "",
    );

  const [isPending, startTransition] =
    useTransition();

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const result = initialReview
          ? await updateReview(
              initialReview._id,
              {
                rating,
                comment: comment.trim(),
              },
            )
          : await createReview({
              reservationId,
              rating,
              comment: comment.trim(),
            });

        if (!result.review) {
          throw new Error(
            "Review information was not returned.",
          );
        }

        toast.success(result.message);
        onSaved(result.review);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to save review.",
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <p className="text-sm font-semibold text-orange-500">
        {initialReview
          ? "Update Review"
          : "Write a Review"}
      </p>

      <h3 className="mt-1 text-lg font-bold">
        {restaurantName}
      </h3>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold">
          Rating
        </p>

        <div className="flex gap-2">
          {Array.from(
            {
              length: 5,
            },
            (_, index) => {
              const value = index + 1;
              const isSelected =
                value <= rating;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRating(value)
                  }
                  disabled={isPending}
                  aria-label={`Give ${value} star${
                    value === 1 ? "" : "s"
                  }`}
                  className="rounded-lg p-1 text-2xl transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiStar
                    className={
                      isSelected
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }
                  />
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor={`review-comment-${reservationId}`}
          className="mb-2 block text-sm font-semibold"
        >
          Comment
        </label>

        <textarea
          id={`review-comment-${reservationId}`}
          value={comment}
          onChange={(event) =>
            setComment(event.target.value)
          }
          placeholder="Share your real experience..."
          rows={5}
          maxLength={1000}
          required
          disabled={isPending}
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
        />

        <p className="muted-text mt-1 text-right text-xs">
          {comment.length}/1000
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={
            isPending || !comment.trim()
          }
          className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Saving..."
            : initialReview
              ? "Update Review"
              : "Submit Review"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border border-[var(--border)] px-5 py-2.5 font-semibold transition hover:bg-black/5 disabled:opacity-60 dark:hover:bg-white/5"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewEditor;
