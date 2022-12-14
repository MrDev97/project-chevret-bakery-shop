"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_data_service_1 = require("./orders-data.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const date_helper_1 = require("../shared/date.helper");
const logged_in_guard_1 = require("../auth/guards/logged-in.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const user_is_requestor_guard_1 = require("./guards/user-is-requestor.guard");
let OrdersController = class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getAllUserOrders(req) {
        return this.orderService.getAllUserOrders(req.user.id);
    }
    async getOrderById(id) {
        return this.mapOrderToExternal(await this.orderService.getOrderById(id));
    }
    async getAllOrders() {
        return (await this.orderService.getAllOrders()).map((i) => this.mapOrderToExternal(i));
    }
    async addOrder(item, req) {
        return this.mapOrderToExternal(await this.orderService.addOrder(Object.assign(Object.assign({}, item), { userId: req.user.id })));
    }
    mapOrderToExternal(order) {
        var _a;
        return {
            id: order.id,
            status: order.status,
            totalPrice: order.totalPrice,
            createdAt: (0, date_helper_1.dateToArray)(order.createdAt),
            address: order.address,
            user: order.user,
            orderedProducts: (_a = order.orderedProducts) === null || _a === void 0 ? void 0 : _a.map((i) => {
                return this.mapToExternalOrderProduct(i);
            }),
        };
    }
    mapToExternalOrderProduct(orderProduct) {
        return {
            id: orderProduct.id,
            product: orderProduct.product,
            price: orderProduct.price,
            quantity: orderProduct.quantity,
        };
    }
    deleteOrder(_id_) {
        this.orderService.deleteOrder(_id_);
    }
    async updateOrder(id, item, req) {
        return this.mapOrderToExternal(await this.orderService.updateOrder(id, Object.assign(Object.assign({}, item), { userId: req.user.id })));
    }
    async addProductToOrder(id, item) {
        return this.mapToExternalOrderProduct(await this.orderService.addProductToOrder(id, item));
    }
    async deleteOrderProduct(orderId, idOrderProduct) {
        return this.mapOrderToExternal(await this.orderService.deleteOrderProduct(orderId, idOrderProduct));
    }
    async updateOrderAddress(orderId, item) {
        return this.mapOrderToExternal(await this.orderService.updateUserAddress(orderId, item));
    }
};
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAllUserOrders", null);
__decorate([
    (0, common_1.UseGuards)(user_is_requestor_guard_1.UserIsRequestor),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addOrder", null);
__decorate([
    (0, common_1.UseGuards)(user_is_requestor_guard_1.UserIsRequestor),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.UseGuards)(user_is_requestor_guard_1.UserIsRequestor),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.UseGuards)(user_is_requestor_guard_1.UserIsRequestor),
    (0, common_1.Patch)(':id/products'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_order_dto_1.CreateOrderProductDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addProductToOrder", null);
__decorate([
    (0, common_1.UseGuards)(user_is_requestor_guard_1.UserIsRequestor),
    (0, common_1.Delete)(':orderId/products/:idOrderProduct'),
    __param(0, (0, common_1.Param)('orderId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Param)('idOrderProduct', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteOrderProduct", null);
__decorate([
    (0, common_1.UseGuards)(user_is_requestor_guard_1.UserIsRequestor),
    (0, common_1.Patch)(':orderId/:userAddressId'),
    __param(0, (0, common_1.Param)('orderId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderAddress", null);
OrdersController = __decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_data_service_1.OrdersDataService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map