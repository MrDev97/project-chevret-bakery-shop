import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import {
  Repository,
  DataSource,
  Between,
  Equal,
  FindManyOptions,
  LessThan,
  Like,
  MoreThan,
  FindOptionsWhere,
} from 'typeorm';
import { ProductsQuery } from '../queries/products-query.interface';
import { TextFilterType } from 'src/shared/enums/text-filter.enum';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async updateProductQuantity(
    productId: string,
    newQuantity: number,
  ): Promise<void> {
    await this.update({ id: productId }, { quantity: newQuantity });
  }

  private buildPredicate(query: ProductsQuery): FindManyOptions<Product> {
    const predicate: FindOptionsWhere<Product> = {};

    if (query.maxPrice && query.minPrice) {
      predicate.price = Between(query.minPrice, query.maxPrice);
    } else if (query.minPrice) {
      predicate.price = MoreThan(query.minPrice);
    } else if (query.maxPrice) {
      predicate.price = LessThan(query.maxPrice);
    }

    if (query.name && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.name = Like(`%${query.name}%`);
    } else if (query.name) {
      predicate.name = Equal(query.name);
    }

    if (query.minQuantity && query.maxQuantity) {
      predicate.quantity = Between(query.minQuantity, query.maxQuantity);
    } else if (query.minQuantity) {
      predicate.quantity = MoreThan(query.minQuantity);
    } else if (query.maxQuantity) {
      predicate.quantity = LessThan(query.maxQuantity);
    }

    const findManyOptions: FindManyOptions<Product> = {
      where: predicate,
    };

    findManyOptions.order = {
      [query.sortField || 'createdAt']: query.orderDirection || 'ASC',
    };

    return findManyOptions;
  }

  findAll(_query_: ProductsQuery): Promise<Product[]> {
    return this.find(this.buildPredicate(_query_));
  }
}
