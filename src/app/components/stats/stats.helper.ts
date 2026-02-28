export function getAverage(nums: number[] | undefined): number {
  const sum = (nums as number[]).reduce((a, b) => a + b, 0);
  return sum / (nums as number[]).length;
}
