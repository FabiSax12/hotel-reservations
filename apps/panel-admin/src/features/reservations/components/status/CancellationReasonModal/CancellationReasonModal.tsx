"use client";

import { Label, TextArea, TextField } from "@heroui/react";
import { useI18n } from "@/locales";
import { CANCELLATION_REASON_MAX_LENGTH } from "../../../constants/status-management";
import type { CancellationReasonFieldProps } from "./CancellationReasonModal.interface";
import { CANCELLATION_REASON_FIELD_STYLES as S } from "./CancellationReasonModal.styles";

export const CancellationReasonField = ({
  reason,
  isReadOnly,
  onChange,
}: CancellationReasonFieldProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.CANCELLATION_MODAL;

  const counterClassName =
    reason.length >= CANCELLATION_REASON_MAX_LENGTH ? S.counterAtLimit : S.counter;

  return (
    <div className={S.wrapper}>
      <TextField
        value={reason}
        onChange={onChange}
        isReadOnly={isReadOnly}
        fullWidth
        variant="secondary"
      >
        <Label>{texts.TEXTAREA_LABEL}</Label>
        <TextArea
          className={S.textArea}
          placeholder={isReadOnly ? undefined : texts.TEXTAREA_PLACEHOLDER}
          maxLength={CANCELLATION_REASON_MAX_LENGTH}
          rows={2}
        />
      </TextField>
      {!isReadOnly && (
        <p className={counterClassName}>
          {reason.length}/{CANCELLATION_REASON_MAX_LENGTH} {texts.CHAR_COUNTER_LABEL}
        </p>
      )}
    </div>
  );
};
