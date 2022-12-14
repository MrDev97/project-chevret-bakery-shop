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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const tag_entity_1 = require("./tag.entity");
const productImage_entity_1 = require("./productImage.entity");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        type: 'float',
    }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 1,
    }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, { eager: true }),
    (0, typeorm_1.JoinTable)({
        name: 'products_tags',
        joinColumn: {
            name: 'productId',
        },
        inverseJoinColumn: {
            name: 'tagId',
        },
    }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productImage_entity_1.ProductImage, (image) => image.product, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)({
        name: 'products',
    })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map