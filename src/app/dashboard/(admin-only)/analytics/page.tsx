import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FiBarChart2, FiShield } from "react-icons/fi";

const AnalyticsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="mx-auto max-w-6xl">
      <div className="surface-card rounded-4xl p-6 shadow-sm sm:p-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
          <FiBarChart2 />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">
          Admin Access
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
          Platform Analytics
        </h1>

        <p className="muted-text mt-4 max-w-2xl text-sm leading-7">
          Welcome, {session?.user.name}. This page is
          protected and available only to DineSpot
          administrators.
        </p>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/30">
          <FiShield className="mt-1 shrink-0 text-xl text-green-600 dark:text-green-400" />

          <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
            Real analytics and charts will be connected
            after the related REST APIs and MongoDB data
            are ready.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPage;