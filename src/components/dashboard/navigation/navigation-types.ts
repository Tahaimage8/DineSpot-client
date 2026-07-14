import type { IconType } from "react-icons";

export type DashboardNavigationItem = {
  label: string;
  href: string;
  icon: IconType;
  disabled?: boolean;
};