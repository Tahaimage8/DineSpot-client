import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { user } = session;

  const accountLabel =
    user.role === "admin"
      ? "Admin"
      : user.accountType === "restaurant_owner"
        ? "Restaurant Owner"
        : "Customer";

  const dashboardMessage =
    user.role === "admin"
      ? "You will manage users, restaurants, reservations and reviews from this dashboard."
      : user.accountType === "restaurant_owner"
        ? "You will add restaurants and manage your restaurant listings from this dashboard."
        : "You will manage your reservations and reviews from this dashboard.";

  return (
    <div className="mx-auto max-w-6xl">
      <section className="surface-card rounded-4xl p-6 shadow-sm sm:p-8">
        <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
          {accountLabel} Dashboard
        </span>

        <h1 className="mt-5 text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
          Welcome back, {user.name}
        </h1>

        <p className="muted-text mt-3 max-w-2xl text-sm leading-7">
          {dashboardMessage}
        </p>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="surface-card rounded-2xl p-6 shadow-sm">
          <FiUser className="text-2xl text-brand-orange" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Full Name
          </p>

          <p className="mt-1 font-extrabold text-slate-900 dark:text-white">
            {user.name}
          </p>
        </article>

        <article className="surface-card rounded-2xl p-6 shadow-sm">
          <FiMail className="text-2xl text-brand-orange" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Email Address
          </p>

          <p className="mt-1 break-all font-extrabold text-slate-900 dark:text-white">
            {user.email}
          </p>
        </article>

        <article className="surface-card rounded-2xl p-6 shadow-sm">
          <FiShield className="text-2xl text-brand-orange" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Account Type
          </p>

          <p className="mt-1 font-extrabold text-slate-900 dark:text-white">
            {accountLabel}
          </p>
        </article>
      </section>

      <section className="surface-card mt-6 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Dashboard setup completed
        </h2>

        <p className="muted-text mt-3 text-sm leading-7">
          Restaurant, reservation, review and analytics
          sections will be connected when their real REST
          APIs and MongoDB collections are ready.
        </p>
      </section>
    </div>
  );
};

export default DashboardPage;