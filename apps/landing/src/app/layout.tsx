import type { SupportedLocale } from "@hotel/i18n";
import { I18nProvider } from "@hotel/i18n";
import { headers } from "next/headers";
import { dmSans, playfair } from "@/config/fonts";
import { generateSiteMetadata } from "@/config/metadata";
import { fetchContent } from "@/lib/content";
import "./globals.css";

export const generateMetadata = generateSiteMetadata;

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
