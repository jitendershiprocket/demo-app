export function safeInvoke<T>(fn: (() => T) | undefined): T {
  return (fn as () => T)();
}
