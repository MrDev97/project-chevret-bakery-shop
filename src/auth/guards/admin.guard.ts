import { ExecutionContext, Injectable } from '@nestjs/common';
import { LoggedInGuard } from './logged-in.guard';
import { UserRoles } from 'src/shared/enums/user-roles.enum';

@Injectable()
export class AdminGuard extends LoggedInGuard {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return (
      super.canActivate(context) &&
      req.session.passport.user.role === UserRoles.ADMIN
    );
  }
}
