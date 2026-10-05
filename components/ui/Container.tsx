import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("container-page", className)} {...props}>
      {children}
    </div>
  );
}
