import { Playfair_Display, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { I18nProvider } from "@hotel/i18n";
import type { SupportedLocale } from "@hotel/i18n";
import { fetchContent } from "@/lib/content";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ALTAVERDE — Luxury Nature Retreats · Costa Rica",
  description:
    "Donde la selva toca el cielo. Dos propiedades de lujo inmersas en la biodiversidad de Costa Rica: Arenal & La Fortuna y Monteverde.",
  openGraph: {
    title: "ALTAVERDE",
    description: "Luxury Nature Retreats · Costa Rica",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "es") as SupportedLocale;
  const content = await fetchContent(locale);

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <I18nProvider defaultLocale={locale} translations={{ [locale]: content }}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
