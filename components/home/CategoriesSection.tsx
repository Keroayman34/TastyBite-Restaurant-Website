"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/home/CategoryCard";
import { categories } from "@/data/categories";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CategoriesSection() {
  const { t } = usePreferences();

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={t.home.categoriesEyebrow}
          title={t.home.categoriesTitle}
          description={t.home.categoriesDescription}
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
