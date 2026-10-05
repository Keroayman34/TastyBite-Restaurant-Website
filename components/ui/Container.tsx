import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Size = "default" | "narrow";

const sizeClasses: Record<Size, string> = {
  default: "container-page",
  narrow: "container-page-narrow",
};

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: Size;
}

export function Container({ size = "default", className, children, ...props }: ContainerProps) {
  return (
    <div className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
}
