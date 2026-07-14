import DashboardHeader from "@/components/dashboard/DashboardHeader";
import type { AuthSession } from "@/lib/auth-client";
import { getAccountLabel } from "@/lib/auth-role";
import type { IconType } from "react-icons";
import {
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";

export type DashboardFeature = {
  title: string;
  description: string;
  icon: IconType;
};

type DashboardHomeShellProps = {
  user: AuthSession["user"];
  title: string;
  description: string;
  welcomeMessage: string;
  features: DashboardFeature[];
};

const DashboardHomeShell = ({
  user,
  title,
  description,
  welcomeMessage,
  features,
}: DashboardHomeShellProps) => {
  const accountLabel = getAccountLabel(user);

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardHeader
        user={user}
        title={title}
        description={description}
      />

      <section className="mt-6 overflow-hidden rounded-4xl bg-brand-green p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-yellow">
          Welcome to DineSpot
        </p>

        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
          Welcome back, {user.name}
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
          {welcomeMessage}
        </p>
      </section>

      <section className="mt-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">
            Account Information
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
            Your DineSpot account
          </h2>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <article className="surface-card rounded-2xl p-6 shadow-sm">
            <FiUser className="text-2xl text-brand-orange" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Full name
            </p>

            <p className="mt-1 font-extrabold text-slate-900 dark:text-white">
              {user.name}
            </p>
          </article>

          <article className="surface-card rounded-2xl p-6 shadow-sm">
            <FiMail className="text-2xl text-brand-orange" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Email address
            </p>

            <p className="mt-1 break-all font-extrabold text-slate-900 dark:text-white">
              {user.email}
            </p>
          </article>

          <article className="surface-card rounded-2xl p-6 shadow-sm">
            <FiShield className="text-2xl text-brand-orange" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Account access
            </p>

            <p className="mt-1 font-extrabold text-slate-900 dark:text-white">
              {accountLabel}
            </p>
          </article>
        </div>
      </section>

      <section className="mt-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">
            Your Workspace
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
            Available dashboard areas
          </h2>

          <p className="muted-text mt-3 text-sm leading-7">
            These areas will become functional when their
            real REST APIs and MongoDB collections are
            connected.
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
              <article
                key={feature.title}
                className="surface-card min-h-55 rounded-2xl p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
                  <FeatureIcon />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="muted-text mt-3 text-sm leading-7">
                  {feature.description}
                </p>

                <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  API connection pending
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardHomeShell;