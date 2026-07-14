import DashboardHomeShell, {
  type DashboardFeature,
} from "@/components/dashboard/home/DashboardHomeShell";
import type { AuthSession } from "@/lib/auth-client";
import {
  FiBarChart2,
  FiCalendar,
  FiCoffee,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

type AdminDashboardHomeProps = {
  user: AuthSession["user"];
};

const adminFeatures: DashboardFeature[] = [
  {
    title: "User Management",
    description:
      "Review and manage registered DineSpot user accounts.",
    icon: FiUsers,
  },
  {
    title: "Restaurant Management",
    description:
      "Review and manage restaurant information submitted to DineSpot.",
    icon: FiCoffee,
  },
  {
    title: "Reservation Management",
    description:
      "Monitor reservation activity across the platform.",
    icon: FiCalendar,
  },
  {
    title: "Review Management",
    description:
      "Review submitted feedback and maintain platform quality.",
    icon: FiMessageSquare,
  },
  {
    title: "Platform Analytics",
    description:
      "View real platform information when analytics APIs are connected.",
    icon: FiBarChart2,
  },
];

const AdminDashboardHome = ({
  user,
}: AdminDashboardHomeProps) => {
  return (
    <DashboardHomeShell
      user={user}
      title="Admin Dashboard"
      description="Manage the main areas of the DineSpot platform from one organized workspace."
      welcomeMessage="Your administrator account will provide access to user, restaurant, reservation, review and analytics management."
      features={adminFeatures}
    />
  );
};

export default AdminDashboardHome;