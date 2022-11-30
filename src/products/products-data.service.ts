import { Injectable } from '@nestjs/common';
import { Product } from './db/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private dataSource: DataSource,
  ) {}

  async addProduct(item: CreateProductDto): Promise<Product> {
    return await this.dataSource.transaction(async () => {
      const productToSave = new Product();

      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.quantity = item.quantity;
      productToSave.description = item.description;

      if (item.tags) {
        productToSave.tags = await this.tagRepository.findTagsByName(item.tags);
      }

      return await this.productRepository.save(productToSave);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDto): Promise<Product> {
    return await this.dataSource.transaction(async () => {
      const productToUpdate = await this.getProductById(id);

      productToUpdate.name = item.name;
      productToUpdate.price = item.price;
      productToUpdate.quantity = item.quantity;
      productToUpdate.description = item.description;

      if (item.tags) {
        productToUpdate.tags = await this.tagRepository.findTagsByName(
          item.tags,
        );
      }

      await this.productRepository.save(productToUpdate);

      return this.getProductById(id);
    });
  }

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  getAllProducts(query): Promise<Product[]> {
    return this.productRepository.findAll(query);
  }
}
