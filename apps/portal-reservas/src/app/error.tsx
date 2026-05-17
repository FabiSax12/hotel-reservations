"use client";

import { Card } from "@heroui/react";
import { Button } from "@hotel/ui";
import { useI18n } from "@/locales";

const PORTA_ERROR_PAGE_STYLES = {
  main: "flex h-screen flex-col items-center justify-center",
  cardWrapper: "bg-emerald-50/50 border border-emerald-100",
  title: "text-lg text-emerald-900",
  description: "text-emerald-800/80",
} as const

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <main className={PORTA_ERROR_PAGE_STYLES.main}>
      <Card className={PORTA_ERROR_PAGE_STYLES.cardWrapper} role="alert">
        <Card.Header>
          <Card.Title className={PORTA_ERROR_PAGE_STYLES.title}>
            {t.COMMON.ERRORS.GENERIC}
          </Card.Title>

        </Card.Header>
        <Card.Content>
          <Card.Description className={PORTA_ERROR_PAGE_STYLES.description}>
            {error.message || t.COMMON.ERRORS.GENERIC}
          </Card.Description>
          <Button
            onClick={reset}
            variant="primary"
            className="mt-2"
          >
            {t.COMMON.ACTIONS.BACK}
          </Button>
        </Card.Content>
      </Card>
    </main>
  );
}
