"use client";

import { Button } from "@heroui/react";
import { ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <ShieldX className="size-16 text-danger" />
      <h1 className="text-4xl font-bold text-default-900">403</h1>
      <h2 className="text-xl font-semibold text-default-700">Acceso Restringido</h2>
      <p className="text-center text-default-500">No tienes permiso para acceder a esta sección.</p>
      <Button
        variant="danger-soft"
        onPress={() => router.push(ROUTES.ADMIN.DASHBOARD)}
        className="mt-4"
      >
        Volver al Dashboard
      </Button>
    </main>
  );
}
