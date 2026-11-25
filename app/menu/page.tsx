import type { Metadata } from "next";
import { MenuView } from "@/components/menu/MenuView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.menuTitle,
  description: itSeo.menuDescription,
};

export default function MenuPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return <MenuView initialCategory={searchParams.category ?? null} />;
}
