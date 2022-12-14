import { User } from './db/users.entity';
import { UsersDataService } from './users-data-service';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-user.dto';
import { ExternalUserAddressDto, ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { UserAddress } from './db/userAddress.entity';
export declare class UsersController {
    private userService;
    private userValidator;
    constructor(userService: UsersDataService, userValidator: UserValidatorService);
    getUserById(id: string): Promise<ExternalUserDto>;
    getAllUsers(): Promise<ExternalUserDto[]>;
    addUser(item: CreateUserDto): Promise<ExternalUserDto>;
    mapUserToExternal(user: User): ExternalUserDto;
    mapUserAddressToExternal(userAddress: UserAddress): ExternalUserAddressDto;
    deleteUser(id: string): void;
    updateUser(id: string, item: UpdateUserDto): Promise<ExternalUserDto>;
    addAddressToUser(id: string, item: CreateUserAddressDto): Promise<ExternalUserAddressDto>;
    deleteUserAddress(userId: string, userAddressId: string): Promise<ExternalUserDto>;
    updateUserAddress(userId: string, userAddressId: string, item: CreateUserAddressDto): Promise<ExternalUserAddressDto>;
}
