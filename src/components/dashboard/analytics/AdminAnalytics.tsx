import {
  FiCalendar,
  FiCoffee,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

import DashboardStatCard from "@/components/dashboard/shared/DashboardStatCard";
import StatusProgress from "@/components/dashboard/shared/StatusProgress";
import type { Reservation } from "@/lib/api/reservations";
import type { Restaurant } from "@/lib/api/restaurants";
import type { Review } from "@/lib/api/reviews";
import type { AdminUser } from "@/lib/api/users";

type AdminAnalyticsProps = {
  users: AdminUser[];
  restaurants: Restaurant[];
  reservations: Reservation[];
  reviews: Review[];
};

const AdminAnalytics = ({
  users,
  restaurants,
  reservations,
  reviews,
}: AdminAnalyticsProps) => {
  const userCustomers = users.filter(
    (user) =>
      user.role !== "admin" &&
      user.accountType === "customer",
  ).length;

  const userOwners = users.filter(
    (user) =>
      user.role !== "admin" &&
      user.accountType ===
        "restaurant_owner",
  ).length;

  const userAdmins = users.filter(
    (user) => user.role === "admin",
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked,
  ).length;

  const approvedRestaurants =
    restaurants.filter(
      (restaurant) =>
        restaurant.status === "approved",
    ).length;

  const pendingRestaurants =
    restaurants.filter(
      (restaurant) =>
        restaurant.status === "pending",
    ).length;

  const rejectedRestaurants =
    restaurants.filter(
      (restaurant) =>
        restaurant.status === "rejected",
    ).length;

  const reservationCount = (
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
          Admin Analytics
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Platform Activity
        </h1>

        <p className="muted-text mt-2">
          All values below come from the current
          users, restaurants, reservations and
          reviews.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Total Users"
          value={users.length}
          description={`${blockedUsers} blocked`}
          icon={FiUsers}
        />

        <DashboardStatCard
          label="Restaurants"
          value={restaurants.length}
          description={`${approvedRestaurants} approved`}
          icon={FiCoffee}
        />

        <DashboardStatCard
          label="Reservations"
          value={reservations.length}
          description="All reservation records"
          icon={FiCalendar}
        />

        <DashboardStatCard
          label="Average Rating"
          value={
            reviews.length > 0
              ? averageRating.toFixed(1)
              : "No data"
          }
          description={`${reviews.length} reviews`}
          icon={FiMessageSquare}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            User Types
          </h2>

          <div className="mt-5 space-y-5">
            <StatusProgress
              label="Customers"
              value={userCustomers}
              total={users.length}
            />

            <StatusProgress
              label="Restaurant Owners"
              value={userOwners}
              total={users.length}
            />

            <StatusProgress
              label="Admins"
              value={userAdmins}
              total={users.length}
            />

            <StatusProgress
              label="Blocked"
              value={blockedUsers}
              total={users.length}
            />
          </div>
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Restaurant Status
          </h2>

          <div className="mt-5 space-y-5">
            <StatusProgress
              label="Approved"
              value={approvedRestaurants}
              total={restaurants.length}
            />

            <StatusProgress
              label="Pending"
              value={pendingRestaurants}
              total={restaurants.length}
            />

            <StatusProgress
              label="Rejected"
              value={rejectedRestaurants}
              total={restaurants.length}
            />
          </div>
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Reservation Status
          </h2>

          <div className="mt-5 space-y-5">
            <StatusProgress
              label="Pending"
              value={reservationCount(
                "pending",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Confirmed"
              value={reservationCount(
                "confirmed",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Completed"
              value={reservationCount(
                "completed",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Cancelled"
              value={reservationCount(
                "cancelled",
              )}
              total={reservations.length}
            />

            <StatusProgress
              label="Rejected"
              value={reservationCount(
                "rejected",
              )}
              total={reservations.length}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default AdminAnalytics;
