import { Repository, DataSource } from 'typeorm';
import { UserAddress } from './userAddress.entity';
export declare class UserAddressRepository extends Repository<UserAddress> {
    private dataSource;
    constructor(dataSource: DataSource);
    deleteUserAddressesByUserId(id: string): Promise<void>;
    addAddressToUser(userAddress: UserAddress): Promise<UserAddress>;
    updateUserAddress(userAddress: UserAddress): Promise<UserAddress>;
}
