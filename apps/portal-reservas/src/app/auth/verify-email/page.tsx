import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Verifica tu correo",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="mb-4 text-5xl" aria-hidden="true">
          ✉️
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">Revisa tu bandeja de entrada</h1>

        <p className="mb-6 text-sm text-gray-600">
          Te enviamos un enlace de verificación a tu correo. Revisa también la carpeta de spam.
        </p>

        <Link
          href={ROUTES.AUTH.LOGIN}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}
