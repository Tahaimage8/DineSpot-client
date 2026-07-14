type StatusProgressProps = {
  label: string;
  value: number;
  total: number;
};

const StatusProgress = ({
  label,
  value,
  total,
}: StatusProgressProps) => {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold">
          {label}
        </span>

        <span className="muted-text">
          {value} ({percentage}%)
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-orange-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default StatusProgress;
