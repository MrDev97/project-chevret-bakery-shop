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
exports.UpdateUserAddressDto = exports.UpdateUserDto = void 0;
const user_roles_enum_1 = require("../../shared/enums/user-roles.enum");
const date_helper_1 = require("../../shared/date.helper");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const sanitizeHtml = require("sanitize-html");
class UpdateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Transform)((d) => (0, date_helper_1.arrayToDate)(d)),
    __metadata("design:type", Date)
], UpdateUserDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateUserAddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_roles_enum_1.UserRoles),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserAddressDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 56),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateUserAddressDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateUserAddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_transformer_1.Transform)(({ value }) => sanitizeHtml(value)),
    __metadata("design:type", String)
], UpdateUserAddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateUserAddressDto.prototype, "houseNo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserAddressDto.prototype, "apartmentNo", void 0);
exports.UpdateUserAddressDto = UpdateUserAddressDto;
//# sourceMappingURL=update-user.dto.js.map