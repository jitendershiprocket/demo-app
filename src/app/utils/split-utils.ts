export function splitBy(str: string | null, delim: string): string[] {
  return str ? str.split(delim) : [];
}