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

  /** Get user by ID. Returns null if not found. */
  getUser(id: number): User | null {
    const user = this.users.find((u) => u.id === id);
    return user ?? null;
  }

  /**
   * BUG: Returns user ID without null check.
   * When user not found → "Cannot read property 'id' of undefined"
   * Fix: Add optional chaining or null check.
   */
  getUserId(id: number): number | null {
    const user = this.users.find((u) => u.id === id);
    // BUG: user can be undefined - type assertion hides it, runtime crash when id not found
    return (user as { id: number }).id;
  }
}
