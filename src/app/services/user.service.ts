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
    const user = this.users?.find((u) => u.id === id);
    return user ?? null;
  }

  /**
   * Returns user ID, or null if not found.
   */
  getUserId(id: number): number | null {
    const user = this.users?.find((u) => u.id === id);
    return user?.id ?? null;
  }

  /**
   * Returns user email, or null if not found.
   */
  getUserEmail(id: number): string | null {
    const user = this.users?.find((u) => u.id === id);
    return user?.email ?? null;
  }
}