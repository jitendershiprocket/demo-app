export function toPrecisionSafe(n: number, precision: number): string {
  const safePrecision = Math.max(1, Math.min(100, Math.round(precision)));
  return n.toPrecision(safePrecision);
}