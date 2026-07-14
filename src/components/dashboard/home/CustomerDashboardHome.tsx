import DashboardHomeShell, {
  type DashboardFeature,
} from "@/components/dashboard/home/DashboardHomeShell";
import type { AuthSession } from "@/lib/auth-client";
import {
  FiCalendar,
  FiStar,
  FiUser,
} from "react-icons/fi";

type CustomerDashboardHomeProps = {
  user: AuthSession["user"];
};

const customerFeatures: DashboardFeature[] = [
  {
    title: "My Reservations",
    description:
      "View and manage your restaurant reservations when the reservation API is ready.",
    icon: FiCalendar,
  },
  {
    title: "My Reviews",
    description:
      "View and manage the restaurant reviews submitted from your account.",
    icon: FiStar,
  },
  {
    title: "My Profile",
    description:
      "Review and update your personal DineSpot account information.",
    icon: FiUser,
  },
];

const CustomerDashboardHome = ({
  user,
}: CustomerDashboardHomeProps) => {
  return (
    <DashboardHomeShell
      user={user}
      title="Customer Dashboard"
      description="Manage your personal dining activity and account information."
      welcomeMessage="Your customer dashboard will keep your reservations, reviews and profile information organized in one place."
      features={customerFeatures}
    />
  );
};

export default CustomerDashboardHome;