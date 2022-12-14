import { Session } from './session.entity';
import { Repository, DataSource } from 'typeorm';
export declare class SessionRepostiory extends Repository<Session> {
    private dataSource;
    constructor(dataSource: DataSource);
}
