import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;

    const mockUserService = {
        findByEmail: jest.fn(),
        findById: jest.fn(),
    };
    const mockJwtService = {
        sign: jest.fn(),
        verify: jest.fn(),
    };
    const mockConfigService = {
        get: jest.fn().mockImplementation((key) => key),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: mockUserService },
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: mockConfigService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return user if password matches', async () => {
            const mockUser = {
                id: 'user1',
                tenant_id: 'tenant1',
                email: 'test@crm.local',
                password_hash: await bcrypt.hash('secret', 10),
                is_active: true,
            };
            mockUserService.findByEmail.mockResolvedValue(mockUser);

            const result = await service.validateUser('tenant1', 'test@crm.local', 'secret');
            expect(result).toBe(mockUser);
        });

        it('should return null if password mismatch', async () => {
            const mockUser = {
                id: 'user1',
                tenant_id: 'tenant1',
                email: 'test@crm.local',
                password_hash: await bcrypt.hash('secret', 10),
                is_active: true,
            };
            mockUserService.findByEmail.mockResolvedValue(mockUser);

            const result = await service.validateUser('tenant1', 'test@crm.local', 'wrong_pass');
            expect(result).toBeNull();
        });
    });
});
