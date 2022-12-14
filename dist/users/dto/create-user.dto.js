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
exports.CreateUserAddressDto = exports.CreateUserDto = void 0;
const date_helper_1 = require("../../shared/date.helper");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const sanitizeHtml = require("sanitize-html");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Transform)((d) => (0, date_helper_1.arrayToDate)(d)),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateUserAddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "address", void 0);
exports.CreateUserDto = CreateUserDto;
class CreateUserAddressDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 56),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], CreateUserAddressDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], CreateUserAddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], CreateUserAddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateUserAddressDto.prototype, "houseNo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserAddressDto.prototype, "apartmentNo", void 0);
exports.CreateUserAddressDto = CreateUserAddressDto;
//# sourceMappingURL=create-user.dto.js.map