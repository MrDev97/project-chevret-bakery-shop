import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/db/users.entity';
import { UsersDataService } from 'src/users/users-data-service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private usersDataService: UsersDataService) {
    super();
  }
  serializeUser(
    user: User,
    done: (err: Error, user: { id: string; role: string }) => void,
  ) {
    done(null, { id: user.id, role: user.role });
  }
  async deserializeUser(
    payload: { id: string; role: string },
    done: (err: Error, payload: User) => void,
  ) {
    const user = await this.usersDataService.getUserById(payload.id);
    done(null, user);
  }
}
