export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    address?: Array<CreateUserAddressDto>;
}
export declare class CreateUserAddressDto {
    country: string;
    city: string;
    street: string;
    houseNo: number;
    apartmentNo?: number;
}
