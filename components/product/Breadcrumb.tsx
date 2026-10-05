import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-body-sm text-foreground-muted"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.href} className="flex items-center gap-1">
            {index > 0 ? (
              <ChevronRight
                className="h-3.5 w-3.5 text-foreground-subtle"
                aria-hidden="true"
              />
            ) : null}
            {isLast ? (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-primary-600">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
