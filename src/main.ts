import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.service';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
