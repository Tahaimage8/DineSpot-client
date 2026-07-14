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
      href: "/dashboard/restaurants",
      icon: FiCoffee,
      disabled: true,
    },
    {
      label: "Add Restaurant",
      href: "/dashboard/restaurants/add",
      icon: FiPlusSquare,
      disabled: true,
    },
    {
      label: "Reservations",
      href: "/dashboard/reservations",
      icon: FiCalendar,
      disabled: true,
    },
    {
      label: "Reviews",
      href: "/dashboard/reviews",
      icon: FiMessageSquare,
      disabled: true,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: FiUser,
      disabled: true,
    },
  ];