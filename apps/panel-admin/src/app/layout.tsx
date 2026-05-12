import type { Metadata } from "next";
import { defaultLocale } from "@/locales";
import { AuthProvider } from "@/shared/auth/context/AuthProvider";
import { getInitialAuthStatus } from "@/shared/services/getInitialAuthStatus";
import { LocaleProvider } from "./_providers/LocaleProvider";
import { ROOT_LAYOUT_STYLES as STYLES } from "./layout.styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Panel administrativo del sistema hotelero",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { initialSession, initialUser, initialProfile } = await getInitialAuthStatus();

  return (
    <html lang={defaultLocale}>
      <body className={STYLES.body}>
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
