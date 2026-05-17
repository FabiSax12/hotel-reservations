"use client";

import { Card } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-background">
      <Card className="flex flex-col items-center rounded-xl bg-gray-50 p-12 text-center shadow-sm border border-gray-100">
        <Card.Header>
          <Card.Title className="text-2xl">
            {t.COMMON.STATUS.NOT_FOUND_TITLE}
          </Card.Title>
        </Card.Header>
        <Card.Description>
          {t.COMMON.STATUS.NOT_FOUND_MESSAGE}
        </Card.Description>
        <Card.Content className="w-full">
          <Link
            href={ROUTES.ADMIN.DASHBOARD}
            className={buttonVariants({ variant: "primary", fullWidth: true })}
          >

            {t.COMMON.STATUS.RETURN_HOME}
          </Link>
        </Card.Content>
      </Card>
    </main>
  );
}
