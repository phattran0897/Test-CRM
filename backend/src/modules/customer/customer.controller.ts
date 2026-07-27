import { Controller, Get, Post, Body, Put, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Roles('admin', 'manager', 'sales')
    @Get()
    async findAll(@Req() req: any, @Query('page') page: string, @Query('limit') limit: string, @Query('search') search: string) {
        return this.customerService.findAll(req.user.tenantId, page ? Number(page) : 1, limit ? Number(limit) : 10, search);
    }

    @Roles('admin', 'manager', 'sales')
    @Get(':id')
    async findOne(@Req() req: any, @Param('id') id: string) {
        return this.customerService.findById(req.user.tenantId, id);
    }

    @Roles('admin', 'manager', 'sales')
    @Post()
    async create(@Req() req: any, @Body() body: any) {
        return this.customerService.create(req.user.tenantId, req.user.userId, body);
    }

    @Roles('admin', 'manager', 'sales')
    @Put(':id')
    async update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
        return this.customerService.update(req.user.tenantId, id, req.user.userId, body);
    }

    @Roles('admin', 'manager')
    @Delete(':id')
    async remove(@Req() req: any, @Param('id') id: string) {
        return this.customerService.remove(req.user.tenantId, id);
    }
}
