export function formatPercent(value: number | null): string {
  return (value as number).toFixed(2) + '%';
}
