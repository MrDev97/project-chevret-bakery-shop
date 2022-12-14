import { User } from './db/users.entity';
import { CreateUserDto, CreateUserAddressDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserAddressDto } from './dto/update-user.dto';
import { UserAddress } from './db/userAddress.entity';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { DataSource } from 'typeorm';
export declare class UsersDataService {
    private userRepository;
    private userAddressRepository;
    private dataSource;
    constructor(userRepository: UserRepository, userAddressRepository: UserAddressRepository, dataSource: DataSource);
    addUser(user: CreateUserDto): Promise<User>;
    addAddressToUser(id: string, item: CreateUserAddressDto): Promise<UserAddress>;
    prepareUserAddressesToSave(address: CreateUserAddressDto[] | UpdateUserAddressDto[], UserAddressRepository: UserAddressRepository): Promise<UserAddress[]>;
    deleteUser(id: string): Promise<void>;
    deleteUserAddress(id: string, userAddressId: string): Promise<User>;
    updateUser(id: string, user: UpdateUserDto): Promise<User>;
    updateUserAddress(userId: string, userAddressId: string, item: CreateUserAddressDto): Promise<UserAddress>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
