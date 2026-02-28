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
   * Bug #1: Returns user ID. CRASH when user not found - accesses user.id on undefined.
   */
  getUserId(id: number): number | null {
    const user = this.users?.find((u) => u.id === id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- intentional bug for Phoenix demo
    return user!.id ?? null;
  }

  /**
   * Bug #2: Returns user email. CRASH when user not found - accesses user.email on undefined.
   */
  getUserEmail(id: number): string | null {
    const user = this.users?.find((u) => u.id === id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- intentional bug for Phoenix demo
    return user!.email ?? null;
  }

  /**
   * Bug #3: Returns name of nth user. CRASH when index out of bounds - accesses users[n].name on undefined.
   */
  getNthUserName(index: number): string {
    return this.users[index].name;
  }

  /**
   * Bug #4: Returns domain part of user email. CRASH when user not found - accesses null.email.
   */
  getDomainFromEmail(id: number): string {
    const user = this.getUser(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- intentional bug for Phoenix demo
    return user!.email.split('@')[1];
  }

  /**
   * Bug #5: Returns lowercase email. CRASH when user not found - calls toLowerCase on null.
   */
  getEmailLowercase(id: number): string {
    const email = this.getUserEmail(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- intentional bug for Phoenix demo
    return email!.toLowerCase();
  }
}