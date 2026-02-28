import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  /**
   * Bug: Accesses user.id when user is undefined (id not found).
   * Triggers: getUserId(999) → TypeError: Cannot read properties of undefined (reading 'id')
   */
  getUserId(id: number): number | null {
    const user = this.users?.find((u) => u.id === id);
    return user!.id ?? null; // BUG: user can be undefined
  }
}