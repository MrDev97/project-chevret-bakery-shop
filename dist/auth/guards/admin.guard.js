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
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const user_roles_enum_1 = require("../../shared/enums/user-roles.enum");
const users_data_service_1 = require("../../users/users-data-service");
let AdminGuard = class AdminGuard {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { user, params, } = req;
        if (!user || !params)
            return false;
        const foundUser = await this.usersService.getUserById(user.id || params.userId);
        if (req.user.id === foundUser.id && foundUser.role === user_roles_enum_1.UserRoles.ADMIN)
            return true;
    }
};
AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_data_service_1.UsersDataService])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map