import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = async ({
  children,
}: DashboardLayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:flex">
      <DashboardSidebar user={session.user} />

      <main className="min-w-0 flex-1 p-4 pt-20 sm:p-6 lg:p-8 lg:pt-8">
        {children}
      </main>
    </section>
  );
};

export default DashboardLayout;