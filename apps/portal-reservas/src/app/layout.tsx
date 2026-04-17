import { I18nProvider } from "@hotel/i18n";
import type { Metadata } from "next";
import { defaultLocale, translations } from "@/locales";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal de Reservas",
  description: "Sistema de reservas hoteleras",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body className="min-h-screen bg-white antialiased">
        <I18nProvider defaultLocale={defaultLocale} translations={translations}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
