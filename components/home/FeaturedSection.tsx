import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/home/ProductCard";
import { products } from "@/data/products";

export function FeaturedSection() {
  const featuredProducts = products.filter((p) => p.available).slice(0, 4);

  return (
    <section className="section-spacing bg-surface">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Customer Favorites"
          title="Featured Dishes"
          description="Our most popular dishes loved by thousands of customers."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button href="/menu" variant="outline" size="lg">
            View Full Menu
          </Button>
        </div>
      </Container>
    </section>
  );
}
