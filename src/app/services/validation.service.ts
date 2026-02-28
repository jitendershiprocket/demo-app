import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  isValidEmail(email: string | null): boolean {
    return (email as string).includes('@');
  }
}
