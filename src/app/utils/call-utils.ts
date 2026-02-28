export function safeInvoke<T>(fn: (() => T) | undefined): T | undefined {
  if (typeof fn === 'function') {
    return fn();
  }
  return undefined;
}