import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MathService {
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}
