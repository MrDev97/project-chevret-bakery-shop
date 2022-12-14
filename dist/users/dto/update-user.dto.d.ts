import { UserRoles } from '../../shared/enums/user-roles.enum';
export declare class UpdateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    address?: Array<UpdateUserAddressDto>;
    role: UserRoles;
}
export declare class UpdateUserAddressDto {
    country: string;
    city: string;
    street: string;
    houseNo: number;
    apartmentNo?: number;
}
