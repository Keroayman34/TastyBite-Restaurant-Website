"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import type { LocalizedField } from "@/domain/entities";

export interface BreadcrumbItem {
  label: LocalizedField;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { t, localize } = usePreferences();

  return (
    <nav
      aria-label={t.product.breadcrumbAria}
      className="flex items-center gap-1 text-body-sm text-foreground-muted"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const label = localize(item.label);

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
                {label}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-primary-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
