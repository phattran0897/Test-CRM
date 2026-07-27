import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    beforeEach(() => {
        reflector = new Reflector();
        guard = new RolesGuard(reflector);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should return true if no roles required', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
        const context = {
            getHandler: () => { },
            getClass: () => { },
        } as ExecutionContext;
        expect(guard.canActivate(context)).toBeTruthy();
    });

    it('should return false if user has no role but required', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
        const context = {
            getHandler: () => { },
            getClass: () => { },
            switchToHttp: () => ({ getRequest: () => ({ user: {} }) }),
        } as any;
        expect(guard.canActivate(context)).toBeFalsy();
    });

    it('should return true if user has required role', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
        const context = {
            getHandler: () => { },
            getClass: () => { },
            switchToHttp: () => ({ getRequest: () => ({ user: { role: 'admin' } }) }),
        } as any;
        expect(guard.canActivate(context)).toBeTruthy();
    });

    it('should return false if user has wrong role', () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
        const context = {
            getHandler: () => { },
            getClass: () => { },
            switchToHttp: () => ({ getRequest: () => ({ user: { role: 'sales' } }) }),
        } as any;
        expect(guard.canActivate(context)).toBeFalsy();
    });
});
