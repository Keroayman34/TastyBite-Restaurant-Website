import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/domain/entities";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-card bg-charcoal-50">
      <ImageWithFallback
        src={product.image}
        alt={product.name}
        unoptimized
        fill
        className="object-cover"
        fallbackClassName="h-full w-full"
      />
      {product.tags.includes("popular") ? (
        <Badge variant="brand" className="absolute left-4 top-4">
          Popular
        </Badge>
      ) : null}
      {product.tags.includes("new") ? (
        <Badge variant="success" className="absolute left-4 top-4">
          New
        </Badge>
      ) : null}
    </div>
  );
}
