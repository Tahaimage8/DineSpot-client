import type { DashboardNavigationItem } from "@/components/dashboard/navigation/navigation-types";
import {
  FiCalendar,
  FiHome,
  FiStar,
  FiUser,
} from "react-icons/fi";

export const customerNavigation: DashboardNavigationItem[] =
  [
    {
      label: "Overview",
      href: "/dashboard",
      icon: FiHome,
    },
    {
      label: "My Reservations",
      href: "/dashboard/reservations",
      icon: FiCalendar,
      disabled: true,
    },
    {
      label: "My Reviews",
      href: "/dashboard/reviews",
      icon: FiStar,
      disabled: true,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: FiUser,
      disabled: true,
    },
  ];