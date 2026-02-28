export function firstId<T extends { id: number }>(arr: T[]): number {
  return arr[0]?.id;
}