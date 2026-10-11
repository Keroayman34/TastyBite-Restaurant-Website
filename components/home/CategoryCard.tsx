import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { Category } from "@/domain/entities";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/menu?category=${category.slug}`} className="group block">
      <Card hoverable padding="none" className="overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-50">
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            unoptimized
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackClassName="h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-1 p-4 text-center">
          <h3 className="text-h4 text-foreground transition-colors group-hover:text-primary-600">
            {category.name}
          </h3>
          <p className="text-body-sm text-foreground-muted">{category.description}</p>
        </div>
      </Card>
    </Link>
  );
}
