import { UserValidatorService } from 'src/users/user-validator.service';
import { UsersDataService } from 'src/users/users-data-service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/db/users.entity';
export declare class AuthController {
    private userService;
    private userValidator;
    constructor(userService: UsersDataService, userValidator: UserValidatorService);
    login(req: any): Promise<any>;
    logout(req: any): Promise<any>;
    registerUser(item: RegisterUserDto): Promise<Omit<User, 'password' | 'role' | 'firstName' | 'lastName' | 'dateOfBirth' | 'role' | 'email'>>;
}
