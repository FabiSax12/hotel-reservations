import { forbidden } from "next/navigation";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default async function DashboardPage() {
  try {
    await requirePermission(PERMISSIONS.DASHBOARD.VIEW);

    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Bienvenido al Panel de Administración
        </h1>
        <p className="mt-2 text-gray-500">
          Inicio de sesión exitoso. Esta página se expandirá en PB-03 / PB-05.
        </p>
      </main>
    );
  } catch (error) {
    if (error instanceof AuthenticationRequiredError || error instanceof PermissionDeniedError) {
      forbidden();
    }

    throw error;
  }
}
