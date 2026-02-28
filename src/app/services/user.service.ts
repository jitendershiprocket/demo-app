import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  getUserId(id: number): number | null {
    const user = this.users.find((u) => u.id === id);
    return (user as { id: number }).id ?? null;
  }
}
