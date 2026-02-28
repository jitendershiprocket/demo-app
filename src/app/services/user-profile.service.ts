import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private users = [
    { id: 1, email: 'a@x.com' },
    { id: 2, email: 'b@x.com' },
  ];

  getEmail(id: number): string {
    const user = this.users.find((u) => u.id === id);
    return (user as { email: string }).email;
  }
}
