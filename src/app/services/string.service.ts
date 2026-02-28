import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringService {
  reverse(str: string | null): string {
    return (str as string).split('').reverse().join('');
  }
}
