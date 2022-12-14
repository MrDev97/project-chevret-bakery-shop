import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/db/users.entity';
import { UsersDataService } from 'src/users/users-data-service';
export declare class AuthSerializer extends PassportSerializer {
    private usersDataService;
    constructor(usersDataService: UsersDataService);
    serializeUser(user: User, done: (err: Error, user: {
        id: string;
    }) => void): void;
    deserializeUser(payload: {
        id: string;
    }, done: (err: Error, payload: User) => void): Promise<void>;
}
