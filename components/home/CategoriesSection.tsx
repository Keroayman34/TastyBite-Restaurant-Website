import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/home/CategoryCard";
import { categories } from "@/data/categories";

export function CategoriesSection() {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Our Menu"
          title="Browse by Category"
          description="Explore our wide range of delicious categories made fresh every day."
        />
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
