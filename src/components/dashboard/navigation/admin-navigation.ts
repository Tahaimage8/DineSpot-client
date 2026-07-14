import type { DashboardNavigationItem } from "@/components/dashboard/navigation/navigation-types";
import {
  FiBarChart2,
  FiCalendar,
  FiCoffee,
  FiHome,
  FiMessageSquare,
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
      disabled: true,
    },
    {
      label: "Manage Restaurants",
      href: "/dashboard/restaurants",
      icon: FiCoffee,
      disabled: true,
    },
    {
      label: "Manage Reservations",
      href: "/dashboard/reservations",
      icon: FiCalendar,
      disabled: true,
    },
    {
      label: "Manage Reviews",
      href: "/dashboard/reviews",
      icon: FiMessageSquare,
      disabled: true,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: FiBarChart2,
      disabled: true,
    },
  ];