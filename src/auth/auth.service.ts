import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDataService } from 'src/users/users-data-service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersDataService: UsersDataService) {}

  async validateUser(user: LoginUserDto): Promise<any> {
    const foundUser = await this.usersDataService.getUserByEmail(user.email);

    if (!user || !(await bcrypt.compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const { password, ...rest } = foundUser;
    return rest;
  }
}
