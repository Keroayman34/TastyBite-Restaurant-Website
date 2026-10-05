import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold text-charcoal-900 sm:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base text-charcoal-500 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
