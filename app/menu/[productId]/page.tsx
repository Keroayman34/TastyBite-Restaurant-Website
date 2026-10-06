import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductDetails } from "@/components/product/ProductDetails";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { getBreadcrumbStructuredData } from "@/lib/seo/structured-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

  const productUrl = `${baseUrl}/menu/${product.id}`;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: productUrl,
      type: "website",
      images: [{ url: product.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
    },
    alternates: {
      canonical: productUrl,
    },
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

  const breadcrumbSchema = getBreadcrumbStructuredData(breadcrumbItems);

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <Breadcrumb items={breadcrumbItems} />
        <ProductDetails key={product.id} product={product} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
}
