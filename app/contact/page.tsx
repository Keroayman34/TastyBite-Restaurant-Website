import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.contactTitle,
  description: itSeo.contactDescription,
};

export default function ContactPage() {
  return <ContactView />;
}
