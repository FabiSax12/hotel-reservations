/**
 * @file stripe.ts — Builds Stripe Checkout Session form parameters.
 *
 * Pure: maps the reservation rooms to Stripe `line_items` (nightly price as the
 * unit amount in cents, nights as the quantity) plus the redirect URLs. The
 * route handler performs the actual network call.
 */

import { STRIPE } from "../constants/checkout.constants";
import type { StripeCheckoutInput } from "./types";

export function buildStripeCheckoutParams(input: StripeCheckoutInput): URLSearchParams {
  const params = new URLSearchParams();
  params.set("mode", STRIPE.MODE);
  params.set("success_url", input.successUrl);
  params.set("cancel_url", input.cancelUrl);
  if (input.email) {
    params.set("customer_email", input.email);
  }

  input.rooms.forEach((room, index) => {
    const item = `line_items[${index}]`;
    params.set(`${item}[quantity]`, String(input.nights));
    params.set(`${item}[price_data][currency]`, STRIPE.CURRENCY);
    params.set(`${item}[price_data][unit_amount]`, String(room.price * STRIPE.CENTS_PER_UNIT));
    params.set(`${item}[price_data][product_data][name]`, room.title);
  });

  return params;
}
