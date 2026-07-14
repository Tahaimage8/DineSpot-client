import { requireDashboardRole } from "@/lib/dashboard-access";
import type { ReactNode } from "react";

type OwnerOnlyLayoutProps = {
  children: ReactNode;
};

const OwnerOnlyLayout = async ({
  children,
}: OwnerOnlyLayoutProps) => {
  await requireDashboardRole("restaurant_owner");

  return <>{children}</>;
};

export default OwnerOnlyLayout;