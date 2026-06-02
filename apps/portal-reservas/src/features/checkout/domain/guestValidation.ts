/**
 * @file guestValidation.ts — Pure validation for the guest reservation form.
 *
 * Returns stable error codes per field; the UI maps each code to localized
 * text. No React, no side effects.
 */

import { CHECKOUT_VALIDATION, GUEST_ERROR_CODE } from "../constants/checkout.constants";
import type { GuestDetails, GuestFormErrors } from "./types";

export function validateGuestDetails(values: GuestDetails): GuestFormErrors {
  const errors: GuestFormErrors = {};

  if (values.fullName.trim().length < CHECKOUT_VALIDATION.MIN_NAME_LENGTH) {
    errors.fullName = GUEST_ERROR_CODE.NAME;
  }
  if (!CHECKOUT_VALIDATION.EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = GUEST_ERROR_CODE.EMAIL;
  }
  const digitCount = values.phone.replace(CHECKOUT_VALIDATION.NON_DIGITS, "").length;
  if (digitCount < CHECKOUT_VALIDATION.MIN_PHONE_DIGITS) {
    errors.phone = GUEST_ERROR_CODE.PHONE;
  }
  if (!values.acceptedTerms) {
    errors.acceptedTerms = GUEST_ERROR_CODE.TERMS;
  }

  return errors;
}
