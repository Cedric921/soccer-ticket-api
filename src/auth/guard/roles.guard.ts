import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (!user || !this.allowedRoles.includes(user.role)) {
      return false;
    }
    return true;
  }
}
