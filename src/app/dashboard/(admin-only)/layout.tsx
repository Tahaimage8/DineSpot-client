import { requireDashboardRole } from "@/lib/dashboard-access";
import type { ReactNode } from "react";

type AdminOnlyLayoutProps = {
  children: ReactNode;
};

const AdminOnlyLayout = async ({
  children,
}: AdminOnlyLayoutProps) => {
  await requireDashboardRole("admin");

  return <>{children}</>;
};

export default AdminOnlyLayout;