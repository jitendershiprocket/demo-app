import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  private emails: Record<number, string> = {
    1: 'alice@example.com',
    2: 'bob@example.com',
  };

  /**
   * Bug: Accessing .toUpperCase() on undefined when id not found.
   * Triggers: getUppercaseEmail(999) → TypeError: Cannot read properties of undefined (reading 'toUpperCase')
   */
  getUppercaseEmail(id: number): string {
    const email = this.emails[id];
    return email?.toUpperCase() ?? '';
  }
}