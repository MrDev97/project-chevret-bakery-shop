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
exports.UserAddressRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const userAddress_entity_1 = require("./userAddress.entity");
let UserAddressRepository = class UserAddressRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(userAddress_entity_1.UserAddress, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async deleteUserAddressesByUserId(id) {
        const usersAddresses = await this.find({
            where: {
                user: (0, typeorm_1.In)([id]),
            },
        });
        this.remove(usersAddresses);
    }
    async addAddressToUser(userAddress) {
        return await this.save(userAddress);
    }
    async updateUserAddress(userAddress) {
        return this.save(userAddress);
    }
};
UserAddressRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserAddressRepository);
exports.UserAddressRepository = UserAddressRepository;
//# sourceMappingURL=userAddress.repository.js.map