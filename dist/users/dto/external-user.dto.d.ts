export declare class ExternalUserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Array<number>;
    address?: Array<ExternalUserAddressDto>;
}
export declare class ExternalUserAddressDto {
    country: string;
    city: string;
    street: string;
    houseNo: number;
    apartmentNo?: number;
}
