import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { UserValidatorService } from 'src/users/user-validator.service';
import { UsersDataService } from 'src/users/users-data-service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/db/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersDataService,
    private userValidator: UserValidatorService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req): Promise<any> {
    return req.session.destroy();
  }

  @Post('register')
  async registerUser(
    @Body() item: RegisterUserDto,
  ): Promise<Omit<User, 'password' | 'role'>> {
    await this.userValidator.validateUniqueEmail(item.email);
    const user = await this.userService.addUser(item);
    const { password, role, ...rest } = user; // password shall not be displayed, causing "unused value" warning
    return rest;
  }
}
