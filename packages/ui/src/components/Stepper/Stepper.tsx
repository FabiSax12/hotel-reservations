/**
 * @file Stepper.tsx — Reusable numeric increment/decrement control.
 */

"use client";

import { STEPPER_STYLES as S } from "./Stepper.theme";

interface StepperProps {
  title: string;
  subtitle: string;
  value: number;
  setter: (v: number) => void;
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
        <button 
          onClick={() => setter(Math.max(min, value - 1))}
          className={`${S.btnBase} ${value <= min ? S.btnDisabled : S.btnEnabled}`}
          type="button"
        >
          <svg className={S.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
        </button>
        <span className={S.count}>{value}</span>
        <button 
          onClick={() => setter(value + 1)}
          className={`${S.btnBase} ${S.btnEnabled}`}
          type="button"
        >
          <svg className={S.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
    </div>
  );
}
