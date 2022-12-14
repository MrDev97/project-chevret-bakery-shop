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
exports.Order = void 0;
const class_validator_1 = require("class-validator");
const userAddress_entity_1 = require("../../users/db/userAddress.entity");
const users_entity_1 = require("../../users/db/users.entity");
const typeorm_1 = require("typeorm");
const statuses_enum_1 = require("../enums/statuses.enum");
const orderProduct_entity_1 = require("./orderProduct.entity");
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderProduct_entity_1.OrderProduct, (orderProduct) => orderProduct.order, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Order.prototype, "orderedProducts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.id, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", users_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userAddress_entity_1.UserAddress, (address) => address.id, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", userAddress_entity_1.UserAddress)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: statuses_enum_1.Statuses,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({
        name: 'orders',
    })
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map