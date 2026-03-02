export function sanitize(input: string | null): string {
  return (input ?? '').replace(/[<>]/g, '');
}