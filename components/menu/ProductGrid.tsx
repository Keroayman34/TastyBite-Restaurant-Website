import { MenuProductCard } from "@/components/menu/MenuProductCard";
import type { Product } from "@/domain/entities";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-1.125rem)]"
        >
          <MenuProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
