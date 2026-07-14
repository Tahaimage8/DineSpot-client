import { requireDashboardRole } from "@/lib/dashboard-access";
import type { ReactNode } from "react";

type CustomerOnlyLayoutProps = {
  children: ReactNode;
};

const CustomerOnlyLayout = async ({
  children,
}: CustomerOnlyLayoutProps) => {
  await requireDashboardRole("customer");

  return <>{children}</>;
};

export default CustomerOnlyLayout;