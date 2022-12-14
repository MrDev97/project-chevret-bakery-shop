import { Product } from 'src/products/db/product.entity';
import { Order } from './order.entity';
export declare class OrderProduct {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    price: number;
    quantity: number;
    product: Product;
    order: Order;
}
