export function pickKeys<T>(obj: Record<string, T> | null): string[] {
  return Object.entries(obj ?? {}).map(([k]) => k);
}