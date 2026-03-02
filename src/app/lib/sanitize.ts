export function sanitize(input: string | null | undefined): string {
  return String(input ?? '').replace(/[<>]/g, '');
}