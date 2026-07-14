import Link from "next/link";
import {
  FiCalendar,
  FiCoffee,
  FiMessageSquare,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import DashboardStatCard from "@/components/dashboard/shared/DashboardStatCard";
import type { Reservation } from "@/lib/api/reservations";
import type { Restaurant } from "@/lib/api/restaurants";
import type { Review } from "@/lib/api/reviews";
import type { AdminUser } from "@/lib/api/users";

type AdminDashboardHomeProps = {
  userName: string;
  users: AdminUser[];
  restaurants: Restaurant[];
  reservations: Reservation[];
  reviews: Review[];
};

const AdminDashboardHome = ({
  userName,
  users,
  restaurants,
  reservations,
  reviews,
}: AdminDashboardHomeProps) => {
  const blockedUsers = users.filter(
    (user) => user.isBlocked,
  ).length;

  const pendingRestaurants =
    restaurants.filter(
      (restaurant) =>
        restaurant.status === "pending",
    ).length;

  const pendingReservations =
    reservations.filter(
      (reservation) =>
        reservation.status === "pending",
    ).length;

  const recentUsers = users.slice(0, 4);

  const recentRestaurants =
    restaurants.slice(0, 4);

  return (
    <section className="space-y-8">
      <div className="surface-card rounded-3xl p-6 sm:p-8">
        <p className="text-sm font-semibold text-orange-500">
          Admin Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Welcome back, {userName}
        </h1>

        <p className="muted-text mt-3 max-w-2xl leading-7">
          Review users, restaurants,
          reservations and customer feedback
          from one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/users"
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Manage Users
          </Link>

          <Link
            href="/dashboard/restaurants"
            className="rounded-xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Review Restaurants
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Registered Users"
          value={users.length}
          description={`${blockedUsers} blocked`}
          icon={FiUsers}
        />

        <DashboardStatCard
          label="Restaurants"
          value={restaurants.length}
          description={`${pendingRestaurants} pending`}
          icon={FiCoffee}
        />

        <DashboardStatCard
          label="Reservations"
          value={reservations.length}
          description={`${pendingReservations} pending`}
          icon={FiCalendar}
        />

        <DashboardStatCard
          label="Customer Reviews"
          value={reviews.length}
          description="Real submitted reviews"
          icon={FiMessageSquare}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-orange-500">
                Latest Accounts
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Recently Registered Users
              </h2>
            </div>

            <Link
              href="/dashboard/users"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              View all
            </Link>
          </div>

          {recentUsers.length === 0 ? (
            <p className="muted-text mt-6">
              No registered users found.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {user.name ||
                        "Unnamed User"}
                    </p>

                    <p className="muted-text truncate text-sm">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    }`}
                  >
                    {user.isBlocked
                      ? "Blocked"
                      : user.role === "admin"
                        ? "Admin"
                        : "Active"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-orange-500">
                Restaurant Queue
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Recent Restaurants
              </h2>
            </div>

            <Link
              href="/dashboard/restaurants"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              View all
            </Link>
          </div>

          {recentRestaurants.length === 0 ? (
            <p className="muted-text mt-6">
              No restaurants found.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {recentRestaurants.map(
                (restaurant) => (
                  <div
                    key={restaurant._id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {restaurant.name}
                      </p>

                      <p className="muted-text truncate text-sm">
                        {restaurant.location}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold capitalize dark:bg-white/10">
                      {restaurant.status}
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </article>
      </div>

      <div className="surface-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
            <FiShield />
          </div>

          <div>
            <h2 className="font-bold">
              Platform Analytics
            </h2>

            <p className="muted-text text-sm">
              View the real status breakdown of
              the platform.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/analytics"
          className="rounded-xl bg-orange-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
        >
          Open Analytics
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboardHome;
