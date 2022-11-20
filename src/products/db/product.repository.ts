import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
}
