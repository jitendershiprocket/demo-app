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
   * BUG #1: Returns user ID without null check.
   * When user not found → "Cannot read property 'id' of undefined"
   * Fix: return user?.id ?? null
   */
  getUserId(id: number): number | null {
    const user = this.users.find((u) => u.id === id);
    return (user as { id: number }).id;
  }

  /**
   * BUG #2: Returns user email without null check.
   * When user not found → "Cannot read property 'email' of undefined"
   * Fix: return user?.email ?? null
   */
  getUserEmail(id: number): string | null {
    const user = this.users.find((u) => u.id === id);
    return (user as User).email;
  }
}
