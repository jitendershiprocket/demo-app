export function sanitize(input: string | null): string {
  return (input as string).replace(/[<>]/g, '');
}
