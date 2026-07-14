import AdminReservations from "@/components/reservations/AdminReservations";
import CustomerReservations from "@/components/reservations/CustomerReservations";
import OwnerReservations from "@/components/reservations/OwnerReservations";
import {
  getAdminReservations,
  getMyReservations,
  getOwnerReservations,
} from "@/lib/api/reservations";
import { getEffectiveUserType } from "@/lib/auth-role";
import { requireDashboardRole } from "@/lib/dashboard-access";

const ReservationsPage = async () => {
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
    const reservations =
      await getAdminReservations();

    return (
      <AdminReservations
        initialReservations={reservations}
      />
    );
  }

  if (userType === "restaurant_owner") {
    const reservations =
      await getOwnerReservations();

    return (
      <OwnerReservations
        initialReservations={reservations}
      />
    );
  }

  const reservations =
    await getMyReservations();

  return (
    <CustomerReservations
      initialReservations={reservations}
    />
  );
};

export default ReservationsPage;
