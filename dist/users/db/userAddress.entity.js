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
exports.UserAddress = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UserAddress = class UserAddress {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAddress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAddress.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAddress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAddress.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserAddress.prototype, "houseNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserAddress.prototype, "apartmentNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", users_entity_1.User)
], UserAddress.prototype, "user", void 0);
UserAddress = __decorate([
    (0, typeorm_1.Entity)({
        name: 'user_adresses',
    })
], UserAddress);
exports.UserAddress = UserAddress;
//# sourceMappingURL=userAddress.entity.js.map