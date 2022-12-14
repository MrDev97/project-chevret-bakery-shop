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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_data_service_1 = require("./products-data.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const date_helper_1 = require("../shared/date.helper");
const logged_in_guard_1 = require("../auth/guards/logged-in.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let ProductsController = class ProductsController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProductById(id) {
        return this.mapProductToExternal(await this.productService.getProductById(id));
    }
    async getAllProducts(query) {
        return (await this.productService.getAllProducts(query)).map((i) => this.mapProductToExternal(i));
    }
    async addProduct(item) {
        return this.mapProductToExternal(await this.productService.addProduct(item));
    }
    mapProductToExternal(product) {
        var _a, _b;
        return Object.assign(Object.assign({}, product), { createdAt: (0, date_helper_1.dateToArray)(product.createdAt), updatedAt: (0, date_helper_1.dateToArray)(product.updatedAt), tags: (_a = product.tags) === null || _a === void 0 ? void 0 : _a.map((i) => i.name), images: (_b = product.images) === null || _b === void 0 ? void 0 : _b.map((i) => i.name) });
    }
    deleteProduct(_id_) {
        this.productService.deleteProduct(_id_);
    }
    async updateProduct(id, product) {
        return this.mapProductToExternal(await this.productService.updateProduct(id, product));
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard, admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard, admin_guard_1.AdminGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_data_service_1.ProductsDataService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map