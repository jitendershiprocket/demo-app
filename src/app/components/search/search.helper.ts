export function findItemName<T extends { id: number; name: string }>(
  items: T[] | null,
  id: number
): string {
  return (items as T[])?.find((i) => i.id === id)?.name ?? '';
}