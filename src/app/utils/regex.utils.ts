export function matchPattern(str: string, pattern: string): RegExpMatchArray | null {
  return str.match(new RegExp(pattern));
}
