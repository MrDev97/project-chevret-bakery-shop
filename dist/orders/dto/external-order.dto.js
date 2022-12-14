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
exports.ExternalOrderProductDto = exports.ExternalOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const statuses_enum_1 = require("../enums/statuses.enum");
const userAddress_entity_1 = require("../../users/db/userAddress.entity");
const users_entity_1 = require("../../users/db/users.entity");
const product_entity_1 = require("../../products/db/product.entity");
const class_transformer_2 = require("class-transformer");
const sanitizeHtml = require("sanitize-html");
class ExternalOrderDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalOrderDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ExternalOrderProductDto),
    __metadata("design:type", Array)
], ExternalOrderDto.prototype, "orderedProducts", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", users_entity_1.User)
], ExternalOrderDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", userAddress_entity_1.UserAddress)
], ExternalOrderDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Array)
], ExternalOrderDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExternalOrderDto.prototype, "totalPrice", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(statuses_enum_1.Statuses, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], ExternalOrderDto.prototype, "status", void 0);
exports.ExternalOrderDto = ExternalOrderDto;
class ExternalOrderProductDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalOrderProductDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExternalOrderProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExternalOrderProductDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", product_entity_1.Product)
], ExternalOrderProductDto.prototype, "product", void 0);
exports.ExternalOrderProductDto = ExternalOrderProductDto;
//# sourceMappingURL=external-order.dto.js.map