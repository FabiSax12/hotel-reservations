/**
 * @file useCheckoutSubmit.ts — Validates the form then hands off to the gateway.
 *
 * On submit: run validation, open a checkout session, and redirect the browser
 * to the gateway's hosted page. The redirect is a full-page navigation to an
 * external origin, so it uses window.location rather than the Next router.
 */

"use client";

import { useState } from "react";
import { CHECKOUT_ERROR_CODE } from "../constants/checkout.constants";
import type { GuestDetails, ReservationDraft, UseCheckoutSubmitReturn } from "../domain/types";
import { createCheckoutSession } from "../services/checkout.service";

export function useCheckoutSubmit(
  draft: ReservationDraft,
  guest: GuestDetails,
  validate: () => boolean,
): UseCheckoutSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const submit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setErrorKey(null);

    createCheckoutSession({
      roomIds: draft.rooms.map((room) => room.id),
      checkIn: draft.checkIn,
      checkOut: draft.checkOut,
      email: guest.email,
      guestName: guest.fullName,
      guestPhone: guest.phone,
      guests: draft.guests,
    })
      .then((result) => {
        // External origin (the gateway's hosted page): full-page redirect.
        window.location.assign(result.url);
      })
      .catch(() => {
        setErrorKey(CHECKOUT_ERROR_CODE.PAYMENT);
        setIsSubmitting(false);
      });
  };

  return { isSubmitting, errorKey, submit };
}
