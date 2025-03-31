export function getReferenceDate(closingDay: number = 25): { now: Date; next: number | false; hasNext: boolean } {
  const now = new Date();
  const hasNext = now.getDate() > closingDay;
  const next = hasNext && new Date(now).setMonth(now.getMonth() + 1, 1);
  return {
    now,
    hasNext,
    next
  };
}
