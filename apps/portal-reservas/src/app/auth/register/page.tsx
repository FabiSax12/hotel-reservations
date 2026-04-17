import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { defaultLocale, TRANSLATIONS } from "@/locales";

const t = TRANSLATIONS[defaultLocale];

export const metadata: Metadata = {
  title: t.AUTH.REGISTER.TITLE,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
