"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequireUniqueEmailException = void 0;
const common_1 = require("@nestjs/common");
class UserRequireUniqueEmailException extends common_1.ConflictException {
    constructor() {
        super('Email must be unique');
    }
}
exports.UserRequireUniqueEmailException = UserRequireUniqueEmailException;
//# sourceMappingURL=user-require-unique-email-exception.js.map