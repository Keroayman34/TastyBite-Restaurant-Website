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
        <span className="text-label font-semibold uppercase tracking-widest text-primary-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-h2 text-foreground">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-body-lg text-foreground-muted">{description}</p>
      ) : null}
    </div>
  );
}
