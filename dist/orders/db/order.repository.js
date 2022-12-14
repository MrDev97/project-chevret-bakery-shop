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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderRepository = class OrderRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(order_entity_1.Order, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async updateUserAddress(orderId, newAddressId) {
        await this.update({ id: orderId }, { address: { id: newAddressId } });
        return await this.findOne({ where: { id: orderId } });
    }
    async findByUser(id) {
        return await this.find({ where: { user: { id: (0, typeorm_1.In)([id]) } } });
    }
};
OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map