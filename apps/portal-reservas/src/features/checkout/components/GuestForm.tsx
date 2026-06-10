/**
 * @file GuestForm.tsx — Guest reservation details (no account required).
 *
 * Lays out the required fields (name, email, phone), an optional special
 * requests note and the terms acceptance. Maps stable validation codes to
 * localized error text; field state is owned by the parent hook.
 */

"use client";

import { useI18n } from "@/locales";
import { GUEST_ERROR_CODE, GUEST_FIELD_ID } from "../constants/checkout.constants";
import type { GuestErrorCode, GuestFormProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { GuestField } from "./GuestField";
import { TermsAcceptance } from "./TermsAcceptance";

export function GuestForm({ values, errors, setField }: GuestFormProps) {
  const { t } = useI18n();

  const errorText = (code: GuestErrorCode | undefined): string | undefined => {
    if (!code) return undefined;
    const messages: Record<GuestErrorCode, string> = {
      [GUEST_ERROR_CODE.NAME]: t.CHECKOUT.ERROR_NAME,
      [GUEST_ERROR_CODE.EMAIL]: t.CHECKOUT.ERROR_EMAIL,
      [GUEST_ERROR_CODE.PHONE]: t.CHECKOUT.ERROR_PHONE,
      [GUEST_ERROR_CODE.TERMS]: t.CHECKOUT.ERROR_TERMS,
    };
    return messages[code];
  };

  return (
    <div className={CHECKOUT_STYLES.formCard}>
      <header className={CHECKOUT_STYLES.formHead}>
        <h2 className={CHECKOUT_STYLES.formTitle}>{t.CHECKOUT.FORM_TITLE}</h2>
        <p className={CHECKOUT_STYLES.formSubtitle}>{t.CHECKOUT.FORM_SUBTITLE}</p>
      </header>

      <div className={CHECKOUT_STYLES.formGrid}>
        <GuestField
          id={GUEST_FIELD_ID.NAME}
          label={t.CHECKOUT.NAME_LABEL}
          placeholder={t.CHECKOUT.NAME_PLACEHOLDER}
          value={values.fullName}
          error={errorText(errors.fullName)}
          required
          fullWidth
          onChange={(value) => setField("fullName", value)}
        />
        <GuestField
          id={GUEST_FIELD_ID.EMAIL}
          type="email"
          label={t.CHECKOUT.EMAIL_LABEL}
          placeholder={t.CHECKOUT.EMAIL_PLACEHOLDER}
          value={values.email}
          error={errorText(errors.email)}
          required
          onChange={(value) => setField("email", value)}
        />
        <GuestField
          id={GUEST_FIELD_ID.PHONE}
          type="tel"
          label={t.CHECKOUT.PHONE_LABEL}
          placeholder={t.CHECKOUT.PHONE_PLACEHOLDER}
          value={values.phone}
          error={errorText(errors.phone)}
          required
          onChange={(value) => setField("phone", value)}
        />
        <GuestField
          id={GUEST_FIELD_ID.REQUESTS}
          label={t.CHECKOUT.REQUESTS_LABEL}
          placeholder={t.CHECKOUT.REQUESTS_PLACEHOLDER}
          value={values.specialRequests}
          multiline
          fullWidth
          onChange={(value) => setField("specialRequests", value)}
        />
        <TermsAcceptance
          checked={values.acceptedTerms}
          error={errorText(errors.acceptedTerms)}
          onChange={(value) => setField("acceptedTerms", value)}
        />
      </div>
    </div>
  );
}
