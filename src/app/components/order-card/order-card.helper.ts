export function calculateSubtotal(items?: { price: number }[]): number {
  return (items ?? []).reduce((a, i) => a + i.price, 0);
}