import Link from "next/link";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCoffee,
  FiStar,
} from "react-icons/fi";

import DashboardStatCard from "@/components/dashboard/shared/DashboardStatCard";
import type { Reservation } from "@/lib/api/reservations";
import type { Review } from "@/lib/api/reviews";

type CustomerDashboardHomeProps = {
  userName: string;
  reservations: Reservation[];
  reviews: Review[];
};

const CustomerDashboardHome = ({
  userName,
  reservations,
  reviews,
}: CustomerDashboardHomeProps) => {
  const activeReservations =
    reservations.filter((reservation) =>
      ["pending", "confirmed"].includes(
        reservation.status,
      ),
    ).length;

  const completedReservations =
    reservations.filter(
      (reservation) =>
        reservation.status === "completed",
    ).length;

  const confirmedReservations =
    reservations.filter(
      (reservation) =>
        reservation.status === "confirmed",
    ).length;

  const upcomingReservations =
    reservations
      .filter((reservation) =>
        ["pending", "confirmed"].includes(
          reservation.status,
        ),
      )
      .sort((first, second) => {
        const firstDate = new Date(
          `${first.reservationDate}T${first.reservationTime}`,
        ).getTime();

        const secondDate = new Date(
          `${second.reservationDate}T${second.reservationTime}`,
        ).getTime();

        return firstDate - secondDate;
      })
      .slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="surface-card rounded-3xl p-6 sm:p-8">
        <p className="text-sm font-semibold text-orange-500">
          Customer Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Hello, {userName}
        </h1>

        <p className="muted-text mt-3 max-w-2xl leading-7">
          Track your dining reservations and
          share reviews after completed visits.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/explore"
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Explore Restaurants
          </Link>

          <Link
            href="/dashboard/reservations"
            className="rounded-xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            My Reservations
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Total Reservations"
          value={reservations.length}
          description="All reservation requests"
          icon={FiCalendar}
        />

        <DashboardStatCard
          label="Active"
          value={activeReservations}
          description="Pending or confirmed"
          icon={FiClock}
        />

        <DashboardStatCard
          label="Confirmed"
          value={confirmedReservations}
          description="Accepted by restaurant"
          icon={FiCheckCircle}
        />

        <DashboardStatCard
          label="My Reviews"
          value={reviews.length}
          description={`${completedReservations} completed visits`}
          icon={FiStar}
        />
      </div>

      <article className="surface-card rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-500">
              Upcoming Plans
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Active Reservations
            </h2>
          </div>

          <Link
            href="/dashboard/reservations"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            View all
          </Link>
        </div>

        {upcomingReservations.length ===
        0 ? (
          <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] p-6 text-center">
            <FiCoffee className="muted-text text-4xl" />

            <h3 className="mt-3 font-bold">
              No active reservation
            </h3>

            <p className="muted-text mt-2 text-sm">
              Explore restaurants and request
              your next table.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {upcomingReservations.map(
              (reservation) => (
                <div
                  key={reservation._id}
                  className="rounded-2xl border border-[var(--border)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold">
                      {
                        reservation.restaurantName
                      }
                    </h3>

                    <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold capitalize text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                      {reservation.status}
                    </span>
                  </div>

                  <p className="muted-text mt-3 text-sm">
                    {
                      reservation.reservationDate
                    }{" "}
                    at{" "}
                    {
                      reservation.reservationTime
                    }
                  </p>

                  <p className="muted-text mt-1 text-sm">
                    {reservation.guestCount}{" "}
                    {reservation.guestCount ===
                    1
                      ? "guest"
                      : "guests"}
                  </p>
                </div>
              ),
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default CustomerDashboardHome;
