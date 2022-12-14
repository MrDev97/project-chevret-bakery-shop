"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./shared/interceptors/logger.service");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:8000', 'http://localhost:3000'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new logger_service_1.LoggerInterceptor());
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map