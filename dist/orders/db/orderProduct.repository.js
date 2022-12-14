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
exports.OrderProductRepository = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../../products/db/product.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const orderProduct_entity_1 = require("./orderProduct.entity");
let OrderProductRepository = class OrderProductRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(orderProduct_entity_1.OrderProduct, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async deleteProductOrderByOrderId(id) {
        const orderProducts = await this.find({
            where: {
                id,
            },
        });
        await this.remove(orderProducts);
    }
    async addProductToOrder(id, item, product) {
        const orderProduct = new orderProduct_entity_1.OrderProduct();
        orderProduct.product = new product_entity_1.Product();
        orderProduct.quantity = item.quantity;
        orderProduct.price = product.price * item.quantity;
        orderProduct.product.id = product.id;
        orderProduct.product.name = product.name;
        orderProduct.order = new order_entity_1.Order();
        orderProduct.order.id = id;
        return await this.save(orderProduct);
    }
};
OrderProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrderProductRepository);
exports.OrderProductRepository = OrderProductRepository;
//# sourceMappingURL=orderProduct.repository.js.map