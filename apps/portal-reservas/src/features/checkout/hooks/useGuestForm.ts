/**
 * @file useGuestForm.ts — Guest form state + validation.
 *
 * Holds the field values and the current validation errors. Editing a field
 * clears its error; `validate` recomputes the full error set and reports
 * whether the form may proceed to payment.
 */

"use client";

import { useState } from "react";
import { validateGuestDetails } from "../domain/guestValidation";
import type { GuestDetails, GuestFormErrors, UseGuestFormReturn } from "../domain/types";

const EMPTY_GUEST: GuestDetails = {
  fullName: "",
  email: "",
  phone: "",
  specialRequests: "",
  acceptedTerms: false,
};

export function useGuestForm(): UseGuestFormReturn {
  const [values, setValues] = useState<GuestDetails>(EMPTY_GUEST);
  const [errors, setErrors] = useState<GuestFormErrors>({});

  const setField = (field: keyof GuestDetails, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field as keyof GuestFormErrors];
      return next;
    });
  };

  const validate = (): boolean => {
    const nextErrors = validateGuestDetails(values);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return { values, errors, setField, validate };
}
