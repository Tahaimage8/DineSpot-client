import Link from "next/link";
import {
  FiCalendar,
  FiCheckCircle,
  FiCoffee,
  FiClock,
  FiStar,
} from "react-icons/fi";

import DashboardStatCard from "@/components/dashboard/shared/DashboardStatCard";
import type { Reservation } from "@/lib/api/reservations";
import type { Restaurant } from "@/lib/api/restaurants";
import type {
  RestaurantReviewsResponse,
} from "@/lib/api/reviews";

type RestaurantOwnerDashboardHomeProps = {
  userName: string;
  restaurant: Restaurant | null;
  reservations: Reservation[];
  reviewData: RestaurantReviewsResponse;
};

const RestaurantOwnerDashboardHome = ({
  userName,
  restaurant,
  reservations,
  reviewData,
}: RestaurantOwnerDashboardHomeProps) => {
  const pendingReservations =
    reservations.filter(
      (reservation) =>
        reservation.status === "pending",
    ).length;

  const confirmedReservations =
    reservations.filter(
      (reservation) =>
        reservation.status === "confirmed",
    ).length;

  const completedReservations =
    reservations.filter(
      (reservation) =>
        reservation.status === "completed",
    ).length;

  const recentReservations =
    reservations.slice(0, 4);

  return (
    <section className="space-y-8">
      <div className="surface-card rounded-3xl p-6 sm:p-8">
        <p className="text-sm font-semibold text-orange-500">
          Restaurant Owner Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Welcome, {userName}
        </h1>

        <p className="muted-text mt-3 max-w-2xl leading-7">
          Manage your restaurant, reservation
          requests and customer reviews.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/my-restaurants"
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Manage Restaurant
          </Link>

          <Link
            href="/dashboard/reservations"
            className="rounded-xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            View Reservations
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Restaurant Status"
          value={
            restaurant
              ? restaurant.status
              : "Not added"
          }
          description={
            restaurant
              ? restaurant.name
              : "Create your restaurant"
          }
          icon={FiCoffee}
        />

        <DashboardStatCard
          label="Pending Requests"
          value={pendingReservations}
          description="Needs your response"
          icon={FiClock}
        />

        <DashboardStatCard
          label="Confirmed"
          value={confirmedReservations}
          description="Upcoming reservations"
          icon={FiCheckCircle}
        />

        <DashboardStatCard
          label="Customer Reviews"
          value={
            reviewData.summary.reviewCount
          }
          description={
            reviewData.summary.reviewCount > 0
              ? `${reviewData.summary.averageRating.toFixed(
                  1,
                )} average rating`
              : "No reviews yet"
          }
          icon={FiStar}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-orange-500">
                Reservation Activity
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Recent Requests
              </h2>
            </div>

            <Link
              href="/dashboard/reservations"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              View all
            </Link>
          </div>

          {recentReservations.length === 0 ? (
            <p className="muted-text mt-6">
              No reservation request found.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {recentReservations.map(
                (reservation) => (
                  <div
                    key={reservation._id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        {
                          reservation.customerName
                        }
                      </p>

                      <p className="muted-text mt-1 text-sm">
                        {
                          reservation.reservationDate
                        }{" "}
                        at{" "}
                        {
                          reservation.reservationTime
                        }
                      </p>
                    </div>

                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold capitalize dark:bg-white/10">
                      {reservation.status}
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <p className="text-sm font-semibold text-orange-500">
            Completed Visits
          </p>

          <p className="mt-2 text-4xl font-bold">
            {completedReservations}
          </p>

          <p className="muted-text mt-2 text-sm">
            Reservations successfully marked
            completed.
          </p>

          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
            <FiCalendar />
          </div>
        </article>
      </div>
    </section>
  );
};

export default RestaurantOwnerDashboardHome;
