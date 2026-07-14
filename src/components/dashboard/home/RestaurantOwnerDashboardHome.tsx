import DashboardHomeShell, {
  type DashboardFeature,
} from "@/components/dashboard/home/DashboardHomeShell";
import type { AuthSession } from "@/lib/auth-client";
import {
  FiCalendar,
  FiCoffee,
  FiMessageSquare,
  FiPlusSquare,
  FiUser,
} from "react-icons/fi";

type RestaurantOwnerDashboardHomeProps = {
  user: AuthSession["user"];
};

const ownerFeatures: DashboardFeature[] = [
  {
    title: "My Restaurants",
    description:
      "View and manage the restaurant listings associated with your account.",
    icon: FiCoffee,
  },
  {
    title: "Add Restaurant",
    description:
      "Submit restaurant information through the owner dashboard.",
    icon: FiPlusSquare,
  },
  {
    title: "Reservations",
    description:
      "Review reservation requests connected to your restaurants.",
    icon: FiCalendar,
  },
  {
    title: "Customer Reviews",
    description:
      "View feedback submitted for your restaurant listings.",
    icon: FiMessageSquare,
  },
  {
    title: "Owner Profile",
    description:
      "Manage your restaurant-owner account information.",
    icon: FiUser,
  },
];

const RestaurantOwnerDashboardHome = ({
  user,
}: RestaurantOwnerDashboardHomeProps) => {
  return (
    <DashboardHomeShell
      user={user}
      title="Restaurant Owner Dashboard"
      description="Manage restaurant listings and related customer activity from your workspace."
      welcomeMessage="Your restaurant-owner dashboard will provide the tools needed to add restaurants and manage their reservations and reviews."
      features={ownerFeatures}
    />
  );
};

export default RestaurantOwnerDashboardHome;