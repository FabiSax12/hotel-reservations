/**
 * @file checkout.service.ts — Client call to open a payment-gateway session.
 *
 * Posts the reservation (room IDs + dates + email) to the checkout route, which
 * creates the Stripe Checkout Session server-side. Validates the response and
 * throws on failure (architecture-context.md §10).
 */

import { ROUTES } from "@/config/routes";
import { CHECKOUT_HTTP } from "../constants/checkout.constants";
import type { CheckoutSessionPayload, CheckoutSessionResult } from "../domain/types";

export async function createCheckoutSession(
  payload: CheckoutSessionPayload,
): Promise<CheckoutSessionResult> {
  const response = await fetch(ROUTES.API.CHECKOUT, {
    method: CHECKOUT_HTTP.METHOD_POST,
    headers: { [CHECKOUT_HTTP.CONTENT_TYPE_HEADER]: CHECKOUT_HTTP.CONTENT_TYPE_JSON },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Checkout session request failed with status ${response.status}`);
  }

  return (await response.json()) as CheckoutSessionResult;
}
