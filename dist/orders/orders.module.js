"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_data_service_1 = require("./orders-data.service");
const order_repository_1 = require("./db/order.repository");
const orders_controller_1 = require("./orders.controller");
const orderProduct_repository_1 = require("./db/orderProduct.repository");
const product_repository_1 = require("../products/db/product.repository");
const users_module_1 = require("../users/users.module");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_data_service_1.OrdersDataService,
            order_repository_1.OrderRepository,
            orderProduct_repository_1.OrderProductRepository,
            product_repository_1.ProductRepository,
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_repository_1.OrderRepository, orderProduct_repository_1.OrderProductRepository]),
            users_module_1.UsersModule,
        ],
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map