import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringService {
  /** Bug: split on null when str is null. */
  reverse(str: string | null): string {
    return (str as string).split('').reverse().join(''); // BUG: str can be null at runtime
  }
}
