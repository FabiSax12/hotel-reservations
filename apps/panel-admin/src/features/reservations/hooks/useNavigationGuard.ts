"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface UseNavigationGuardProps {
  listPath: string;
}

export function useNavigationGuard({ listPath }: UseNavigationGuardProps) {
  const router = useRouter();
  const guardedBackRef = useRef<() => void>(() => router.push(listPath));
  const hasPendingRef = useRef(false);

  const onRegisterClose = useCallback(
    (_id: string, handler: () => void) => {
      guardedBackRef.current = handler;
      return () => {
        guardedBackRef.current = () => router.push(listPath);
      };
    },
    [listPath, router],
  );

  const onRequestClose = useCallback(() => {
    router.push(listPath);
  }, [listPath, router]);

  const handleBack = useCallback(() => {
    guardedBackRef.current();
  }, []);

  const onPendingChangesChange = useCallback((hasPending: boolean) => {
    hasPendingRef.current = hasPending;
  }, []);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      if (!hasPendingRef.current) return;
      const anchor = (e.target as Element).closest("a[href]");
      if (!anchor) return;
      e.preventDefault();
      e.stopPropagation();
      guardedBackRef.current();
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasPendingRef.current) e.preventDefault();
    };

    document.addEventListener("click", handleLinkClick, true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { onRegisterClose, onRequestClose, handleBack, onPendingChangesChange };
}
