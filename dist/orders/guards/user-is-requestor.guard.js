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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsRequestor = void 0;
const common_1 = require("@nestjs/common");
const orders_data_service_1 = require("../orders-data.service");
const user_roles_enum_1 = require("../../shared/enums/user-roles.enum");
let UserIsRequestor = class UserIsRequestor {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { user, params, } = req;
        if (!user || !params)
            return false;
        if (user.role === user_roles_enum_1.UserRoles.ADMIN)
            return true;
        const order = await this.orderService.getOrderById(params.id || params.orderId);
        if (req.user.id === order.user.id)
            return true;
    }
};
UserIsRequestor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_data_service_1.OrdersDataService])
], UserIsRequestor);
exports.UserIsRequestor = UserIsRequestor;
//# sourceMappingURL=user-is-requestor.guard.js.map