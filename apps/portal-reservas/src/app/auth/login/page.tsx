import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { loginAction } from "@/features/auth/services/loginAction";
import { defaultLocale, TRANSLATIONS } from "@/locales";

const t = TRANSLATIONS[defaultLocale];

export const metadata: Metadata = {
  title: t.AUTH.LOGIN.TITLE,
};

export default function LoginPage() {
  return <LoginForm action={loginAction} />;
}
