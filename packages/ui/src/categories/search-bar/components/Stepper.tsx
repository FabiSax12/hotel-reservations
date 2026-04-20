/**
 * @file Stepper.tsx — Reusable numeric increment/decrement control.
 *
 * Used inside the GuestsPopover for Adults, Children, and Pets.
 * Renders a row with a label on the left and ‒ / count / + controls on
 * the right. The decrement button auto-disables when the value reaches
 * the `min` floor.
 */

"use client";

import { STEPPER_STYLES as S } from "../theme/guests.theme";

interface StepperProps {
  /** Primary label (e.g. "Adultos"). */
  title: string;
  /** Secondary hint (e.g. "Edad 13 o superior"). */
  subtitle: string;
  /** Current numeric value. */
  value: number;
  /** Setter to update the value. */
  setter: (v: number) => void;
  /** Minimum allowed value (defaults to 0). */
  min?: number;
}

export function Stepper({ title, subtitle, value, setter, min = 0 }: StepperProps) {
  return (
    <div className={S.row}>
      <div>
        <div className={S.titleText}>{title}</div>
        <div className={S.subtitleText}>{subtitle}</div>
      </div>
      <div className={S.controls}>
        {/* Decrement — disabled at the min floor */}
        <button 
          onClick={() => setter(Math.max(min, value - 1))}
          className={`${S.btnBase} ${value <= min ? S.btnDisabled : S.btnEnabled}`}
        >
          <svg className={S.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
        </button>
        <span className={S.count}>{value}</span>
        {/* Increment — always enabled */}
        <button 
          onClick={() => setter(value + 1)}
          className={`${S.btnBase} ${S.btnEnabled}`}
        >
          <svg className={S.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
    </div>
  );
}
