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
    const obj = JSON.parse(jsonStr); // BUG: throws on invalid JSON
    return obj.ids ?? [];
  }
}
