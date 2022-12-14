import { UserRepository } from './db/users.repository';
export declare class UserValidatorService {
    private userRepository;
    constructor(userRepository: UserRepository);
    validateUniqueEmail(email: string): Promise<void>;
}
