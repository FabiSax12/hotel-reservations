import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel - Pagina Principal",
  description: "Bienvenido a nuestro hotel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
