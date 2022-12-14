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
exports.ExternalUserAddressDto = exports.ExternalUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const sanitizeHtml = require("sanitize-html");
class ExternalUserDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], ExternalUserDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ExternalUserAddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ExternalUserDto.prototype, "address", void 0);
exports.ExternalUserDto = ExternalUserDto;
class ExternalUserAddressDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 56),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserAddressDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserAddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], ExternalUserAddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ExternalUserAddressDto.prototype, "houseNo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExternalUserAddressDto.prototype, "apartmentNo", void 0);
exports.ExternalUserAddressDto = ExternalUserAddressDto;
//# sourceMappingURL=external-user.dto.js.map