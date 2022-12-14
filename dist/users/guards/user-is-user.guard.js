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
exports.UserIsUser = void 0;
const common_1 = require("@nestjs/common");
const users_data_service_1 = require("../users-data-service");
let UserIsUser = class UserIsUser {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { user, params, } = req;
        if (!user || !params)
            return false;
        const foundUser = await this.usersService.getUserById(params.id || params.userId);
        if (req.user.id === foundUser.id)
            return true;
    }
};
UserIsUser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_data_service_1.UsersDataService])
], UserIsUser);
exports.UserIsUser = UserIsUser;
//# sourceMappingURL=user-is-user.guard.js.map