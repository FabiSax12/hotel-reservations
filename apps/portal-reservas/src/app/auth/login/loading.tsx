"use client";

import { Spinner } from "@heroui/react";
import { AUTH_STYLES as S, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";

export default function LoginLoading() {
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
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 w-full">
        <Spinner size="lg" className="text-white" aria-label="Cargando..." />
      </div>
    </main>
  );
}
