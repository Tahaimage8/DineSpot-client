import type { DashboardNavigationItem } from "@/components/dashboard/navigation/navigation-types";
import {
  FiBarChart2,
  FiCalendar,
  FiCoffee,
  FiHome,
  FiMessageSquare,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export const adminNavigation: DashboardNavigationItem[] =
  [
    {
      label: "Overview",
      href: "/dashboard",
      icon: FiHome,
    },
    {
      label: "Manage Users",
      href: "/dashboard/users",
      icon: FiUsers,
    },
    {
      label: "Manage Restaurants",
      href: "/dashboard/restaurants",
      icon: FiCoffee,
    },
    {
      label: "Manage Reservations",
      href: "/dashboard/reservations",
      icon: FiCalendar,
    },
    {
      label: "Manage Reviews",
      href: "/dashboard/reviews",
      icon: FiMessageSquare,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: FiBarChart2,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: FiUser,
    },
  ];
