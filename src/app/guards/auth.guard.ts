export class AuthGuard {
  private users = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' },
  ];

  getRole(userId: number): string {
    const user = this.users.find((u) => u.id === userId);
    return (user as { role: string }).role;
  }
}
