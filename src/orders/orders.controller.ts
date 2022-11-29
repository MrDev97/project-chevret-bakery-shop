import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  Patch,
  ParseUUIDPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Order } from './db/order.entity';
import { OrdersDataService } from './orders-data.service';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import {
  ExternalOrderDto,
  ExternalOrderProductDto,
} from './dto/external-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { dateToArray } from 'src/shared/date.helper';
import { OrderProduct } from './db/orderProduct.entity';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UserIsRequestor } from 'src/orders/guards/user-is-requestor.guard';

@UseGuards(LoggedInGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersDataService) {}

  @Get('user')
  getAllUserOrders(@Request() req): Promise<Order[]> {
    return this.orderService.getAllUserOrders(req.user.id);
  }

  @UseGuards(UserIsRequestor)
  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(await this.orderService.getOrderById(id));
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllOrders(): Promise<ExternalOrderDto[]> {
    return (await this.orderService.getAllOrders()).map((i) =>
      this.mapOrderToExternal(i),
    );
  }

  @Post()
  async addOrder(
    @Body() item: CreateOrderDto,
    @Request() req,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.addOrder({
        ...item,
        userId: req.user.id,
      }),
    );
  }

  mapOrderToExternal(order: Order): ExternalOrderDto {
    return {
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      createdAt: dateToArray(order.createdAt),
      address: order.address,
      user: order.user,
      orderedProducts: order.orderedProducts?.map((i) => {
        return this.mapToExternalOrderProduct(i);
      }),
    };
  }

  mapToExternalOrderProduct(
    orderProduct: OrderProduct,
  ): ExternalOrderProductDto {
    return {
      id: orderProduct.id,
      product: orderProduct.product,
      price: orderProduct.price,
      quantity: orderProduct.quantity,
    };
  }

  @UseGuards(UserIsRequestor)
  @Delete(':id')
  @HttpCode(204)
  deleteOrder(@Param('id') _id_: string): void {
    this.orderService.deleteOrder(_id_);
  }

  @UseGuards(UserIsRequestor)
  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateOrderDto,
    @Request() req,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.updateOrder(id, {
        ...item,
        userId: req.user.id,
      }),
    );
  }

  @UseGuards(UserIsRequestor)
  @Patch(':id/products')
  async addProductToOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: CreateOrderProductDto,
  ): Promise<ExternalOrderProductDto> {
    return this.mapToExternalOrderProduct(
      await this.orderService.addProductToOrder(id, item),
    );
  }

  @UseGuards(UserIsRequestor)
  @Delete(':orderId/products/:idOrderProduct')
  async deleteOrderProduct(
    @Param('orderId', new ParseUUIDPipe({ version: '4' }))
    orderId: string,
    @Param('idOrderProduct', new ParseUUIDPipe({ version: '4' }))
    idOrderProduct: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.deleteOrderProduct(orderId, idOrderProduct),
    );
  }

  @UseGuards(UserIsRequestor)
  @Patch(':orderId/:userAddressId')
  async updateOrderAddress(
    @Param('orderId', new ParseUUIDPipe({ version: '4' })) orderId: string,
    @Body() item: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.updateUserAddress(orderId, item),
    );
  }
}
