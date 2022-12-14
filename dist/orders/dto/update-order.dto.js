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
exports.UpdateOrderProductDto = exports.UpdateOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const statuses_enum_1 = require("../enums/statuses.enum");
const class_transformer_2 = require("class-transformer");
const sanitizeHtml = require("sanitize-html");
class UpdateOrderDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateOrderProductDto),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "orderedProducts", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "addressId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(statuses_enum_1.Statuses, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
exports.UpdateOrderDto = UpdateOrderDto;
class UpdateOrderProductDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_transformer_2.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateOrderProductDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateOrderProductDto.prototype, "quantity", void 0);
exports.UpdateOrderProductDto = UpdateOrderProductDto;
//# sourceMappingURL=update-order.dto.js.map