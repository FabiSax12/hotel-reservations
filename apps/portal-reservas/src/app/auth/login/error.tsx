"use client";

import { useEffect } from "react";
import { AUTH_STYLES as S, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { Button } from "@heroui/react";

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={S.main}>
      <div className={S.background}>
        <div 
          className={S.bgImage} 
          style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }} 
        />
        <div className={S.bgOverlay} />
        <div className={S.bgGradient} />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 w-full px-4 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">¡Ups! Algo salió mal.</h2>
        <p className="text-white/70 mb-8">{error.message || "Ocurrió un error inesperado al cargar la página de inicio de sesión."}</p>
        <Button
          onPress={() => reset()}
          className="font-medium bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Intentar de nuevo
        </Button>
      </div>
    </main>
  );
}
