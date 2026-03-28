import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
