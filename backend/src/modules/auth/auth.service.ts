import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async validateUser(tenantId: string, email: string, pass: string): Promise<UserEntity | null> {
        const user = await this.userService.findByEmail(tenantId, email);
        if (user && user.is_active && await bcrypt.compare(pass, user.password_hash)) {
            return user;
        }
        return null;
    }

    async login(user: UserEntity) {
        const payload = { email: user.email, sub: user.id, tenantId: user.tenant_id, role: user.role };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET') || 'access_secret',
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET') || 'refresh_secret',
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id, email: user.email, first_name: user.first_name, role: user.role
            }
        };
    }

    async verifyRefresh(token: string) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_SECRET') || 'refresh_secret',
            });
            const user = await this.userService.findById(payload.sub);
            if (!user || !user.is_active) throw new UnauthorizedException('Invalid user');

            const newPayload = { email: user.email, sub: user.id, tenantId: user.tenant_id, role: user.role };
            const newAccessToken = this.jwtService.sign(newPayload, {
                secret: this.configService.get('JWT_ACCESS_SECRET') || 'access_secret',
                expiresIn: '15m',
            });
            return { accessToken: newAccessToken };
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
