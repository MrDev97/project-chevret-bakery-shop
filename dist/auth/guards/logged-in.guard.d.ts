import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class LoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
}
