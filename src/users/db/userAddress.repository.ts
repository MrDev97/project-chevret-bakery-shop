import { Injectable } from '@nestjs/common';
import { Repository, DataSource, In } from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }

  async deleteUserAddressesByUserId(id: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        user: In([id]),
      },
    });

    this.remove(usersAddresses);
  }

  public async addAddressToUser(
    userAddress: UserAddress,
  ): Promise<UserAddress> {
    return await this.save(userAddress);
  }

  async updateUserAddress(userAddress: UserAddress): Promise<UserAddress> {
    return this.save(userAddress);
  }
}
