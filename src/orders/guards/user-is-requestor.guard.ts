import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { OrdersDataService } from 'src/orders/orders-data.service';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { User } from 'src/users/db/users.entity';

@Injectable()
export class UserIsRequestor implements CanActivate {
  constructor(private orderService: OrdersDataService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const {
      user,
      params,
    }: { user: User; params: { id: string; orderId: string } } = req;

    if (!user || !params) return false;

    if (user.role === UserRoles.ADMIN) return true;

    const order = await this.orderService.getOrderById(
      params.id || params.orderId,
    );

    if (req.user.id === order.user.id) return true;
  }
}
