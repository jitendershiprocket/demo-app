export function matchPattern(str: string, pattern: string): RegExpMatchArray | null {
  try {
    return str.match(new RegExp(pattern));
  } catch {
    return null;
  }
}