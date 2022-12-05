import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/product.repository';
import { Product } from './db/product.entity';
import { ProductImageRepository } from './db/productImage.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsDataService,
    TagRepository,
    ProductRepository,
    ProductImageRepository,
  ],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
