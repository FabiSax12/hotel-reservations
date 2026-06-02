# Checkout Feature Spec (US-DM-06)

## Status & Version

Completed — Phase 1 / US-DM-06 ("Confirmar reserva y flujo de pago"). Mock data; the
room source and payment key are environment-driven and ready to swap for real backends.

## Objective

Let a guest (no account required) review their reservation, provide the personal data
needed to book, and be redirected to a real payment gateway (Stripe, test mode) to pay
securely. The platform never stores card data: payment details are entered only on the
gateway's hosted page.

## Scope & Boundaries

### In scope

- A confirmation page (`/reservar`) showing the same information as the US-DM-05 detail
  panel, but expanded: larger type, more space, per-room check-in/out times and location.
- Efficient rendering of both single rooms and room packages.
- A guest details form (name, email, phone, optional special requests, accept terms).
- Payment hand-off to Stripe Checkout (hosted redirect) via REST, with a mock-gateway
  fallback when no key is configured.
- A post-payment success screen (`/reservar/exito`) with a confirmation code.

### Out of scope (Do Not Modify)

- Anything outside `apps/portal-reservas` and the UI packages.
- A "mis reservas" history page (no reservation is persisted — guest flow, and that page
  does not exist yet).
- The room-availability and grouping logic (reused as-is from the rooms feature).

## Architecture & Context

### Data flow

`Reserve CTA` (rooms / room-detail) → `buildReservationHref` (global `lib/reservationUrl`)
→ `/reservar?rooms=…&checkIn=…&checkOut=…&guests=…` → `page.tsx` parses params
(`parseReservationParams`), resolves rooms (`findRoomsByIds`), builds a `ReservationDraft`
→ `ConfirmationView`. On submit: `useCheckoutSubmit` → `POST /api/checkout` →
`openGatewaySession` (server) → Stripe Checkout Session → browser redirect to the hosted
page → `success_url` → `/reservar/exito` → `SuccessView`.

### Core files

- `components/` — `ConfirmationView` (orchestrator), `ReservationSummary`, `SummaryRoomCard`,
  `StayMeta`, `PriceBreakdown`, `GuestForm`, `GuestField`, `TermsAcceptance`,
  `ProceedToPayment`, `SuccessView`, `CheckoutHeader`, `CheckoutIcon`.
- `hooks/` — `useGuestForm`, `useCheckoutSubmit`.
- `services/` — `checkout.service` (client → API), `gateway.server` (server → Stripe).
- `domain/` — `reservation` (nights/total/code), `guestValidation`, `format`, `stripe`, `types`.
- `constants/`, `i18n/`, `theme/`.
- App routes: `app/reservar/{page,loading,error}`, `app/reservar/exito/page`, `app/api/checkout/route`.

### System constraints & known pitfalls

- `STRIPE_SECRET_KEY` is server-only (`.env.local`, gitignored). Empty ⇒ mock gateway.
- Card data is collected only by Stripe's hosted page; the app stores nothing.
- The payment redirect is to an external origin, so it uses `window.location`, not the router.
- Currency is USD; per-room check-in/out times live in the room mock data.

## Acceptance Criteria

- [x] Pressing reserve (room, package, or detail panel) proceeds to confirmation + payment.
- [x] The confirmation page shows each room's panel information, expanded, with check-in /
      check-out times and location.
- [x] Payment happens after the user confirms the reservation and provides their details.
- [x] No account is required to book.
- [x] All reservation data is collected in-app; all payment/bank data is collected by the
      payment API, so the platform stores no banking information.
- [x] Both single rooms and packages render clearly and efficiently.
- [x] Nothing is added to "mis reservas" (no persistence; out of scope).

## Handoff & Status Notes

### Current state

Flow complete end-to-end against Stripe test mode. With no key, the mock gateway jumps
straight to the success screen so the branch builds and demos without credentials.

### Next step

Swap the mock room source for the real reservation API and persist the booking once the
"mis reservas" feature and authenticated booking exist.
