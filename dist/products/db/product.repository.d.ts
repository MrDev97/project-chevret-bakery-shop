import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';
import { ProductsQuery } from '../queries/products-query.interface';
export declare class ProductRepository extends Repository<Product> {
    private dataSource;
    constructor(dataSource: DataSource);
    updateProductQuantity(productId: string, newQuantity: number): Promise<void>;
    private buildPredicate;
    findAll(_query_: ProductsQuery): Promise<Product[]>;
}
