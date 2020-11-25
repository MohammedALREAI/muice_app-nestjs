import { CanActivate, ExecutionContext,  Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { User } from '../../modules/auth/entities/user.entity';
import { Request } from 'express'


@Injectable()

export class AcceptedAuthGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler)
    if (!roles) {
      return true
    }

    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const user = req.user as User
    if (!user) {
      return false
    }
    const hasRole = () => user.roles.some(role => role === Role.ADMIN || role === Role.USER)
    return hasRole();


  }
}



// some hint with use gurad it should be used CAN aCTIVE 
