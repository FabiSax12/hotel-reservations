"use client";

import { Check, Circle } from "lucide-react";
import { useI18n } from "@/locales";
import type { PasswordStrengthChecklistProps } from "./PasswordStrengthChecklist.interface";
import { PASSWORD_STRENGTH_CHECKLIST_STYLES as S } from "./PasswordStrengthChecklist.styles";

export const PasswordStrengthChecklist = ({ criteria }: PasswordStrengthChecklistProps) => {
  const { t } = useI18n();
  const { PASSWORD_CHECKLIST } = t.AUTH.ACTIVATE;

  const items = [
    { label: PASSWORD_CHECKLIST.MIN_LENGTH, met: criteria.minLength },
    { label: PASSWORD_CHECKLIST.HAS_UPPERCASE, met: criteria.hasUppercase },
    { label: PASSWORD_CHECKLIST.HAS_LOWERCASE, met: criteria.hasLowercase },
    { label: PASSWORD_CHECKLIST.HAS_DIGIT, met: criteria.hasDigit },
    { label: PASSWORD_CHECKLIST.HAS_SPECIAL_CHAR, met: criteria.hasSpecialChar },
  ];

  return (
    <ul className={S.list}>
      {items.map(({ label, met }) => (
        <li key={label} className={S.item(met)}>
          {met ? <Check size={12} className={S.icon} /> : <Circle size={12} className={S.icon} />}
          {label}
        </li>
      ))}
    </ul>
  );
};
