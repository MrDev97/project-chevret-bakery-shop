import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/db/users.entity';
import { UsersDataService } from '../users-data-service';

@Injectable()
export class UserIsUser implements CanActivate {
  constructor(private usersService: UsersDataService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const {
      user,
      params,
    }: { user: User; params: { id: string; userId: string } } = req;

    if (!user || !params) return false;

    const foundUser = await this.usersService.getUserById(
      params.id || params.userId,
    );

    if (req.user.id === foundUser.id) return true;
  }
}
