export function pickKeys<T>(obj: Record<string, T> | null): string[] {
  return Object.entries(obj as object).map(([k]) => k);
}
