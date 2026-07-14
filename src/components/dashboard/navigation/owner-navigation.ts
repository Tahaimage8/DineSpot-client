import type { DashboardNavigationItem } from "@/components/dashboard/navigation/navigation-types";
import {
  FiCalendar,
  FiCoffee,
  FiHome,
  FiMessageSquare,
  FiPlusSquare,
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
      label: "My Restaurants",
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
      label: "Profile",
      href: "/dashboard/profile",
      icon: FiUser,

    },
  ];