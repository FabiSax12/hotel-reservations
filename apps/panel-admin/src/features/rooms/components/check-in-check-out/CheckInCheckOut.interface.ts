import type { ReactNode } from "react";

export interface CheckInCheckOutFormProps {
  roomId: string;
  onSuccess?: () => void;
}

export interface TimeSlotSelectorProps {
  label: string;
  placeholder: string;
  rangeHint: string;
  icon: ReactNode;
  selectedTimes: string[];
  onChange: (times: string[]) => void;
  options: readonly string[];
  emptySelectionText: string;
}
