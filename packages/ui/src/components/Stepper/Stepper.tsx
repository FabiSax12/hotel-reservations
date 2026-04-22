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
          <svg 
            className={S.icon} 
            fill="none" 
            viewBox={S.icons.minus.viewBox} 
            stroke="currentColor" 
            strokeWidth={S.icons.minus.strokeWidth}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.minus.path} />
          </svg>
        </button>
        <span className={S.count}>{value}</span>
        <button 
          onClick={() => setter(value + 1)}
          className={`${S.btnBase} ${S.btnEnabled}`}
          type="button"
        >
          <svg 
            className={S.icon} 
            fill="none" 
            viewBox={S.icons.plus.viewBox} 
            stroke="currentColor" 
            strokeWidth={S.icons.plus.strokeWidth}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.plus.path} />
          </svg>
        </button>
      </div>
    </div>
  );
}
