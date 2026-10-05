import { Hero } from "@/components/home/Hero";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedSection />
      <CtaBanner />
    </>
  );
}
