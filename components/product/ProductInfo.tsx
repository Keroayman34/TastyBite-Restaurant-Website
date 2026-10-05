import { Star } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import type { Product } from "@/domain/entities";

interface ProductInfoProps {
  product: Product;
  price: number;
}

export function ProductInfo({ product, price }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-h1 text-foreground">{product.name}</h1>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-0.5"
          aria-label={`Rating: ${product.rating} out of 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < Math.round(product.rating)
                  ? "h-4 w-4 fill-accent-400 text-accent-400"
                  : "h-4 w-4 text-charcoal-200"
              }
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-body-sm font-medium text-foreground">{product.rating}</span>
        <span className="text-body-sm text-foreground-muted">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <p className="text-body text-foreground-muted">{product.description}</p>

      <p className="text-h2 font-bold text-primary-600">
        {formatPrice(price, restaurant.currency)}
      </p>
    </div>
  );
}
