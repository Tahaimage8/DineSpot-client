import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiStar,
} from "react-icons/fi";

import DashboardStatCard from "@/components/dashboard/shared/DashboardStatCard";
import StatusProgress from "@/components/dashboard/shared/StatusProgress";
import type { Reservation } from "@/lib/api/reservations";
import type { Review } from "@/lib/api/reviews";

type CustomerAnalyticsProps = {
  reservations: Reservation[];
  reviews: Review[];
};

const CustomerAnalytics = ({
  reservations,
  reviews,
}: CustomerAnalyticsProps) => {
  const countStatus = (
    status: Reservation["status"],
  ) =>
    reservations.filter(
      (reservation) =>
        reservation.status === status,
    ).length;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) =>
            total + review.rating,
          0,
        ) / reviews.length
      : 0;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Customer Analytics
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          My Dining Activity
        </h1>

        <p className="muted-text mt-2">
          A simple summary based only on your
          reservations and reviews.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Reservations"
          value={reservations.length}
          description="All requests"
          icon={FiCalendar}
        />

        <DashboardStatCard
          label="Pending"
          value={countStatus("pending")}
          description="Waiting for restaurant"
          icon={FiClock}
        />

        <DashboardStatCard
          label="Completed"
          value={countStatus("completed")}
          description="Finished visits"
          icon={FiCheckCircle}
        />

        <DashboardStatCard
          label="Reviews"
          value={reviews.length}
          description={
            reviews.length > 0
              ? `${averageRating.toFixed(
                  1,
                )} average given`
              : "No review submitted"
          }
          icon={FiStar}
        />
      </div>

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
            value={countStatus("confirmed")}
            total={reservations.length}
          />

          <StatusProgress
            label="Completed"
            value={countStatus("completed")}
            total={reservations.length}
          />

          <StatusProgress
            label="Cancelled"
            value={countStatus("cancelled")}
            total={reservations.length}
          />

          <StatusProgress
            label="Rejected"
            value={countStatus("rejected")}
            total={reservations.length}
          />
        </div>
      </article>
    </section>
  );
};

export default CustomerAnalytics;
