import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private setCookies;
    login(body: any, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            first_name: string | null;
            role: string;
        };
    }>;
    refresh(req: Request, res: Response): Promise<{
        message: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
