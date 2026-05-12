/**
 * @file GuestStepper.tsx — Reusable stepper for guest count (adults/children).
 *
 * Delegates to the shared @hotel/ui Stepper component, wrapping it with
 * the rooms feature theme styles.
 */

import { Stepper } from "@hotel/ui";
import type { GuestStepperProps } from "../../domain/types";

export function GuestStepper({
  label, subtitle, value, min,
  onDecrement, onIncrement,
  decrementLabel, incrementLabel,
}: GuestStepperProps) {
  return (
    <Stepper
      title={label}
      subtitle={subtitle}
      value={value}
      setter={(v: number) => {
        if (v < min) return;
        if (v < value) onDecrement();
        else onIncrement();
      }}
      min={min}
    />
  );
}
