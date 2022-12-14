import { Repository, DataSource } from 'typeorm';
import { Order } from './order.entity';
export declare class OrderRepository extends Repository<Order> {
    private dataSource;
    constructor(dataSource: DataSource);
    updateUserAddress(orderId: string, newAddressId: string): Promise<Order>;
    findByUser(id: string): Promise<Order[]>;
}
