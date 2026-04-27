/**
 * @file layout.tsx — Next.js root layout for Portal de Reservas.
 *
 * Sets the `<html>` lang to the default locale from `@/locales` and applies
 * base body styles. Wraps all children in the `I18nProvider` from `@hotel/i18n`
 * to enable internationalization across the application. The `globals.css`
 * import pulls in Tailwind's base layer and any global custom CSS.
 */

import { I18nProvider } from "@hotel/i18n";
import type { Metadata } from "next";
import { defaultLocale, TRANSLATIONS } from "@/locales";
import { ROOT_LAYOUT_STYLES as S } from "@/theme/layout.theme";
import "./globals.css";

/** SEO metadata for the application. */
export const metadata: Metadata = {
  title: "Portal de Reservas",
  description: "Sistema de reservas hoteleras",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body className={S.body}>
        <I18nProvider defaultLocale={defaultLocale} translations={TRANSLATIONS}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
