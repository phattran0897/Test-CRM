import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getTenantUsers(req: any): Promise<{
        message: string;
    }>;
    createUser(body: any, req: any): Promise<{
        message: string;
        email: any;
    }>;
    updateUserRole(id: string, body: any, req: any): Promise<import("./entities/user.entity").UserEntity>;
}
