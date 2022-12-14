import { Statuses } from '../enums/statuses.enum';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { Product } from 'src/products/db/product.entity';
export declare class ExternalOrderDto {
    id: string;
    orderedProducts: Array<ExternalOrderProductDto>;
    user: User;
    address: UserAddress;
    createdAt: Array<number>;
    totalPrice: number;
    status: Statuses;
}
export declare class ExternalOrderProductDto {
    id: string;
    price: number;
    quantity: number;
    product: Product;
}
