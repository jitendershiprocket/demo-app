export function formatDate(d: Date | undefined): string {
  return (d as Date).toISOString();
}
