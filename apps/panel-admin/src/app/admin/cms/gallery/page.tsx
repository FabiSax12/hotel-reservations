import { forbidden } from "next/navigation";
import { CMS_TEXTS } from "@/features/cms/i18n/cms.texts";
import { GalleryManager } from "@/features/gallery/components/GalleryManager/GalleryManager";
import { GALLERY_LOCALES } from "@/features/gallery/config/gallery.constants";
import { defaultLocale } from "@/locales";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";

export default async function GalleryPage() {
  try {
    return (
      <GalleryManager
        t={CMS_TEXTS[defaultLocale].GALLERY_ADMIN}
        initialLocale={GALLERY_LOCALES.ES}
      />
    );
  } catch (e) {
    if (e instanceof AuthenticationRequiredError || e instanceof PermissionDeniedError) {
      forbidden();
    }

    throw e;
  }
}
