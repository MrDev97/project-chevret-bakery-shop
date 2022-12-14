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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("typeorm");
const text_filter_enum_1 = require("../../shared/enums/text-filter.enum");
let ProductRepository = class ProductRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(product_entity_1.Product, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async updateProductQuantity(productId, newQuantity) {
        await this.update({ id: productId }, { quantity: newQuantity });
    }
    buildPredicate(query) {
        const predicate = {};
        if (query.maxPrice && query.minPrice) {
            predicate.price = (0, typeorm_1.Between)(query.minPrice, query.maxPrice);
        }
        else if (query.minPrice) {
            predicate.price = (0, typeorm_1.MoreThan)(query.minPrice);
        }
        else if (query.maxPrice) {
            predicate.price = (0, typeorm_1.LessThan)(query.maxPrice);
        }
        if (query.name && query.nameFilterType === text_filter_enum_1.TextFilterType.CONTAINS) {
            predicate.name = (0, typeorm_1.Like)(`%${query.name}%`);
        }
        else if (query.name) {
            predicate.name = (0, typeorm_1.Equal)(query.name);
        }
        if (query.minQuantity && query.maxQuantity) {
            predicate.quantity = (0, typeorm_1.Between)(query.minQuantity, query.maxQuantity);
        }
        else if (query.minQuantity) {
            predicate.quantity = (0, typeorm_1.MoreThan)(query.minQuantity);
        }
        else if (query.maxQuantity) {
            predicate.quantity = (0, typeorm_1.LessThan)(query.maxQuantity);
        }
        const findManyOptions = {
            where: predicate,
        };
        findManyOptions.order = {
            [query.sortField || 'createdAt']: query.orderDirection || 'ASC',
        };
        return findManyOptions;
    }
    findAll(_query_) {
        return this.find(this.buildPredicate(_query_));
    }
};
ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map