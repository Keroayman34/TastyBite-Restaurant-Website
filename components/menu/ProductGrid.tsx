import { MenuProductCard } from "@/components/menu/MenuProductCard";
import type { Product } from "@/domain/entities";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <MenuProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
