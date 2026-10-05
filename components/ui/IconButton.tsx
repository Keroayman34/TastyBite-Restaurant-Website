import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  variant?: "default" | "brand" | "outline";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  default: "text-foreground-muted hover:bg-charcoal-100 hover:text-foreground",
  brand: "bg-primary-500 text-white shadow-cta hover:bg-primary-600",
  outline:
    "border border-border-strong bg-surface text-foreground-muted hover:border-charcoal-300 hover:text-foreground",
} as const;

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
