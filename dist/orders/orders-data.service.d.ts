import { DataSource } from 'typeorm';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './db/order.entity';
import { OrderRepository } from './db/order.repository';
import { OrderProduct } from './db/orderProduct.entity';
import { OrderProductRepository } from './db/orderProduct.repository';
import { ProductRepository } from 'src/products/db/product.repository';
export declare class OrdersDataService {
    private dataSource;
    private orderRepository;
    private productRepository;
    private orderProductRepository;
    constructor(dataSource: DataSource, orderRepository: OrderRepository, productRepository: ProductRepository, orderProductRepository: OrderProductRepository);
    getOrderById(id: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getAllUserOrders(id: string): Promise<Order[]>;
    addOrder(item: CreateOrderDto): Promise<Order>;
    addProductToOrder(id: string, item: CreateOrderProductDto): Promise<OrderProduct>;
    deleteOrder(id: string): Promise<void>;
    deleteOrderProduct(id: string, idOrderProduct: string): Promise<Order>;
    updateOrder(id: string, item: UpdateOrderDto): Promise<Order>;
    updateUserAddress(id: string, item: any): Promise<Order>;
    saveOrderProducts(orderedProducts: CreateOrderProductDto[]): Promise<OrderProduct[]>;
}
