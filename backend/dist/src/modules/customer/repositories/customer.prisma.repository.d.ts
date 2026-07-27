import { PrismaService } from '../../../common/prisma/prisma.service';
import { ICustomerRepository } from './customer.repository.interface';
import { CustomerEntity } from '../entities/customer.entity';
export declare class CustomerPrismaRepository implements ICustomerRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, skip: number, take: number, search?: string): Promise<{
        data: CustomerEntity[];
        total: number;
    }>;
    findById(tenantId: string, id: string): Promise<CustomerEntity | null>;
    create(data: Omit<CustomerEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<CustomerEntity>;
    update(tenantId: string, id: string, data: Partial<CustomerEntity>): Promise<CustomerEntity>;
    softDelete(tenantId: string, id: string): Promise<void>;
}
