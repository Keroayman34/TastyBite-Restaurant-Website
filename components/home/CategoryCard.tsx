import Link from "next/link";
import {
  Pizza,
  Beef,
  Drumstick,
  Soup,
  Salad,
  CupSoda,
  IceCreamCone,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Category } from "@/domain/entities";

const categoryIcons: Record<string, LucideIcon> = {
  "cat-pizza": Pizza,
  "cat-burgers": Beef,
  "cat-chicken": Drumstick,
  "cat-pasta": Soup,
  "cat-salads": Salad,
  "cat-drinks": CupSoda,
  "cat-desserts": IceCreamCone,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.id] ?? Pizza;

  return (
    <Link href={`/menu?category=${category.slug}`} className="group block">
      <Card
        hoverable
        padding="lg"
        className="flex flex-col items-center gap-4 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
          <Icon className="h-8 w-8" />
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="text-h4 text-foreground transition-colors group-hover:text-primary-600">
            {category.name}
          </h3>
          <p className="text-body-sm text-foreground-muted">{category.description}</p>
        </div>
      </Card>
    </Link>
  );
}
