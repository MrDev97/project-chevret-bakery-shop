import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDataService } from './orders-data.service';
import { OrderRepository } from './db/order.repository';
import { OrdersController } from './orders.controller';
import { OrderProductRepository } from './db/orderProduct.repository';
import { ProductRepository } from 'src/products/db/product.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersDataService,
    OrderRepository,
    OrderProductRepository,
    ProductRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderProductRepository]),
    UsersModule,
  ],
})
export class OrdersModule {}
