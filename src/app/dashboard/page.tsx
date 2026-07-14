import AdminDashboardHome from "@/components/dashboard/admin/AdminDashboardHome";
import CustomerDashboardHome from "@/components/dashboard/customer/CustomerDashboardHome";
import RestaurantOwnerDashboardHome from "@/components/dashboard/owner/RestaurantOwnerDashboardHome";
import {
  getMyReservations,
  getOwnerReservations,
  getAdminReservations,
} from "@/lib/api/reservations";
import {
  getAdminRestaurants,
  getMyRestaurants,
} from "@/lib/api/restaurants";
import {
  getAdminReviews,
  getMyReviews,
  getOwnerReviews,
} from "@/lib/api/reviews";
import { getAdminUsers } from "@/lib/api/users";
import {
  getEffectiveUserType,
} from "@/lib/auth-role";
import { requireDashboardRole } from "@/lib/dashboard-access";

const DashboardPage = async () => {
  const session =
    await requireDashboardRole([
      "admin",
      "customer",
      "restaurant_owner",
    ]);

  const userType =
    getEffectiveUserType(
      session.user,
    );

  const userName =
    session.user.name || "User";

  if (userType === "admin") {
    const [
      users,
      restaurants,
      reservations,
      reviews,
    ] = await Promise.all([
      getAdminUsers(),
      getAdminRestaurants(),
      getAdminReservations(),
      getAdminReviews(),
    ]);

    return (
      <AdminDashboardHome
        userName={userName}
        users={users}
        restaurants={restaurants}
        reservations={reservations}
        reviews={reviews}
      />
    );
  }

  if (
    userType === "restaurant_owner"
  ) {
    const [
      restaurants,
      reservations,
      reviewData,
    ] = await Promise.all([
      getMyRestaurants(),
      getOwnerReservations(),
      getOwnerReviews(),
    ]);

    return (
      <RestaurantOwnerDashboardHome
        userName={userName}
        restaurant={
          restaurants[0] || null
        }
        reservations={reservations}
        reviewData={reviewData}
      />
    );
  }

  const [reservations, reviews] =
    await Promise.all([
      getMyReservations(),
      getMyReviews(),
    ]);

  return (
    <CustomerDashboardHome
      userName={userName}
      reservations={reservations}
      reviews={reviews}
    />
  );
};

export default DashboardPage;
