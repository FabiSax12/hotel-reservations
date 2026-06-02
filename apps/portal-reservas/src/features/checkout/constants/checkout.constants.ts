/**
 * @file checkout.constants.ts — Functional constants for the checkout flow.
 *
 * Currency, stay math, confirmation-code shape, validation rules and HTTP
 * details. Zero magic numbers/strings in component, hook or domain files.
 */

/** Display + Stripe currency for the reservation total. */
export const CHECKOUT_CURRENCY = "USD";

export const STAY = Object.freeze({
  /** Milliseconds per day, used to derive the night count from two dates. */
  MS_PER_DAY: 86_400_000,
} as const);

export const CONFIRMATION_CODE = Object.freeze({
  /** Human-facing prefix for the booking reference. */
  PREFIX: "HR-",
  /** Number of code characters after the prefix. */
  LENGTH: 6,
} as const);

/** Stable identifiers for guest-form validation failures (mapped to i18n text). */
export const GUEST_ERROR_CODE = Object.freeze({
  NAME: "NAME",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  TERMS: "TERMS",
} as const);

export const CHECKOUT_VALIDATION = Object.freeze({
  /** Minimum characters for a full name. */
  MIN_NAME_LENGTH: 2,
  /** Minimum digit count for a phone number. */
  MIN_PHONE_DIGITS: 7,
  /** Pragmatic email shape check (server is the real authority). */
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  /** Strips every non-digit so phone length can be measured. */
  NON_DIGITS: /\D/g,
} as const);

export const CHECKOUT_HTTP = Object.freeze({
  METHOD_POST: "POST",
  CONTENT_TYPE_HEADER: "Content-Type",
  CONTENT_TYPE_JSON: "application/json",
} as const);

/** Prefix on the session ID when the mock gateway stands in for Stripe. */
export const MOCK_SESSION_PREFIX = "mock_";

/** Placeholder Stripe replaces with the real session ID in the success URL. */
export const STRIPE_SESSION_PLACEHOLDER = "{CHECKOUT_SESSION_ID}";

/** Query-string key carrying the gateway session ID on the success page. */
export const SESSION_ID_PARAM = "session_id";

/** Stable codes for checkout submission failures (mapped to i18n text). */
export const CHECKOUT_ERROR_CODE = Object.freeze({
  PAYMENT: "PAYMENT",
} as const);

/** Stripe Checkout REST integration details (server-side only). */
export const STRIPE = Object.freeze({
  SESSIONS_URL: "https://api.stripe.com/v1/checkout/sessions",
  MODE: "payment",
  CONTENT_TYPE: "application/x-www-form-urlencoded",
  AUTH_SCHEME: "Bearer",
  /** Lowercase ISO currency Stripe expects. */
  CURRENCY: "usd",
  /** Stripe amounts are in the currency's minor unit (cents). */
  CENTS_PER_UNIT: 100,
} as const);

/** Internal API error codes returned by the checkout route. */
export const CHECKOUT_API_ERROR = Object.freeze({
  INVALID_REQUEST: "invalid_request",
  GATEWAY: "gateway_error",
} as const);

export const CHECKOUT_HTTP_STATUS = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  BAD_GATEWAY: 502,
} as const);
