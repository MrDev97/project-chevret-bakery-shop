import { User } from './users.entity';
export declare class UserAddress {
    id: string;
    country: string;
    city: string;
    street: string;
    houseNo: number;
    apartmentNo?: number;
    user: User;
}
