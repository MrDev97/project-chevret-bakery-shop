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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_data_service_1 = require("./users-data-service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_validator_service_1 = require("./user-validator.service");
const date_helper_1 = require("../shared/date.helper");
const logged_in_guard_1 = require("../auth/guards/logged-in.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const user_is_user_guard_1 = require("./guards/user-is-user.guard");
let UsersController = class UsersController {
    constructor(userService, userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }
    async getUserById(id) {
        return this.mapUserToExternal(await this.userService.getUserById(id));
    }
    async getAllUsers() {
        return (await this.userService.getAllUsers()).map((i) => this.mapUserToExternal(i));
    }
    async addUser(item) {
        await this.userValidator.validateUniqueEmail(item.email);
        return this.mapUserToExternal(await this.userService.addUser(item));
    }
    mapUserToExternal(user) {
        const { password, role } = user, rest = __rest(user, ["password", "role"]);
        return Object.assign(Object.assign({}, rest), { dateOfBirth: (0, date_helper_1.dateToArray)(new Date(user.dateOfBirth)) });
    }
    mapUserAddressToExternal(userAddress) {
        return Object.assign({}, userAddress);
    }
    deleteUser(id) {
        this.userService.deleteUser(id);
    }
    async updateUser(id, item) {
        return this.mapUserToExternal(await this.userService.updateUser(id, item));
    }
    async addAddressToUser(id, item) {
        return this.mapUserAddressToExternal(await this.userService.addAddressToUser(id, item));
    }
    async deleteUserAddress(userId, userAddressId) {
        return this.mapUserToExternal(await this.userService.deleteUserAddress(userId, userAddressId));
    }
    async updateUserAddress(userId, userAddressId, item) {
        return this.mapUserAddressToExternal(await this.userService.updateUserAddress(userId, userAddressId, item));
    }
};
__decorate([
    (0, common_1.UseGuards)(user_is_user_guard_1.UserIsUser),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.UseGuards)(user_is_user_guard_1.UserIsUser),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(user_is_user_guard_1.UserIsUser),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(user_is_user_guard_1.UserIsUser),
    (0, common_1.Put)(':id/addresses'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserAddressDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addAddressToUser", null);
__decorate([
    (0, common_1.UseGuards)(user_is_user_guard_1.UserIsUser),
    (0, common_1.Delete)(':userId/addresses/:userAddressId'),
    __param(0, (0, common_1.Param)('userId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Param)('userAddressId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserAddress", null);
__decorate([
    (0, common_1.UseGuards)(user_is_user_guard_1.UserIsUser),
    (0, common_1.Patch)(':userId/:userAddressId'),
    __param(0, (0, common_1.Param)('userId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Param)('userAddressId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_user_dto_1.CreateUserAddressDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserAddress", null);
UsersController = __decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_data_service_1.UsersDataService,
        user_validator_service_1.UserValidatorService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map