import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "brand" | "accent" | "success" | "outline";

const variantClasses: Record<Variant, string> = {
  default: "bg-charcoal-100 text-charcoal-700",
  brand: "bg-brand-50 text-brand-700",
  accent: "bg-accent-100 text-accent-800",
  success: "bg-green-100 text-green-800",
  outline: "border border-charcoal-200 text-charcoal-600",
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
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
