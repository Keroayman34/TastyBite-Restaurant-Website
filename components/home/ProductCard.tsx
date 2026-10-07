import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import type { Product } from "@/domain/entities";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/menu/${product.id}`} className="group block">
      <Card hoverable padding="none" className="overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-50">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            unoptimized
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackClassName="h-full w-full"
          />
          {product.tags.includes("popular") ? (
            <Badge variant="brand" className="absolute left-3 top-3">
              Popular
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 p-5">
          <h3 className="text-h4 text-foreground transition-colors group-hover:text-primary-600">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-body-sm text-foreground-muted">
            {product.description}
          </p>
          <p className="text-body font-semibold text-primary-600">
            {formatPrice(product.basePrice, restaurant.currency)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
