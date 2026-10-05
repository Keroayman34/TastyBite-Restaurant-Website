import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductDetails } from "@/components/product/ProductDetails";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoryId);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    ...(category
      ? [{ label: category.name, href: `/menu?category=${category.slug}` }]
      : []),
    { label: product.name, href: `/menu/${product.id}` },
  ];

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <Breadcrumb items={breadcrumbItems} />
        <ProductDetails key={product.id} product={product} />
      </Container>
    </section>
  );
}
