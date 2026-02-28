import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  /**
   * Bug: JSON.parse on invalid input - no try/catch.
   * Triggers: parseIds('{invalid}') → SyntaxError: Unexpected token
   */
  parseIds(jsonStr: string): number[] {
    try {
      const obj = JSON.parse(jsonStr);
      return obj.ids ?? [];
    } catch {
      return [];
    }
  }
}