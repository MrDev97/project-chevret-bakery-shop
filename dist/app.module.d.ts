import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SessionRepostiory } from './sessions/db/session.repository';
export declare class AppModule implements NestModule {
    private dataSource;
    private sessionRepository;
    constructor(dataSource: DataSource, sessionRepository: SessionRepostiory);
    configure(consumer: MiddlewareConsumer): void;
}
