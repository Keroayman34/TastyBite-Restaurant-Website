import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/domain/entities";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/menu/${product.id}`} className="group block h-full">
      <Card
        padding="none"
        hoverable
        className={cn(
          "flex h-[340px] flex-col overflow-hidden transition-shadow sm:h-[380px] lg:h-[400px]",
          !product.available && "opacity-60",
        )}
      >
        <div className="relative h-[60%] shrink-0 overflow-hidden bg-charcoal-50">
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
          {!product.available ? (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900/40">
              <span className="rounded-full bg-charcoal-900 px-3 py-1 text-caption font-semibold text-white">
                Unavailable
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex h-[40%] flex-col gap-2 p-5">
          <h3 className="text-h4 text-foreground transition-colors group-hover:text-primary-600">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-body-sm text-foreground-muted">
            {product.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <p className="text-body font-semibold text-primary-600">
              {formatPrice(product.basePrice, restaurant.currency)}
            </p>
            <button
              type="button"
              disabled={!product.available}
              aria-label={`Add ${product.name} to cart`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
