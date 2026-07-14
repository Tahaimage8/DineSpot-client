import type { DashboardNavigationItem } from "@/components/dashboard/navigation/navigation-types";
import {
  FiBarChart2,
  FiCalendar,
  FiCoffee,
  FiHome,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

export const ownerNavigation: DashboardNavigationItem[] =
  [
    {
      label: "Overview",
      href: "/dashboard",
      icon: FiHome,
    },
    {
      label: "My Restaurant",
      href: "/dashboard/my-restaurants",
      icon: FiCoffee,
    },
    {
      label: "Reservations",
      href: "/dashboard/reservations",
      icon: FiCalendar,
    },
    {
      label: "Reviews",
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
