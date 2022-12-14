import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersDataService } from 'src/users/users-data-service';
export declare class AdminGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersDataService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
