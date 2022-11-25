import { Injectable } from '@nestjs/common';
import { UsersDataService } from 'src/users/users-data-service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersDataService: UsersDataService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersDataService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
