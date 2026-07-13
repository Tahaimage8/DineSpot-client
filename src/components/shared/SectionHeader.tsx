type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) => {
  const alignmentClass =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col ${alignmentClass}`}>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {title}
      </h2>

      <p className="muted-text mt-4 text-base leading-7">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;