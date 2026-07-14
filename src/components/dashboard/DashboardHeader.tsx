import UserAvatar from "@/components/shared/UserAvatar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import type { AuthSession } from "@/lib/auth-client";
import { getAccountLabel } from "@/lib/auth-role";

type DashboardHeaderProps = {
  user: AuthSession["user"];
  title: string;
  description: string;
};

const DashboardHeader = ({
  user,
  title,
  description,
}: DashboardHeaderProps) => {
  const accountLabel = getAccountLabel(user);

  return (
    <header className="surface-card flex flex-col gap-5 rounded-4xl p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
          {accountLabel}
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h1>

        <p className="muted-text mt-3 max-w-2xl text-sm leading-7">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="flex items-center gap-3 rounded-2xl border border-(--surface-border) p-2 pr-4">
          <UserAvatar
            name={user.name}
            image={user.image}
            className="h-11 w-11"
          />

          <div className="min-w-0">
            <p className="max-w-40 truncate text-sm font-extrabold text-slate-900 dark:text-white">
              {user.name}
            </p>

            <p className="max-w-40 truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;