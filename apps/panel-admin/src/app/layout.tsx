import type { Metadata } from "next";
import { defaultLocale } from "@/locales";
import { AuthProvider } from "@/shared/auth/context/AuthProvider";
import { getInitialAuthStatus } from "@/shared/services/getInitialAuthStatus";
import { LocaleProvider } from "./_providers/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Panel administrativo del sistema hotelero",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const { initialSession, initialUser, initialProfile } = await getInitialAuthStatus();

  return (
    <html lang={defaultLocale}>
      <body className="min-h-screen bg-white antialiased">
        <LocaleProvider>
          <AuthProvider
            initialSession={initialSession}
            initialUser={initialUser}
            initialProfile={initialProfile}
          >
            {children}
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
