import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { I_CUSTOMER_REPOSITORY } from './repositories/customer.repository.interface';
import type { ICustomerRepository } from './repositories/customer.repository.interface';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(I_CUSTOMER_REPOSITORY) private readonly customerRepository: ICustomerRepository,
    ) { }

    async findAll(tenantId: string, page: number = 1, limit: number = 10, search?: string) {
        const skip = (page - 1) * limit;
        return this.customerRepository.findAll(tenantId, skip, limit, search);
    }

    async findById(tenantId: string, id: string): Promise<CustomerEntity> {
        const customer = await this.customerRepository.findById(tenantId, id);
        if (!customer) throw new NotFoundException('Customer not found');
        return customer;
    }

    async create(tenantId: string, userId: string, data: Partial<CustomerEntity>): Promise<CustomerEntity> {
        return this.customerRepository.create({
            ...data,
            tenant_id: tenantId,
            created_by: userId,
            updated_by: userId,
        } as any);
    }

    async update(tenantId: string, id: string, userId: string, data: Partial<CustomerEntity>): Promise<CustomerEntity> {
        await this.findById(tenantId, id); // check existence
        return this.customerRepository.update(tenantId, id, { ...data, updated_by: userId });
    }

    async remove(tenantId: string, id: string): Promise<void> {
        await this.findById(tenantId, id);
        await this.customerRepository.softDelete(tenantId, id);
    }
}
