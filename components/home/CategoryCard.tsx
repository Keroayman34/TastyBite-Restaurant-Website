"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import type { Category } from "@/domain/entities";

export function CategoryCard({ category }: { category: Category }) {
  const { localize } = usePreferences();
  const name = localize(category.name);
  const description = localize(category.description);

  return (
    <Link href={`/menu?category=${category.slug}`} className="group block">
      <Card hoverable padding="none" className="overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-50">
          <ImageWithFallback
            src={category.image}
            alt={name}
            unoptimized
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackClassName="h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-1 p-4 text-center">
          <h3 className="text-h4 text-foreground transition-colors group-hover:text-primary-600">
            {name}
          </h3>
          <p className="text-body-sm text-foreground-muted">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
