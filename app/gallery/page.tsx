import type { Metadata } from "next";
import { GalleryView } from "@/components/pages/GalleryView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.galleryTitle,
  description: itSeo.galleryDescription,
};

export default function GalleryPage() {
  return <GalleryView />;
}
