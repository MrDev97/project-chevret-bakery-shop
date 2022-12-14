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
exports.ProductsDataService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./db/product.entity");
const product_repository_1 = require("./db/product.repository");
const tag_repository_1 = require("./db/tag.repository");
const typeorm_1 = require("typeorm");
const productImage_repository_1 = require("./db/productImage.repository");
const productImage_entity_1 = require("./db/productImage.entity");
let ProductsDataService = class ProductsDataService {
    constructor(productRepository, tagRepository, productImageRepository, dataSource) {
        this.productRepository = productRepository;
        this.tagRepository = tagRepository;
        this.productImageRepository = productImageRepository;
        this.dataSource = dataSource;
    }
    async addProduct(item) {
        return await this.dataSource.transaction(async () => {
            const productToSave = new product_entity_1.Product();
            productToSave.name = item.name;
            productToSave.price = item.price;
            productToSave.quantity = item.quantity;
            productToSave.description = item.description;
            if (item.tags) {
                productToSave.tags = await this.tagRepository.findTagsByName(item.tags);
            }
            if (item.images) {
                productToSave.images = await this.saveProductImages(item.images);
            }
            return await this.productRepository.save(productToSave);
        });
    }
    async saveProductImages(images) {
        const prodImagesToSave = [];
        for (let i = 0; i < images.length; i++) {
            const imageToSave = new productImage_entity_1.ProductImage();
            imageToSave.name = images[i].toLowerCase();
            await this.productImageRepository.save(imageToSave);
            prodImagesToSave.push(imageToSave);
        }
        return prodImagesToSave;
    }
    async deleteProduct(id) {
        this.productRepository.delete(id);
    }
    async updateProduct(id, item) {
        return await this.dataSource.transaction(async () => {
            const productToUpdate = await this.getProductById(id);
            productToUpdate.name = item.name;
            productToUpdate.price = item.price;
            productToUpdate.quantity = item.quantity;
            productToUpdate.description = item.description;
            if (item.tags) {
                productToUpdate.tags = await this.tagRepository.findTagsByName(item.tags);
            }
            if (item.images) {
                productToUpdate.images = await this.saveProductImages(item.images);
            }
            await this.productRepository.save(productToUpdate);
            return this.getProductById(id);
        });
    }
    getProductById(id) {
        return this.productRepository.findOne({ where: { id } });
    }
    getAllProducts(query) {
        return this.productRepository.findAll(query);
    }
};
ProductsDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        tag_repository_1.TagRepository,
        productImage_repository_1.ProductImageRepository,
        typeorm_1.DataSource])
], ProductsDataService);
exports.ProductsDataService = ProductsDataService;
//# sourceMappingURL=products-data.service.js.map