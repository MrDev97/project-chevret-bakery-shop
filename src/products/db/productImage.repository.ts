import { Injectable } from '@nestjs/common';
import { ProductImage } from './productImage.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ProductImageRepository extends Repository<ProductImage> {
  constructor(private dataSource: DataSource) {
    super(ProductImage, dataSource.createEntityManager());
  }
}
