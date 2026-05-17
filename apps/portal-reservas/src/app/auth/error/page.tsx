import type { Metadata } from "next";
import { getServerTranslations } from "@/locales/server";
import { AuthErrorContent } from "./AuthErrorContent";
import type { AuthErrorPageProps } from "./page.interface";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations();

  return {
    title: t.AUTH.ERRORS.AUTH_ERROR_TITLE,
  };
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const resolvedSearchParams = await searchParams;
  return <AuthErrorContent searchParams={resolvedSearchParams} />;
}
