import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  /** Bug: .includes on undefined when email is null. */
  isValidEmail(email: string | null): boolean {
    return (email as string).includes('@'); // BUG: email can be null at runtime
  }
}
