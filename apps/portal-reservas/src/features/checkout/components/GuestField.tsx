/**
 * @file GuestField.tsx — Labeled text input / textarea for the guest form.
 *
 * Handles the label, required marker, error wiring (aria-invalid + role=alert)
 * and the input vs textarea split, so GuestForm stays declarative.
 */

"use client";

import type { GuestFieldProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";

export function GuestField({
  id,
  label,
  value,
  type = "text",
  placeholder,
  error,
  multiline = false,
  required = false,
  fullWidth = false,
  onChange,
}: GuestFieldProps) {
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;

  return (
    <div className={`${CHECKOUT_STYLES.field} ${fullWidth ? CHECKOUT_STYLES.fieldFull : ""}`}>
      <label htmlFor={id} className={CHECKOUT_STYLES.fieldLabel}>
        {label}
        {required ? (
          <span className={CHECKOUT_STYLES.fieldRequired} aria-hidden="true">
            {" *"}
          </span>
        ) : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          className={CHECKOUT_STYLES.fieldTextarea(Boolean(error))}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={CHECKOUT_STYLES.fieldControl(Boolean(error))}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      )}

      {error ? (
        <span id={errorId} className={CHECKOUT_STYLES.fieldError} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
