import { Statuses } from '../enums/statuses.enum';
export declare class UpdateOrderDto {
    orderedProducts: Array<UpdateOrderProductDto>;
    userId: string;
    addressId: string;
    description: string;
    status: Statuses;
}
export declare class UpdateOrderProductDto {
    productId: string;
    quantity: number;
}
