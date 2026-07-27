import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || 'access_secret',
        });
    }

    async validate(payload: any) {
        if (!payload.sub) {
            throw new UnauthorizedException();
        }
        return { userId: payload.sub, email: payload.email, tenantId: payload.tenantId, role: payload.role };
    }
}
