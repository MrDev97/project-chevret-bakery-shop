import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { Statuses } from '../enums/statuses.enum';
import { OrderProduct } from './orderProduct.entity';
export declare class Order {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    orderedProducts: OrderProduct[];
    user: User;
    address: UserAddress;
    totalPrice: number;
    description?: string;
    status: Statuses;
}
