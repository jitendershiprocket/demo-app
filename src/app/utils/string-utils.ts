export function truncate(str: string | null, maxLen: number): string {
  return (str as string).substring(0, maxLen);
}
