import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './db/order.entity';
import { OrderRepository } from './db/order.repository';
import { OrderProduct } from './db/orderProduct.entity';
import { OrderProductRepository } from './db/orderProduct.repository';
import { Product } from 'src/products/db/product.entity';
import { ProductRepository } from 'src/products/db/product.repository';
import { User } from 'src/users/db/users.entity';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { Statuses } from './enums/statuses.enum';
import { sumTotalFromOrderedProducts } from 'src/products/orderTotal.helper';

@Injectable()
export class OrdersDataService {
  constructor(
    private dataSource: DataSource,
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private orderProductRepository: OrderProductRepository,
  ) {}

  async addOrder(item: CreateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      const orderToSave = new Order();

      orderToSave.user = new User();
      orderToSave.user.id = item.userId;
      orderToSave.address = new UserAddress();
      orderToSave.address.id = item.addressId;
      orderToSave.orderedProducts = await this.saveOrderProducts(
        item.orderedProducts,
      );
      orderToSave.description = item.description;
      orderToSave.status = Statuses.RECEIVED;
      orderToSave.totalPrice = sumTotalFromOrderedProducts(
        orderToSave.orderedProducts,
      );

      return await this.orderRepository.save(orderToSave);
    });
  }

  async deleteOrder(id: string): Promise<void> {
    this.orderRepository.delete(id);
  }

  async deleteOrderProduct(id: string, idOrderProduct: string): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      const orderProduct = await this.orderProductRepository.findOne({
        where: { id: idOrderProduct },
      });

      const orderToUpdate = await this.getOrderById(id);
      orderToUpdate.totalPrice = orderToUpdate.totalPrice - orderProduct.price;

      await this.orderRepository.save(orderToUpdate);
      this.orderProductRepository.delete(idOrderProduct);

      return this.getOrderById(id);
    });
  }

  async updateOrder(id: string, item: UpdateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      await this.orderProductRepository.deleteProductOrderByOrderId(id);

      const orderToUpdate = await this.getOrderById(id);

      orderToUpdate.user = new User();
      orderToUpdate.user.id = item.userId;
      orderToUpdate.address = new UserAddress();
      orderToUpdate.address.id = item.addressId;
      orderToUpdate.orderedProducts = await this.saveOrderProducts(
        item.orderedProducts,
      );
      orderToUpdate.description = item.description;
      orderToUpdate.status = item.status;
      orderToUpdate.totalPrice = sumTotalFromOrderedProducts(
        orderToUpdate.orderedProducts,
      );

      await this.orderRepository.save(orderToUpdate);

      return this.getOrderById(id);
    });
  }

  getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async addProductToOrder(
    id: string,
    item: CreateOrderProductDto,
  ): Promise<OrderProduct> {
    return await this.dataSource.transaction(async () => {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      const orderProduct = await this.orderProductRepository.addProductToOrder(
        id,
        item,
        product,
      );

      const orderToUpdate = await this.getOrderById(id);
      orderToUpdate.totalPrice = orderToUpdate.totalPrice + orderProduct.price;

      await this.orderRepository.save(orderToUpdate);

      return orderProduct;
    });
  }

  async updateUserAddress(id: string, item): Promise<Order> {
    return await this.dataSource.transaction(async () => {
      return await this.orderRepository.updateUserAddress(
        id,
        item.newAddressId,
      );
    });
  }

  async saveOrderProducts(
    orderedProducts: CreateOrderProductDto[],
  ): Promise<OrderProduct[]> {
    const orderedProductsToSave: OrderProduct[] = [];

    for (let i = 0; i < orderedProducts.length; i++) {
      const orderedProductToSave = new OrderProduct();
      const orderedProduct = orderedProducts[i];

      const productData = await this.productRepository.findOne({
        where: {
          id: orderedProduct.productId,
        },
      });

      orderedProductToSave.quantity = orderedProduct.quantity;
      orderedProductToSave.price = productData.price * orderedProduct.quantity;

      orderedProductToSave.product = new Product();
      orderedProductToSave.product.id = productData.id;
      orderedProductToSave.product.name = productData.name;

      await this.orderProductRepository.save(orderedProductToSave);
      orderedProductsToSave.push(orderedProductToSave);
    }

    return orderedProductsToSave;
  }
}
