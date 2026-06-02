/**
 * @file TermsAcceptance.tsx — Accept-terms checkbox with expandable mock terms.
 *
 * The (demo) terms text is revealed inline via a disclosure toggle rather than
 * a modal. Validation errors are announced with role=alert.
 */

"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import { TERMS_FIELD } from "../constants/checkout.constants";
import type { TermsAcceptanceProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";

export function TermsAcceptance({ checked, error, onChange }: TermsAcceptanceProps) {
  const { t } = useI18n();
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className={CHECKOUT_STYLES.terms}>
      <div className={CHECKOUT_STYLES.termsRow}>
        <input
          id={TERMS_FIELD.CHECKBOX_ID}
          type="checkbox"
          className={CHECKOUT_STYLES.termsCheckbox}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? TERMS_FIELD.ERROR_ID : undefined}
        />
        <label htmlFor={TERMS_FIELD.CHECKBOX_ID} className={CHECKOUT_STYLES.termsLabel}>
          {t.CHECKOUT.TERMS_PREFIX}
          {t.CHECKOUT.TERMS_LINK}
        </label>
      </div>

      <button
        type="button"
        className={CHECKOUT_STYLES.termsToggle}
        onClick={() => setShowTerms((open) => !open)}
        aria-expanded={showTerms}
      >
        {showTerms ? t.CHECKOUT.TERMS_TOGGLE_HIDE : t.CHECKOUT.TERMS_TOGGLE_SHOW}
      </button>

      {showTerms ? <p className={CHECKOUT_STYLES.termsBody}>{t.CHECKOUT.TERMS_BODY}</p> : null}

      {error ? (
        <span id={TERMS_FIELD.ERROR_ID} className={CHECKOUT_STYLES.fieldError} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
