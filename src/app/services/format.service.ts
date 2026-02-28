import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormatService {
  private emails: Record<number, string> = {
    1: 'alice@example.com',
    2: 'bob@example.com',
  };

  getUppercaseEmail(id: number): string {
    const email = this.emails[id];
    return email.toUpperCase();
  }
}
