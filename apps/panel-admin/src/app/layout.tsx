import type { Metadata } from "next";
import { defaultLocale } from "@/locales";
import { LocaleProvider } from "./_providers/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Panel administrativo del sistema hotelero",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body className="min-h-screen bg-white antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
