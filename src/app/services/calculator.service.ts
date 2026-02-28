import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  divide(a: number, b: number): number {
    if (b === 0) {
      return 0;
    }
    return a / b;
  }
}