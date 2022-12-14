import { CanActivate, ExecutionContext } from '@nestjs/common';
import { OrdersDataService } from 'src/orders/orders-data.service';
export declare class UserIsRequestor implements CanActivate {
    private orderService;
    constructor(orderService: OrdersDataService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
