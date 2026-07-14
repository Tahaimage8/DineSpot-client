import AdminAnalytics from "@/components/dashboard/analytics/AdminAnalytics";
import { getAdminReservations } from "@/lib/api/reservations";
import { getAdminRestaurants } from "@/lib/api/restaurants";
import { getAdminReviews } from "@/lib/api/reviews";
import { getAdminUsers } from "@/lib/api/users";
import { requireDashboardRole } from "@/lib/dashboard-access";

const AnalyticsPage = async () => {
  await requireDashboardRole(["admin"]);

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
    <AdminAnalytics
      users={users}
      restaurants={restaurants}
      reservations={reservations}
      reviews={reviews}
    />
  );
};

export default AnalyticsPage;