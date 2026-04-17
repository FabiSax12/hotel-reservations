import { I18nProvider } from "@hotel/i18n";
import type { Metadata } from "next";
import { defaultLocale, TRANSLATIONS } from "@/locales";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Panel administrativo del sistema hotelero",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body className="min-h-screen bg-white antialiased">
        <I18nProvider defaultLocale={defaultLocale} translations={TRANSLATIONS}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
