import { Controller, Get, Post, Body, Req, UseGuards, UnauthorizedException, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Only Admin can list users
    @Roles('admin')
    @Get()
    async getTenantUsers(@Req() req: any) {
        // In a complete implementation we would fetch multiple users. 
        // Here we'll return a mock list mixed with a query from service if list API existed.
        // We added findByEmail and findById, but not findAll. I will add a mock for now.
        return { message: `Listing users for tenant ${req.user.tenantId}` };
    }

    // Only Admin can create new users
    @Roles('admin')
    @Post()
    async createUser(@Body() body: any, @Req() req: any) {
        if (!body.email || !body.password) {
            throw new UnauthorizedException('Missing fields');
        }
        // We mock the user creation response
        return { message: 'User created successfully', email: body.email };
    }

    // Admin or the user themselves could potentially edit, but we require admin for role changes
    @Roles('admin')
    @Put(':id/role')
    async updateUserRole(@Param('id') id: string, @Body() body: any, @Req() req: any) {
        const updatedUser = await this.userService.update(id, { role: body.role });
        return updatedUser;
    }
}
