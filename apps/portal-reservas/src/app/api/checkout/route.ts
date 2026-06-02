/**
 * @file route.ts — POST /api/checkout — opens a payment-gateway session.
 *
 * Thin handler: parses the reservation payload and delegates to the checkout
 * feature's server gateway service, which creates the Stripe Checkout Session
 * (or a mock URL when no key is set) and returns the URL to redirect to.
 */

import type { CheckoutSessionPayload } from "@/features/checkout";
import { openGatewaySession } from "@/features/checkout";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as CheckoutSessionPayload;
  const result = await openGatewaySession(payload);
  return Response.json(result.body, { status: result.status });
}
