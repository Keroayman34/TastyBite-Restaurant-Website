import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
  hideRequiredMarker?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, required, hideRequiredMarker, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    const messageId = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-label text-foreground-muted">
            {label}
            {required && !hideRequiredMarker ? (
              <span className="ml-0.5 text-error-500" aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={cn(
            "h-11 w-full rounded-input border bg-surface px-4 text-body text-foreground transition-colors placeholder:text-foreground-subtle",
            "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            "disabled:cursor-not-allowed disabled:bg-charcoal-50 disabled:opacity-60",
            error ? "border-error-500" : "border-border hover:border-border-strong",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-body-sm text-error-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-body-sm text-foreground-subtle">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
