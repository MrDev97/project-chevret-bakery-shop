import { Injectable } from '@nestjs/common';
import { User } from './db/users.entity';
import { CreateUserDto, CreateUserAddressDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserAddressDto } from './dto/update-user.dto';
import { UserAddress } from './db/userAddress.entity';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { DataSource } from 'typeorm';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private dataSource: DataSource,
  ) {}

  async addUser(user: CreateUserDto): Promise<User> {
    return await this.dataSource.transaction(async () => {
      const userToSave = new User();

      userToSave.firstName = user.firstName;
      userToSave.lastName = user.lastName;
      userToSave.email = user.email;
      userToSave.dateOfBirth = user.dateOfBirth;
      userToSave.password = await bcrypt.hash(user.password, 10);
      userToSave.role = UserRoles.CUSTOMER;

      if (user.address) {
        userToSave.address = await this.prepareUserAddressesToSave(
          user.address,
          this.userAddressRepository,
        );
      }

      console.log(userToSave);

      return await this.userRepository.save(userToSave);
    });
  }

  async addAddressToUser(
    id: string,
    item: CreateUserAddressDto,
  ): Promise<UserAddress> {
    return await this.dataSource.transaction(async () => {
      const userAddress = new UserAddress();

      userAddress.country = item.country;
      userAddress.city = item.city;
      userAddress.street = item.street;
      userAddress.houseNo = item.houseNo;

      if (item.apartmentNo) {
        userAddress.apartmentNo = item.apartmentNo;
      }

      userAddress.user = new User();
      userAddress.user.id = id;

      return await this.userAddressRepository.addAddressToUser(userAddress);
    });
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
    UserAddressRepository: UserAddressRepository,
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];

    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.houseNo = add.houseNo;
      addressToSave.apartmentNo = add.apartmentNo;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return UserAddressRepository.save(addresses);
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async deleteUserAddress(id: string, userAddressId: string): Promise<User> {
    this.userAddressRepository.delete(userAddressId);
    return this.getUserById(id);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    return await this.dataSource.transaction(async () => {
      await this.userAddressRepository.deleteUserAddressesByUserId(id);

      const userToUpdate = await this.getUserById(id);

      userToUpdate.firstName = user.firstName;
      userToUpdate.lastName = user.lastName;
      userToUpdate.email = user.email;
      userToUpdate.dateOfBirth = user.dateOfBirth;

      if (user.address) {
        userToUpdate.address = await this.prepareUserAddressesToSave(
          user.address,
          this.userAddressRepository,
        );
      }

      return await this.userRepository.save(userToUpdate);
    });
  }

  async updateUserAddress(
    userId: string,
    userAddressId: string,
    item: CreateUserAddressDto,
  ): Promise<UserAddress> {
    return await this.dataSource.transaction(async () => {
      const userAddress = await this.userAddressRepository.findOne({
        where: { id: userAddressId },
      });

      userAddress.country = item.country;
      userAddress.city = item.city;
      userAddress.street = item.street;
      userAddress.houseNo = item.houseNo;
      userAddress.user = new User();
      userAddress.user.id = userId;

      return await this.userAddressRepository.save(userAddress);
    });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
