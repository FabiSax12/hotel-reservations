"use client";

import { Alert, Button } from "@heroui/react";
import { useI18n } from "@/locales";

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  const { t } = useI18n();

  const handleRetry = () => {
    reset();
    window.location.reload();
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-background">
      <Alert status="danger" className="max-w-lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{t.COMMON.STATUS.ERROR_TITLE}</Alert.Title>
          <Alert.Description>
            {t.COMMON.STATUS.ERROR_MESSAGE}
          </Alert.Description>
          <Button onPress={handleRetry} className="mt-2 sm:hidden" size="sm" variant="danger">
            {t.COMMON.STATUS.TRY_AGAIN}
          </Button>
        </Alert.Content>
        <Button onPress={handleRetry} className="hidden sm:block" size="sm" variant="danger">
          {t.COMMON.STATUS.TRY_AGAIN}
        </Button>
      </Alert>
    </main>
  );
}
