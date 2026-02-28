export class AccessChecker {
  private users = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
  ];

  getAccessLevel(userId: number): number {
    const user = this.users.find((u) => u.id === userId);
    return (user as { level: number }).level;
  }
}
