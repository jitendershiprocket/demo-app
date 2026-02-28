export function validateRequired(value: string | null): boolean {
  return (value as string).trim().length > 0;
}
