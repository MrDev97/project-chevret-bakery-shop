import { UsersDataService } from 'src/users/users-data-service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private usersDataService;
    constructor(usersDataService: UsersDataService);
    validateUser(user: LoginUserDto): Promise<any>;
}
