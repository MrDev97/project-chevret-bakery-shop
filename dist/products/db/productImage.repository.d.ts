import { ProductImage } from './productImage.entity';
import { Repository, DataSource } from 'typeorm';
export declare class ProductImageRepository extends Repository<ProductImage> {
    private dataSource;
    constructor(dataSource: DataSource);
}
