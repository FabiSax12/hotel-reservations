export function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getStartOfMonthIso(): string {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

export function isInRange(dateIso: string, start: string, end: string): boolean {
  return dateIso >= start && dateIso <= end;
}

export function getISOWeek(dateIso: string): number {
  const d = new Date(dateIso);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const jan4 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - jan4.getTime()) / 86_400_000 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
