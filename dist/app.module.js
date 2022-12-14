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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data_source_1 = require("./db/data-source");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const uuid_1 = require("uuid");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const auth_module_1 = require("./auth/auth.module");
const session_repository_1 = require("./sessions/db/session.repository");
const connect_typeorm_1 = require("connect-typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    constructor(dataSource, sessionRepository) {
        this.dataSource = dataSource;
        this.sessionRepository = sessionRepository;
    }
    configure(consumer) {
        const oneDay = 1000 * 60 * 60 * 24;
        consumer
            .apply(cors({
            origin: ['http://localhost:8000', 'http://localhost:3000'],
            credentials: true,
        }), session({
            secret: (0, uuid_1.v4)(),
            resave: false,
            saveUninitialized: false,
            cookie: { sameSite: true, httpOnly: false, maxAge: oneDay },
            store: new connect_typeorm_1.TypeormStore().connect(this.sessionRepository),
        }), passport.initialize(), passport.session())
            .forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            auth_module_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client', 'build'),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, session_repository_1.SessionRepostiory],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        session_repository_1.SessionRepostiory])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map