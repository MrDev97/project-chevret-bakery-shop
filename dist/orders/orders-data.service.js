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
exports.OrdersDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./db/order.entity");
const order_repository_1 = require("./db/order.repository");
const orderProduct_entity_1 = require("./db/orderProduct.entity");
const orderProduct_repository_1 = require("./db/orderProduct.repository");
const product_entity_1 = require("../products/db/product.entity");
const product_repository_1 = require("../products/db/product.repository");
const users_entity_1 = require("../users/db/users.entity");
const userAddress_entity_1 = require("../users/db/userAddress.entity");
const statuses_enum_1 = require("./enums/statuses.enum");
const orderTotal_helper_1 = require("./orderTotal.helper");
let OrdersDataService = class OrdersDataService {
    constructor(dataSource, orderRepository, productRepository, orderProductRepository) {
        this.dataSource = dataSource;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderProductRepository = orderProductRepository;
    }
    getOrderById(id) {
        return this.orderRepository.findOne({ where: { id } });
    }
    getAllOrders() {
        return this.orderRepository.find();
    }
    getAllUserOrders(id) {
        return this.orderRepository.findByUser(id);
    }
    async addOrder(item) {
        return await this.dataSource.transaction(async () => {
            const orderToSave = new order_entity_1.Order();
            orderToSave.user = new users_entity_1.User();
            orderToSave.user.id = item.userId;
            orderToSave.address = new userAddress_entity_1.UserAddress();
            orderToSave.address.id = item.addressId;
            orderToSave.orderedProducts = await this.saveOrderProducts(item.orderedProducts);
            orderToSave.description = item.description;
            orderToSave.status = statuses_enum_1.Statuses.RECEIVED;
            orderToSave.totalPrice = (0, orderTotal_helper_1.sumOrderedProductsTotal)(orderToSave.orderedProducts);
            return await this.orderRepository.save(orderToSave);
        });
    }
    async addProductToOrder(id, item) {
        return await this.dataSource.transaction(async () => {
            const productData = await this.productRepository.findOne({
                where: { id: item.productId },
            });
            if (productData.quantity < item.quantity || productData.quantity <= 0) {
                throw new Error('Empty Stock!');
            }
            else {
                const orderProduct = await this.orderProductRepository.addProductToOrder(id, item, productData);
                productData.quantity = productData.quantity - item.quantity;
                await this.productRepository.updateProductQuantity(productData.id, productData.quantity);
                const orderToUpdate = await this.getOrderById(id);
                orderToUpdate.totalPrice =
                    orderToUpdate.totalPrice + orderProduct.price;
                await this.orderRepository.save(orderToUpdate);
                return orderProduct;
            }
        });
    }
    async deleteOrder(id) {
        const orderToDelete = await this.getOrderById(id);
        for (const orderedProduct of orderToDelete.orderedProducts) {
            await this.deleteOrderProduct(orderToDelete.id, orderedProduct.id);
        }
        this.orderRepository.delete(id);
    }
    async deleteOrderProduct(id, idOrderProduct) {
        return await this.dataSource.transaction(async () => {
            const orderProductToDelete = await this.orderProductRepository.findOne({
                where: { id: idOrderProduct },
            });
            const productData = await this.productRepository.findOne({
                where: { id: orderProductToDelete.product.id },
            });
            productData.quantity =
                productData.quantity + orderProductToDelete.quantity;
            await this.productRepository.updateProductQuantity(productData.id, productData.quantity);
            const orderToUpdate = await this.getOrderById(id);
            orderToUpdate.totalPrice =
                orderToUpdate.totalPrice - orderProductToDelete.price;
            await this.orderRepository.save(orderToUpdate);
            this.orderProductRepository.delete(idOrderProduct);
            return this.getOrderById(id);
        });
    }
    async updateOrder(id, item) {
        return await this.dataSource.transaction(async () => {
            await this.orderProductRepository.deleteProductOrderByOrderId(id);
            const orderToUpdate = await this.getOrderById(id);
            orderToUpdate.user = new users_entity_1.User();
            orderToUpdate.user.id = item.userId;
            orderToUpdate.address = new userAddress_entity_1.UserAddress();
            orderToUpdate.address.id = item.addressId;
            for (const orderedProduct of orderToUpdate.orderedProducts) {
                await this.deleteOrderProduct(orderToUpdate.id, orderedProduct.id);
            }
            orderToUpdate.orderedProducts = await this.saveOrderProducts(item.orderedProducts);
            orderToUpdate.description = item.description;
            orderToUpdate.status = item.status;
            orderToUpdate.totalPrice = (0, orderTotal_helper_1.sumOrderedProductsTotal)(orderToUpdate.orderedProducts);
            await this.orderRepository.save(orderToUpdate);
            return this.getOrderById(id);
        });
    }
    async updateUserAddress(id, item) {
        return await this.dataSource.transaction(async () => {
            return await this.orderRepository.updateUserAddress(id, item.newAddressId);
        });
    }
    async saveOrderProducts(orderedProducts) {
        return await this.dataSource.transaction(async () => {
            const orderedProductsToSave = [];
            for (let i = 0; i < orderedProducts.length; i++) {
                const orderedProductToSave = new orderProduct_entity_1.OrderProduct();
                const orderedProduct = orderedProducts[i];
                const productData = await this.productRepository.findOne({
                    where: {
                        id: orderedProduct.productId,
                    },
                });
                if (productData.quantity < orderedProduct.quantity ||
                    productData.quantity <= 0) {
                    throw new Error('Empty Stock!');
                }
                else {
                    productData.quantity = productData.quantity - orderedProduct.quantity;
                    await this.productRepository.updateProductQuantity(productData.id, productData.quantity);
                    orderedProductToSave.quantity = orderedProduct.quantity;
                    orderedProductToSave.price =
                        productData.price * orderedProduct.quantity;
                    orderedProductToSave.product = new product_entity_1.Product();
                    orderedProductToSave.product.id = productData.id;
                    orderedProductToSave.product.name = productData.name;
                    await this.orderProductRepository.save(orderedProductToSave);
                    orderedProductsToSave.push(orderedProductToSave);
                }
            }
            return orderedProductsToSave;
        });
    }
};
OrdersDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        order_repository_1.OrderRepository,
        product_repository_1.ProductRepository,
        orderProduct_repository_1.OrderProductRepository])
], OrdersDataService);
exports.OrdersDataService = OrdersDataService;
//# sourceMappingURL=orders-data.service.js.map