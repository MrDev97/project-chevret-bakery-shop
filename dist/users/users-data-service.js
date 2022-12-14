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
exports.UsersDataService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./db/users.entity");
const userAddress_entity_1 = require("./db/userAddress.entity");
const users_repository_1 = require("./db/users.repository");
const userAddress_repository_1 = require("./db/userAddress.repository");
const typeorm_1 = require("typeorm");
const user_roles_enum_1 = require("../shared/enums/user-roles.enum");
const bcrypt = require("bcrypt");
let UsersDataService = class UsersDataService {
    constructor(userRepository, userAddressRepository, dataSource) {
        this.userRepository = userRepository;
        this.userAddressRepository = userAddressRepository;
        this.dataSource = dataSource;
    }
    async addUser(user) {
        return await this.dataSource.transaction(async () => {
            const userToSave = new users_entity_1.User();
            userToSave.firstName = user.firstName;
            userToSave.lastName = user.lastName;
            userToSave.email = user.email;
            userToSave.dateOfBirth = user.dateOfBirth;
            userToSave.password = await bcrypt.hash(user.password, 10);
            userToSave.role = user_roles_enum_1.UserRoles.CUSTOMER;
            if (user.address) {
                userToSave.address = await this.prepareUserAddressesToSave(user.address, this.userAddressRepository);
            }
            console.log(userToSave);
            return await this.userRepository.save(userToSave);
        });
    }
    async addAddressToUser(id, item) {
        return await this.dataSource.transaction(async () => {
            const userAddress = new userAddress_entity_1.UserAddress();
            userAddress.country = item.country;
            userAddress.city = item.city;
            userAddress.street = item.street;
            userAddress.houseNo = item.houseNo;
            if (item.apartmentNo) {
                userAddress.apartmentNo = item.apartmentNo;
            }
            userAddress.user = new users_entity_1.User();
            userAddress.user.id = id;
            return await this.userAddressRepository.addAddressToUser(userAddress);
        });
    }
    async prepareUserAddressesToSave(address, UserAddressRepository) {
        const addresses = [];
        for (const add of address) {
            const addressToSave = new userAddress_entity_1.UserAddress();
            addressToSave.country = add.country;
            addressToSave.city = add.city;
            addressToSave.street = add.street;
            addressToSave.houseNo = add.houseNo;
            addressToSave.apartmentNo = add.apartmentNo;
            addresses.push(await this.userAddressRepository.save(addressToSave));
        }
        return UserAddressRepository.save(addresses);
    }
    async deleteUser(id) {
        this.userRepository.delete(id);
    }
    async deleteUserAddress(id, userAddressId) {
        this.userAddressRepository.delete(userAddressId);
        return this.getUserById(id);
    }
    async updateUser(id, user) {
        return await this.dataSource.transaction(async () => {
            await this.userAddressRepository.deleteUserAddressesByUserId(id);
            const userToUpdate = await this.getUserById(id);
            userToUpdate.firstName = user.firstName;
            userToUpdate.lastName = user.lastName;
            userToUpdate.email = user.email;
            userToUpdate.dateOfBirth = user.dateOfBirth;
            if (user.address) {
                userToUpdate.address = await this.prepareUserAddressesToSave(user.address, this.userAddressRepository);
            }
            return await this.userRepository.save(userToUpdate);
        });
    }
    async updateUserAddress(userId, userAddressId, item) {
        return await this.dataSource.transaction(async () => {
            const userAddress = await this.userAddressRepository.findOne({
                where: { id: userAddressId },
            });
            userAddress.country = item.country;
            userAddress.city = item.city;
            userAddress.street = item.street;
            userAddress.houseNo = item.houseNo;
            userAddress.user = new users_entity_1.User();
            userAddress.user.id = userId;
            return await this.userAddressRepository.save(userAddress);
        });
    }
    getUserById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    getUserByEmail(email) {
        return this.userRepository.getUserByEmail(email);
    }
    getAllUsers() {
        return this.userRepository.find();
    }
};
UsersDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        userAddress_repository_1.UserAddressRepository,
        typeorm_1.DataSource])
], UsersDataService);
exports.UsersDataService = UsersDataService;
//# sourceMappingURL=users-data-service.js.map