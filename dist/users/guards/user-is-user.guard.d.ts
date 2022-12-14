import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersDataService } from '../users-data-service';
export declare class UserIsUser implements CanActivate {
    private usersService;
    constructor(usersService: UsersDataService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
