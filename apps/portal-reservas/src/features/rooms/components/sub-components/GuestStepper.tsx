/**
 * @file GuestStepper.tsx — Reusable stepper for guest count (adults/children).
 */

import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";

interface GuestStepperProps {
  label: string;
  subtitle: string;
  value: number;
  min: number;
  onDecrement: () => void;
  onIncrement: () => void;
  decrementLabel: string;
  incrementLabel: string;
}

export function GuestStepper({
  label, subtitle, value, min,
  onDecrement, onIncrement,
  decrementLabel, incrementLabel,
}: GuestStepperProps) {
  return (
    <div className={S.guestRow}>
      <div>
        <p className={S.guestLabel}>{label}</p>
        <p className={S.guestSub}>{subtitle}</p>
      </div>
      <div className={S.guestStepper}>
        <button type="button" className={S.guestStepBtn}
          onClick={onDecrement} disabled={value <= min} aria-label={decrementLabel}>
          −
        </button>
        <span className={S.guestCount} aria-live="polite">{value}</span>
        <button type="button" className={S.guestStepBtn}
          onClick={onIncrement} aria-label={incrementLabel}>
          +
        </button>
      </div>
    </div>
  );
}
