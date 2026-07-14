import AdminReviews from "@/components/reviews/AdminReviews";
import CustomerReviews from "@/components/reviews/CustomerReviews";
import OwnerReviews from "@/components/reviews/OwnerReviews";
import { getMyReservations } from "@/lib/api/reservations";
import {
  getAdminReviews,
  getMyReviews,
  getOwnerReviews,
} from "@/lib/api/reviews";
import { getEffectiveUserType } from "@/lib/auth-role";
import { requireDashboardRole } from "@/lib/dashboard-access";

type ReviewsPageProps = {
  searchParams: Promise<{
    reservationId?: string;
  }>;
};

const ReviewsPage = async ({
  searchParams,
}: ReviewsPageProps) => {
  const session =
    await requireDashboardRole([
      "admin",
      "customer",
      "restaurant_owner",
    ]);

  const userType = getEffectiveUserType(
    session.user,
  );

  if (userType === "admin") {
    const reviews =
      await getAdminReviews();

    return (
      <AdminReviews
        initialReviews={reviews}
      />
    );
  }

  if (userType === "restaurant_owner") {
    const reviewData =
      await getOwnerReviews();

    return (
      <OwnerReviews
        initialData={reviewData}
      />
    );
  }

  const [{ reservationId }, reviews, reservations] =
    await Promise.all([
      searchParams,
      getMyReviews(),
      getMyReservations(),
    ]);

  const reviewedReservationIds =
    new Set(
      reviews.map(
        (review) =>
          review.reservationId,
      ),
    );

  const eligibleReservations =
    reservations.filter(
      (reservation) =>
        reservation.status ===
          "completed" &&
        !reviewedReservationIds.has(
          reservation._id,
        ),
    );

  return (
    <CustomerReviews
      initialReviews={reviews}
      initialEligibleReservations={
        eligibleReservations
      }
      initialOpenReservationId={
        reservationId
      }
    />
  );
};

export default ReviewsPage;
