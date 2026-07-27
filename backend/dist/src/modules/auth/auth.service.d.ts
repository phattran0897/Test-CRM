import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    validateUser(tenantId: string, email: string, pass: string): Promise<UserEntity | null>;
    login(user: UserEntity): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            first_name: string | null;
            role: string;
        };
    }>;
    verifyRefresh(token: string): Promise<{
        accessToken: string;
    }>;
}
