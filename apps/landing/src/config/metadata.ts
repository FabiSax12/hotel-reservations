import type { Metadata } from "next";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";

const layout = COMMON_TEXTS.es.LAYOUT;

export const siteMetadata: Metadata = {
  title: layout.META_TITLE,
  description: layout.META_DESCRIPTION,
  openGraph: {
    title: layout.HOTEL_NAME,
    description: layout.META_OG_DESCRIPTION,
    type: "website",
  },
};
