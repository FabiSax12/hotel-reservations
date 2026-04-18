/**
 * @file layout.tsx — Next.js root layout for Portal de Reservas.
 *
 * Sets the `<html>` lang to "es" (Spanish/Costa Rica) and applies
 * base body styles. The `globals.css` import pulls in Tailwind's
 * base layer and any global custom CSS.
 */

import type { Metadata } from "next";
import "./globals.css";

/** SEO metadata for the application. */
export const metadata: Metadata = {
  title: "Portal de Reservas",
  description: "Sistema de reservas hoteleras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-default-50 text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
