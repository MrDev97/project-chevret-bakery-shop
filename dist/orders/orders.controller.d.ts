import { Order } from './db/order.entity';
import { OrdersDataService } from './orders-data.service';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import { ExternalOrderDto, ExternalOrderProductDto } from './dto/external-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderProduct } from './db/orderProduct.entity';
export declare class OrdersController {
    private orderService;
    constructor(orderService: OrdersDataService);
    getAllUserOrders(req: any): Promise<Order[]>;
    getOrderById(id: string): Promise<ExternalOrderDto>;
    getAllOrders(): Promise<ExternalOrderDto[]>;
    addOrder(item: CreateOrderDto, req: any): Promise<ExternalOrderDto>;
    mapOrderToExternal(order: Order): ExternalOrderDto;
    mapToExternalOrderProduct(orderProduct: OrderProduct): ExternalOrderProductDto;
    deleteOrder(_id_: string): void;
    updateOrder(id: string, item: UpdateOrderDto, req: any): Promise<ExternalOrderDto>;
    addProductToOrder(id: string, item: CreateOrderProductDto): Promise<ExternalOrderProductDto>;
    deleteOrderProduct(orderId: string, idOrderProduct: string): Promise<ExternalOrderDto>;
    updateOrderAddress(orderId: string, item: string): Promise<ExternalOrderDto>;
}
