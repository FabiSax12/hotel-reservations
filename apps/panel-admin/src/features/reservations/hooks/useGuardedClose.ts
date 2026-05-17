"use client";

import { useEffect, useRef } from "react";

interface UseGuardedCloseProps {
  reservationId: string;
  hasPendingChanges: boolean;
  onRequestClose: () => void;
  onRegisterClose: (id: string, handler: () => void) => () => void;
  onPendingChangesChange?: (hasPending: boolean) => void;
  openUnsavedChangesModal: () => void;
}

export function useGuardedClose({
  reservationId,
  hasPendingChanges,
  onRequestClose,
  onRegisterClose,
  onPendingChangesChange,
  openUnsavedChangesModal,
}: UseGuardedCloseProps) {
  const guardedCloseRef = useRef<() => void>(() => {});
  guardedCloseRef.current = () => {
    if (hasPendingChanges) {
      openUnsavedChangesModal();
    } else {
      onRequestClose();
    }
  };

  useEffect(() => {
    const stableClose = () => guardedCloseRef.current();
    return onRegisterClose(reservationId, stableClose);
  }, [onRegisterClose, reservationId]);

  useEffect(() => {
    onPendingChangesChange?.(hasPendingChanges);
  }, [hasPendingChanges, onPendingChangesChange]);
}
