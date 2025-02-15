import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly validToken = '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12'; // Reemplaza con tu token estático

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token || token !== this.validToken) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}