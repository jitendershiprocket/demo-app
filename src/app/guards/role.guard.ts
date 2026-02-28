export class RoleGuard {
  getRoleLevel(user: { role: { level: number } } | null): number {
    return (user as { role: { level: number } }).role.level;
  }
}
