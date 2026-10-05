import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "brand" | "accent" | "success" | "warning" | "error" | "outline";

const variantClasses: Record<Variant, string> = {
  default: "bg-charcoal-100 text-charcoal-700",
  brand: "bg-primary-50 text-primary-700",
  accent: "bg-accent-100 text-accent-800",
  success: "bg-success-100 text-success-800",
  warning: "bg-warning-100 text-warning-800",
  error: "bg-error-100 text-error-700",
  outline: "border border-border-strong text-foreground-muted",
};

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: Variant;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-caption font-semibold",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
