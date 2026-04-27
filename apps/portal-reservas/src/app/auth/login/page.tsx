import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { loginAction } from "@/features/auth/services/loginAction";
import { getServerTranslations } from "@/locales";
 
export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations();
 
  return {
    title: t.AUTH.LOGIN.TITLE,
  };
}
 
export default function LoginPage() {
  return <LoginForm action={loginAction} />;
}
