import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DocumentSeoSync } from "@/components/layout/DocumentSeoSync";
import { CartProvider } from "@/components/cart/CartContext";
import { PreferencesProvider } from "@/components/preferences/PreferencesContext";
import { restaurant } from "@/config/restaurant";
import { getDictionary } from "@/lib/i18n";
import { getStructuredData } from "@/lib/seo/structured-data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const itDict = getDictionary("it");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: itDict.seo.homeTitle,
    template: `%s | ${restaurant.name}`,
  },
  description: itDict.seo.homeDescription,
  applicationName: restaurant.name,
  keywords: [
    "ristorante",
    "pizzeria",
    "consegna a domicilio",
    "pizza",
    "burger",
    "pasta",
    "restaurant",
    "food delivery",
  ],
  openGraph: {
    title: itDict.seo.homeTitle,
    description: itDict.seo.homeDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: restaurant.name,
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: itDict.seo.homeTitle,
    description: itDict.seo.homeDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <PreferencesProvider>
          <DocumentSeoSync />
          <a href="#main-content" className="skip-link">
            {itDict.common.skipToMain}
          </a>
          <CartProvider>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
