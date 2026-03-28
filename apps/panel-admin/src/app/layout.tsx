import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Panel administrativo del sistema hotelero",
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
