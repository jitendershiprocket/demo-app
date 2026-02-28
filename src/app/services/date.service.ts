import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateService {
  private dates: Record<number, Date> = {
    1: new Date('2024-01-15'),
    2: new Date('2024-06-20'),
  };

  /** Bug: toISOString on undefined when key not found. */
  formatDateForKey(key: number): string {
    const d = this.dates[key];
    return d.toISOString(); // BUG: d can be undefined
  }
}
