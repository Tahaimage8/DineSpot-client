import type { IconType } from "react-icons";

type DashboardStatCardProps = {
  label: string;
  value: number | string;
  description?: string;
  icon: IconType;
};

const DashboardStatCard = ({
  label,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) => {
  return (
    <article className="surface-card rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="muted-text text-sm font-medium">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>

          {description && (
            <p className="muted-text mt-2 text-sm">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
          <Icon />
        </div>
      </div>
    </article>
  );
};

export default DashboardStatCard;
