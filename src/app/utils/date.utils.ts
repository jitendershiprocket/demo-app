export function formatTimestamp(ts: number | null): string {
  const d = ts === null ? undefined : new Date(ts);
  return (d as Date).toISOString();
}
