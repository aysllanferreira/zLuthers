import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userGroups = user['cognito:groups'] || [];

    if (!userGroups.includes('admin')) {
      throw new HttpException('User is not an admin', 403);
    }

    return true;
  }
}
