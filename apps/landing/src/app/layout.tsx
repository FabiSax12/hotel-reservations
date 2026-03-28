import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel - Página Principal",
  description: "Bienvenido a nuestro hotel",
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
