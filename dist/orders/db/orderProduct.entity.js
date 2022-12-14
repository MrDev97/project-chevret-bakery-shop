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
exports.OrderProduct = void 0;
const class_validator_1 = require("class-validator");
const product_entity_1 = require("../../products/db/product.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderProduct = class OrderProduct {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OrderProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OrderProduct.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.id, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", product_entity_1.Product)
], OrderProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", order_entity_1.Order)
], OrderProduct.prototype, "order", void 0);
OrderProduct = __decorate([
    (0, typeorm_1.Entity)({
        name: 'order_products',
    })
], OrderProduct);
exports.OrderProduct = OrderProduct;
//# sourceMappingURL=orderProduct.entity.js.map