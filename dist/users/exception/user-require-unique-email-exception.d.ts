import { ConflictException } from '@nestjs/common';
export declare class UserRequireUniqueEmailException extends ConflictException {
    constructor();
}
