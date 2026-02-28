import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateService {
  private dates: Record<number, Date> = {
    1: new Date('2024-01-15'),
    2: new Date('2024-06-20'),
  };

  formatDateForKey(key: number): string {
    const d = this.dates[key];
    return d.toISOString();
  }
}
