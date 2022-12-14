import { User } from './users.entity';
import { Repository, DataSource } from 'typeorm';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    getUserByEmail(email: string): Promise<User>;
}
