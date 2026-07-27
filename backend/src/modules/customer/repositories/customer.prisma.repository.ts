import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ICustomerRepository } from './customer.repository.interface';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerPrismaRepository implements ICustomerRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(tenantId: string, skip: number, take: number, search?: string): Promise<{ data: CustomerEntity[], total: number }> {
        const where: any = {
            tenant_id: tenantId,
            deleted_at: null,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [data, total] = await Promise.all([
            this.prisma.customers.findMany({ where, skip, take, orderBy: { created_at: 'desc' } }),
            this.prisma.customers.count({ where })
        ]);
        return { data, total };
    }

    async findById(tenantId: string, id: string): Promise<CustomerEntity | null> {
        return this.prisma.customers.findFirst({ where: { id, tenant_id: tenantId, deleted_at: null } });
    }

    async create(data: Omit<CustomerEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<CustomerEntity> {
        return this.prisma.customers.create({ data: data as any }) as unknown as Promise<CustomerEntity>;
    }

    async update(tenantId: string, id: string, data: Partial<CustomerEntity>): Promise<CustomerEntity> {
        return this.prisma.customers.update({
            where: { id },
            data: data as any
        }) as unknown as Promise<CustomerEntity>;
    }

    async softDelete(tenantId: string, id: string): Promise<void> {
        await this.prisma.customers.update({
            where: { id },
            data: { deleted_at: new Date() }
        });
    }
}
