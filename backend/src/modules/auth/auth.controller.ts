import { Controller, Post, Body, Res, Req, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private setCookies(res: Response, access: string, refresh?: string) {
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie('access_token', access, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 15 * 60 * 1000,
        });
        if (refresh) {
            res.cookie('refresh_token', refresh, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }
    }

    @Post('login')
    async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
        // Basic implementation for milestone 2
        const { tenantId, email, password } = body;
        const user = await this.authService.validateUser(tenantId, email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const result = await this.authService.login(user);
        this.setCookies(res, result.accessToken, result.refreshToken);
        return { message: 'Login successful', user: result.user };
    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) throw new UnauthorizedException('No refresh token provided');

        const result = await this.authService.verifyRefresh(refreshToken);
        this.setCookies(res, result.accessToken);
        return { message: 'Token refreshed' };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return { message: 'Logged out' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req: any) {
        return req.user;
    }
}
