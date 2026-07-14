import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCoffee,
  FiStar,
} from "react-icons/fi";

import DashboardStatCard from "@/components/dashboard/shared/DashboardStatCard";
import StatusProgress from "@/components/dashboard/shared/StatusProgress";
import type { Reservation } from "@/lib/api/reservations";
import type { Restaurant } from "@/lib/api/restaurants";
import type {
  RestaurantReviewsResponse,
} from "@/lib/api/reviews";

type OwnerAnalyticsProps = {
  restaurant: Restaurant | null;
  reservations: Reservation[];
  reviewData: RestaurantReviewsResponse;
};

const OwnerAnalytics = ({
  restaurant,
  reservations,
  reviewData,
}: OwnerAnalyticsProps) => {
  const countStatus = (
    status: Reservation["status"],
  ) =>
    reservations.filter(
      (reservation) =>
        reservation.status === status,
    ).length;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Restaurant Analytics
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Business Activity
        </h1>

        <p className="muted-text mt-2">
          Real reservation and review information
          for your restaurant.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Restaurant"
          value={
            restaurant
              ? restaurant.status
              : "Not added"
          }
          description={
            restaurant?.name ||
            "Create a restaurant first"
          }
          icon={FiCoffee}
        />

        <DashboardStatCard
          label="Reservations"
          value={reservations.length}
          description="All customer requests"
          icon={FiCalendar}
        />

        <DashboardStatCard
          label="Completed"
          value={countStatus("completed")}
          description="Finished reservations"
          icon={FiCheckCircle}
        />

        <DashboardStatCard
          label="Average Rating"
          value={
            reviewData.summary.reviewCount > 0
              ? reviewData.summary.averageRating.toFixed(
                  1,
                )
              : "No data"
          }
          description={`${reviewData.summary.reviewCount} reviews`}
          icon={FiStar}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Reservation Status Breakdown
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <StatusProgress
              label="Pending"
              value={countStatus("pending")}
              total={reservations.length}
            />

            <StatusProgress
              label="Confirmed"
              value={countStatus(
                "confirmed",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Completed"
              value={countStatus(
                "completed",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Cancelled"
              value={countStatus(
                "cancelled",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Rejected"
              value={countStatus(
                "rejected",
              )}
              total={reservations.length}
            />
          </div>
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
            <FiClock />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            Waiting for Response
          </h2>

          <p className="mt-2 text-4xl font-bold">
            {countStatus("pending")}
          </p>

          <p className="muted-text mt-2 text-sm leading-6">
            Pending reservation requests should
            be reviewed from the Reservations
            page.
          </p>
        </article>
      </div>
    </section>
  );
};

export default OwnerAnalytics;
