import { FiStar } from "react-icons/fi";

type ReviewStarsProps = {
  rating: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

const ReviewStars = ({
  rating,
  showValue = false,
  reviewCount,
  className = "",
}: ReviewStarsProps) => {
  const safeRating = Math.min(
    Math.max(Number(rating) || 0, 0),
    5,
  );

  const roundedRating =
    Math.round(safeRating);

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label={`${safeRating.toFixed(
        1,
      )} out of 5 stars`}
    >
      <div className="flex items-center gap-1">
        {Array.from(
          {
            length: 5,
          },
          (_, index) => {
            const isFilled =
              index < roundedRating;

            return (
              <FiStar
                key={index}
                className={
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 dark:text-slate-600"
                }
              />
            );
          },
        )}
      </div>

      {showValue && (
        <span className="text-sm font-semibold">
          {safeRating.toFixed(1)}
        </span>
      )}

      {typeof reviewCount ===
        "number" && (
        <span className="muted-text text-sm">
          ({reviewCount}{" "}
          {reviewCount === 1
            ? "review"
            : "reviews"})
        </span>
      )}
    </div>
  );
};

export default ReviewStars;
