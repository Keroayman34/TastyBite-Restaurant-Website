import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  variant?: "default" | "brand";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, variant = "default", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150",
          variant === "default" &&
            "text-charcoal-600 hover:bg-charcoal-100 hover:text-charcoal-900",
          variant === "brand" && "bg-brand-500 text-white shadow-cta hover:bg-brand-600",
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
