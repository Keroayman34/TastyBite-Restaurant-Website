import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Padding = "none" | "sm" | "md" | "lg";

const paddingClasses: Record<Padding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-6 sm:p-8",
};

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  hoverable?: boolean;
  padding?: Padding;
}

export function Card({
  hoverable = false,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface shadow-card",
        paddingClasses[padding],
        hoverable && "transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
