"use client";

import { Button } from "@heroui/react";
import { ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { FORBIDDEN_PAGE_STYLES } from "./ForbiddenPage.styles";

export default function ForbiddenPage() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <main className={FORBIDDEN_PAGE_STYLES.main}>
      <ShieldX className={FORBIDDEN_PAGE_STYLES.icon} />
      <h1 className={FORBIDDEN_PAGE_STYLES.code}>{t.COMMON.STATUS.FORBIDDEN_TITLE}</h1>
      <h2 className={FORBIDDEN_PAGE_STYLES.subtitle}>{t.COMMON.STATUS.FORBIDDEN_SUBTITLE}</h2>
      <p className={FORBIDDEN_PAGE_STYLES.message}>{t.COMMON.STATUS.FORBIDDEN_MESSAGE}</p>
      <Button
        variant="danger-soft"
        onPress={() => router.push(ROUTES.ADMIN.DASHBOARD)}
        className={FORBIDDEN_PAGE_STYLES.button}
      >
        {t.COMMON.STATUS.FORBIDDEN_BACK_BUTTON}
      </Button>
    </main>
  );
}
