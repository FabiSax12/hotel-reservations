/**
 * @file useSearchValidation.ts — Hook for managing search bar validation state.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import type { ValidationError } from "../domain/types";
import { TIMEOUTS } from "../constants/search.constants";
import { REGIONS_CONFIG } from "../constants/regionsMock";
import { parseDateHelper } from "@hotel/ui";
import { useI18n } from "@/locales";

export function useSearchValidation() {
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.VALIDATION;

  const errorDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (errorDismissRef.current) clearTimeout(errorDismissRef.current);
      if (shakeResetRef.current) clearTimeout(shakeResetRef.current);
    };
  }, []);

  const clearError = useCallback(() => {
    if (errorDismissRef.current) clearTimeout(errorDismissRef.current);
    setValidationError(null);
  }, []);

  const showError = useCallback((error: ValidationError) => {
    if (errorDismissRef.current) clearTimeout(errorDismissRef.current);
    if (shakeResetRef.current) clearTimeout(shakeResetRef.current);

    setValidationError(error);
    setIsShaking(true);

    shakeResetRef.current = setTimeout(() => setIsShaking(false), TIMEOUTS.SHAKE_RESET);
    errorDismissRef.current = setTimeout(() => setValidationError(null), TIMEOUTS.ERROR_DISMISS);
  }, []);

  const validateSearch = useCallback(
    (
      destination: string,
      checkIn: string,
      checkOut: string,
      onlyOneSede: string | null,
    ): boolean => {
      const missingIn = !checkIn;
      const missingOut = !checkOut;

      // 1. Destination validation
      if (!onlyOneSede && (!destination || !REGIONS_CONFIG.some((r) => r.name === destination))) {
        showError({
          message: C.MISSING_SEDE,
          fields: ["where"],
        });
        return false;
      }

      // 2. Dates presence validation
      if (missingIn && missingOut) {
        showError({ message: C.MISSING_BOTH_DATES, fields: ["checkIn", "checkOut"] });
        return false;
      }
      if (missingIn) {
        showError({ message: C.MISSING_CHECK_IN, fields: ["checkIn"] });
        return false;
      }
      if (missingOut) {
        showError({ message: C.MISSING_CHECK_OUT, fields: ["checkOut"] });
        return false;
      }

      // 3. Date range logic validation
      if (parseDateHelper(checkIn) >= parseDateHelper(checkOut)) {
        showError({ message: C.INVALID_DATE_RANGE, fields: ["checkIn", "checkOut"] });
        return false;
      }

      return true;
    },
    [showError, C],
  );

  const fieldHasError = useCallback(
    (key: string): boolean => validationError?.fields.includes(key as any) ?? false,
    [validationError],
  );

  return {
    validationError,
    isShaking,
    showError,
    clearError,
    validateSearch,
    fieldHasError,
  };
}

