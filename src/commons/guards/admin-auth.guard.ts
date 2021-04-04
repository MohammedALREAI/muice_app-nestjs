import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/index.Enum';
import { User } from '../../modules/auth/entities/user.entity';
import { Request } from 'express';
@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as User;
    if (user) {
      const hasRole = () => user.roles.some(role => role === Role.ADMIN);
      return hasRole();
    } else {
      return false;
    }
  }
}
