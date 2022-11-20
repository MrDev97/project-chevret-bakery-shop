import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  HttpCode,
  Delete,
  Put,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { User } from './db/users.entity';
import { UsersDataService } from './users-data-service';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-user.dto';
import {
  ExternalUserAddressDto,
  ExternalUserDto,
} from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { dateToArray } from 'src/shared/date.helper';
import { UserAddress } from './db/userAddress.entity';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersDataService,
    private userValidator: UserValidatorService,
  ) {}

  @Get(':id') async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userService.getUserById(id));
  }

  @Get()
  async getAllUsers(): Promise<ExternalUserDto[]> {
    return (await this.userService.getAllUsers()).map((i) =>
      this.mapUserToExternal(i),
    );
  }

  @Post()
  async addUser(@Body() item: CreateUserDto): Promise<ExternalUserDto> {
    await this.userValidator.validateUniqueEmail(item.email);
    return this.mapUserToExternal(await this.userService.addUser(item));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      dateOfBirth: dateToArray(new Date(user.dateOfBirth)),
    };
  }

  mapUserAddressToExternal(userAddress: UserAddress): ExternalUserAddressDto {
    return {
      ...userAddress,
    };
  }

  @Delete(':id') @HttpCode(204) deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userService.updateUser(id, item));
  }

  @Put(':id/addresses')
  async addAddressToUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: CreateUserAddressDto,
  ): Promise<ExternalUserAddressDto> {
    return this.mapUserAddressToExternal(
      await this.userService.addAddressToUser(id, item),
    );
  }

  @Delete(':userId/addresses/:userAddressId')
  async deleteUserAddress(
    @Param('userId', new ParseUUIDPipe({ version: '4' }))
    userId: string,
    @Param('userAddressId', new ParseUUIDPipe({ version: '4' }))
    userAddressId: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(
      await this.userService.deleteUserAddress(userId, userAddressId),
    );
  }

  @Patch(':userId/:userAddressId')
  async updateUserAddress(
    @Param('userId', new ParseUUIDPipe({ version: '4' }))
    userId: string,
    @Param('userAddressId', new ParseUUIDPipe({ version: '4' }))
    userAddressId: string,
    @Body() item: CreateUserAddressDto,
  ): Promise<ExternalUserAddressDto> {
    return this.mapUserAddressToExternal(
      await this.userService.updateUserAddress(userId, userAddressId, item),
    );
  }
}
