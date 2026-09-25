type MonthRangeValue = { from?: string | null; to?: string | null } | null | undefined;

// Reads a { from, to } pair of month numbers ("1"–"12") as stored by the
// Availability global. Returns null when either end is missing.
export function parseMonthRange(range: MonthRangeValue) {
  const from = Number(range?.from);
  const to = Number(range?.to);
  if (!from || !to) return null;
  return { from, to };
}
