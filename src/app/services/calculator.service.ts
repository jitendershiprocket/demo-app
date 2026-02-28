import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  /**
   * Bug: Division by zero - no guard. When b=0, a/b gives Infinity.
   * We use toFixed which on Infinity returns "Infinity", but if we do
   * string ops that assume a number - let's throw explicitly for demo.
   * Actually JS 1/0 = Infinity (no throw). So we explicitly throw for demo.
   */
  divide(a: number, b: number): number {
    const result = a / b;
    if (!Number.isFinite(result)) {
      throw new Error('Division by zero');
    }
    return result;
  }
}
