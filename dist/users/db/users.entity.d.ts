import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { UserAddress } from './userAddress.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    role: UserRoles;
    address?: UserAddress[];
}
