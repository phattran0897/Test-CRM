import type { ICustomerRepository } from './repositories/customer.repository.interface';
import { CustomerEntity } from './entities/customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: ICustomerRepository);
    findAll(tenantId: string, page?: number, limit?: number, search?: string): Promise<{
        data: CustomerEntity[];
        total: number;
    }>;
    findById(tenantId: string, id: string): Promise<CustomerEntity>;
    create(tenantId: string, userId: string, data: Partial<CustomerEntity>): Promise<CustomerEntity>;
    update(tenantId: string, id: string, userId: string, data: Partial<CustomerEntity>): Promise<CustomerEntity>;
    remove(tenantId: string, id: string): Promise<void>;
}
