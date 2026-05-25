import type { SupportedLocale } from "@hotel/i18n";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { fetchContent } from "@/lib/content";

export async function generateSiteMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "es") as SupportedLocale;
  const content = await fetchContent(locale);
  const layout = content.COMMON.LAYOUT;

  return {
    title: layout.META_TITLE,
    description: layout.META_DESCRIPTION,
    openGraph: {
      title: layout.HOTEL_NAME,
      description: layout.META_OG_DESCRIPTION,
      type: "website",
    },
  };
}
