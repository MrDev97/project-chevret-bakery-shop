import { Product } from 'src/products/db/product.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateOrderProductDto } from '../dto/create-order.dto';
import { OrderProduct } from './orderProduct.entity';
export declare class OrderProductRepository extends Repository<OrderProduct> {
    private dataSource;
    constructor(dataSource: DataSource);
    deleteProductOrderByOrderId(id: string): Promise<void>;
    addProductToOrder(id: string, item: CreateOrderProductDto, product: Product): Promise<OrderProduct>;
}
