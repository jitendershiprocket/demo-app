import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MathService {
  /** Bug: factorial(-1) causes stack overflow - no guard for negative. */
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1); // BUG: negative n never hits base case
  }
}
