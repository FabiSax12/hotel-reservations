"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface UseNavigationGuardProps {
  listPath: string;
}

export function useNavigationGuard({ listPath }: UseNavigationGuardProps) {
  const router = useRouter();
  const guardedBackRef = useRef<() => void>(() => router.push(listPath));
  const hasPendingRef = useRef(false);

  const onRegisterClose = useCallback((_id: string, handler: () => void) => {
    guardedBackRef.current = handler;
    return () => {
      guardedBackRef.current = () => router.push(listPath);
    };
  }, [listPath, router]);

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
    const originalPushState = window.history.pushState.bind(window.history);

    window.history.pushState = (...args) => {
      if (hasPendingRef.current) {
        setTimeout(() => guardedBackRef.current(), 0);
        return;
      }
      originalPushState(...args);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasPendingRef.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.history.pushState = originalPushState;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { onRegisterClose, onRequestClose, handleBack, onPendingChangesChange };
}
