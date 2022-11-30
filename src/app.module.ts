import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './db/data-source';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { v4 as uuidv4 } from 'uuid';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { SessionRepostiory } from './sessions/db/session.repository';
import { TypeormStore } from 'connect-typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build/'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SessionRepostiory],
})
export class AppModule implements NestModule {
  constructor(
    private dataSource: DataSource,
    private sessionRepository: SessionRepostiory,
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    const oneDay = 1000 * 60 * 60 * 24;
    consumer
      .apply(
        cors({
          origin: ['http://localhost:8000', 'http://localhost:3000'],
          credentials: true,
        }),
        session({
          secret: uuidv4(),
          resave: false,
          saveUninitialized: false,
          cookie: { sameSite: true, httpOnly: false, maxAge: oneDay },
          store: new TypeormStore().connect(this.sessionRepository),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
