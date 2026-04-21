import type { ActiveField } from "./date-range.types";

const parse = (s: string) => (s ? new Date(s + "T00:00:00").getTime() : 0);

export function handlePickDate(
  dayStr: string,
  state: { checkIn: string; checkOut: string; active: ActiveField },
  onChange: (ci: string, co: string) => void,
  triggerInvalid: (ds: string) => void,
): ActiveField {
  const { checkIn, checkOut, active } = state;

  const field: "checkIn" | "checkOut" =
    active === "checkIn" || active === "checkOut"
      ? active
      : !checkIn ? "checkIn" : "checkOut";

  // Toggle-off: clicking an already-selected date clears it
  if (dayStr === checkIn) { onChange("", checkOut); return "checkIn"; }
  if (dayStr === checkOut) { onChange(checkIn, ""); return !checkIn ? "checkIn" : "checkOut"; }

  const clicked = parse(dayStr);
  const inVal  = parse(checkIn);
  const outVal = parse(checkOut);

  // Both dates set — smart replace closest boundary
  if (checkIn && checkOut) {
    if (clicked < inVal) onChange(dayStr, checkOut);
    else if (clicked > outVal) onChange(checkIn, dayStr);
    else {
      const dIn  = clicked - inVal;
      const dOut = outVal - clicked;
      if (dIn <= dOut) onChange(dayStr, checkOut); else onChange(checkIn, dayStr);
    }
    return field;
  }

  // Direction validation — trigger shake animation if out of order
  if (field === "checkIn"  && checkOut && clicked > outVal) { triggerInvalid(dayStr); return field; }
  if (field === "checkOut" && checkIn  && clicked < inVal)  { triggerInvalid(dayStr); return field; }

  // Assign date and advance active field
  if (field === "checkIn") { onChange(dayStr, checkOut); return "checkOut"; }
  onChange(checkIn, dayStr);
  return !checkIn ? "checkIn" : "checkOut";
}
