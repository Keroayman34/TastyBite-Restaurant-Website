import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.aboutTitle,
  description: itSeo.aboutDescription,
};

export default function AboutPage() {
  return <AboutView />;
}
