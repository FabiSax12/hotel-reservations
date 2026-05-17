"use client";

import { Card } from "@heroui/react";
import { Button } from "@hotel/ui";
import { useI18n } from "@/locales";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Card className="bg-emerald-50/50 border border-emerald-100" role="alert">
        <Card.Header>
          <Card.Title className="text-lg text-emerald-900">
            {t.COMMON.ERRORS.GENERIC}
          </Card.Title>

        </Card.Header>
        <Card.Content>
          <Card.Description className="text-emerald-800/80">
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
